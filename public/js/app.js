console.log("appje werkt");
const socket = io();

const path = window.location.pathname;
const roomId = path.split("").splice(1).join("");
const bidFormWrapper = document.querySelector(".bid-form-wrapper");
const bidForm = document.querySelector(".bid-form");
const slots = document.querySelectorAll(".slot");
console.log(slots);

// Eventlisteners
slots.forEach((slot) => {
	slot.addEventListener("click", (e) => {
		const id = slot.dataset.slot;
		bidFormWrapper.classList.add("show");
		bidForm.onsubmit = async (e) => {
			e.preventDefault();

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
			const res = await fetch("http://localhost:3000/bid", {
				headers: {
					"Content-Type": "application/json",
				},
				referrer: "http://localhost:3000/shots-amersfoort",
				referrerPolicy: "strict-origin-when-cross-origin",
				body: JSON.stringify(data),
				method: "POST",
				mode: "cors",
				credentials: "include",
			});

			// Emit event of highest bid
			socket.emit("bid:high", roomId);
		};
	});
});

bidFormWrapper.addEventListener("click", (e) => {
	console.log(e);
	if (e.target === bidFormWrapper) {
		bidFormWrapper.classList.remove("show");
	}
});

// bidForm.addEventListener("submit", async (e) => {
// 	e.preventDefault();
// 	const data = {
// 		name: e.target[0].value,
// 		songTitle: e.target[1].value,
// 		songArtist: e.target[2].value,
// 		amount: e.target[3].valueAsNumber,
// 	};
// 	const res = await fetch("http://localhost:3000/bid", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		referrer: "http://localhost:3000/shots-amersfoort",
// 		referrerPolicy: "strict-origin-when-cross-origin",
// 		body: JSON.stringify(data),
// 		method: "POST",
// 		mode: "cors",
// 		credentials: "include",
// 	});
// });

socket.emit("join-room", roomId);

socket.on("user-joined", () => {
	console.log("user joined");
});
