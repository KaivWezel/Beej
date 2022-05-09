console.log("working hands");
const socket = io();

const openRoom = document.querySelector(".open-room");
const closeRoom = document.querySelector(".close-room");
const url = "localhost:3000";

const data = { opened: true };
const string = JSON.stringify(data);
// Eventlisteners
openRoom.addEventListener("click", async (e) => {
	e.preventDefault();
	const response = await fetch("http://localhost:3000/room", {
		headers: {
			accept: "application/json",
			"accept-language": "en-US,en;q=0.9,nl;q=0.8",
			"cache-control": "max-age=0",
			"content-type": "application/json",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
		},
		referrer: "http://localhost:3000/shots/admin",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: JSON.stringify({ opened: true }),
		method: "POST",
		mode: "cors",
		credentials: "include",
	});
	console.log(response);
});

closeRoom.addEventListener("click", async (e) => {
	e.preventDefault();
	const response = await fetch("http://localhost:3000/room", {
		headers: {
			accept: "application/json",
			"accept-language": "en-US,en;q=0.9,nl;q=0.8",
			"cache-control": "max-age=0",
			"content-type": "application/json",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
		},
		referrer: "http://localhost:3000/shots/admin",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: JSON.stringify({ opened: false }),
		method: "POST",
		mode: "cors",
		credentials: "include",
	});
	console.log(response);
});
