console.log("appje werkt");
const socket = io();

const path = window.location.pathname;
const roomId = path.split("").splice(1).join("");
const bidFormWrapper = document.querySelector(".bid-form-wrapper");
const bidForm = document.querySelector(".bid-form");
const slotsList = document.querySelector(".slots-list");
const slots = document.querySelectorAll(".slot");
const url_origin = window.location.origin;

// Eventlisteners
slots.forEach((slot) => {
	slot.addEventListener("click", (e) => {
		const id = slot.dataset.slot;
		bidFormWrapper.classList.add("show");
		bidForm.onsubmit = async (e) => {
			e.preventDefault();
			// Hide form
			bidFormWrapper.classList.remove("show");

			// Gather bid data
			const data = {
				slot: id,
				bid: {
					name: e.target[0].value,
					songTitle: e.target[1].value,
					songArtist: e.target[2].value,
					amount: e.target[3].valueAsNumber,
				},
			};

			// Send bid to server and wait for confirmation
			const res = await fetch(`${url_origin}/bid`, {
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				method: "POST",
				mode: "cors",
				credentials: "include",
			});

			const obj = await res.json();
			const currentBid = obj.newBid;
			// Confirm bid
			// ....
			// ....
			// ....
			// On confirm, redefine card
			slot.children[0].innerText = `Begint om ${currentBid.time}`;
			slot.children[1].innerText = currentBid.song;
			slot.children[2].innerText = `${currentBid.name} - ${currentBid.amount} euro`;

			// Emit event of highest bid
			socket.emit("bid:high", roomId, data);
		};
	});
});

bidFormWrapper.addEventListener("click", (e) => {
	if (e.target === bidFormWrapper) {
		bidFormWrapper.classList.remove("show");
	}
});

socket.emit("join-room", roomId);

socket.on("user-joined", () => {
	console.log("user joined");
});

socket.on("bid:high", async (bid) => {
	const res = await fetch(`${url_origin}/slots`);
	const data = await res.json();
	// Update bidding cards
	data.forEach((slot) => {
		const newSlot = document.querySelector(`div[data-slot="${slot._id}"]`);
		newSlot.children[0].innerText = `Begint om ${slot.time}`;
		newSlot.children[1].innerText = slot.song ? slot.song : "Nog geen aanvraag";
		if (newSlot.children[2]) {
			newSlot.children[2].innerText = slot.name
				? `${slot.name} - ${slot.amount} euro`
				: "-";
		}
	});
});

// Create new card element for new bid
