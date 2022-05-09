console.log("working hands");
const socket = io();

const openRoom = document.querySelector(".open-room");
const closeRoom = document.querySelector(".close-room");
const url = "localhost:3000";

// Eventlisteners
openRoom.addEventListener("click", async (e) => {
	e.preventDefault();
	const response = await fetch("http://localhost:3000/room", {
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-US,en;q=0.9,nl;q=0.8",
			"cache-control": "max-age=0",
			"content-type": "application/x-www-form-urlencoded",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
		},
		referrer: "http://localhost:3000/shots/admin",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: null,
		method: "POST",
		mode: "cors",
		credentials: "include",
	});
	console.log(response);
});

closeRoom.addEventListener("click", async (e) => {
	e.preventDefault();
	const response = await fetch("http://localhost:3000/room?", {
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-US,en;q=0.9,nl;q=0.8",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
		},
		referrer: "http://localhost:3000/shots/admin",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: null,
		method: "GET",
		mode: "cors",
		credentials: "include",
	});
	console.log(response);
});
