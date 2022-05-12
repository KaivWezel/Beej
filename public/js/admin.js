console.log("working hands");
const socket = io();

const openRoom = document.querySelector(".open-room");
const closeRoom = document.querySelector(".close-room");
const closeButtons = document.querySelectorAll(".close-slot");
const url_origin = window.location.origin;

// Eventlisteners
openRoom.addEventListener("click", async (e) => {
	e.preventDefault();
	const response = await fetch(`${url_origin}/room`, {
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ opened: true }),
		method: "POST",
		mode: "cors",
		credentials: "include",
	});
	console.log(response);
});

closeRoom.addEventListener("click", async (e) => {
	e.preventDefault();
	const response = await fetch(`${url_origin}/room`, {
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ opened: false }),
		method: "POST",
		mode: "cors",
		credentials: "include",
	});
	console.log(response);
});

closeButtons.forEach((btn) => {
	btn.addEventListener("click", async (e) => {
		e.preventDefault();
		console.log(e);
		const slot = e.path[2];
		slot.classList.add("closed");
		const id = slot.dataset.slot;
		const response = await fetch(`${url_origin}/slot/${id}`, {
			method: "delete",
		});
		console.log(response);
	});
});
