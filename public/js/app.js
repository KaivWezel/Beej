console.log("appje werkt");

const socket = io();

window.onload = (e) => {
	const path = window.location.pathname;
	const roomId = path.split("").splice(1).join("");
	socket.emit("join-room", roomId);
};

socket.on("user-joined", () => {
	console.log("user joined");
});
