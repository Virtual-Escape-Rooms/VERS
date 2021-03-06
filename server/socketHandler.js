const {
  addFiveMinutes,
  checkSensors,
  checkTranslator,
  getMessages,
  globalPlaySound,
  globalStopSound,
  joinRoom,
  newFileMessage,
  newTextMessage,
  setRoomState,
  startTimer,
  startRoomSuccess,
  verifyRoom,
} = require("./utils");
const e = require("express");

function handleIo(io) {
  io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });

    socket.on("joinRoom", ({ room, password }) => {
      const roomCode = room;
      if (verifyRoom(room, password)) {
        joinRoom(socket, roomCode);
      } else {
        socket.emit("errorMessage", { message: "Incorrect Password" });
      }
    });

    socket.on("rejoinRoom", ({ room, password }) => {
      const roomCode = room;
      if (verifyRoom(room, password)) {
        joinRoom(socket, roomCode);
      }
    });

    socket.on("getTextMessage", ({ roomCode }) => {
      socket.emit("messageStatus", getMessages(roomCode));
    });

    socket.on("newFileMessage", ({ roomCode, content, sender, color }) => {
      const messages = newFileMessage(
        io,
        socket,
        roomCode,
        content,
        sender,
        color
      );
    });

    socket.on("newTextMessage", ({ roomCode, content, sender, color }) => {
      const messages = newTextMessage(
        io,
        socket,
        roomCode,
        content,
        sender,
        color
      );
    });

    socket.on("setRoomState", ({ roomCode, state }) => {
      setRoomState(roomCode, io, state);
    });

    socket.on("startRoomSuccess", ({ roomCode }) => {
      startRoomSuccess(roomCode, io);
    });

    socket.on("start-time", ({ room }) => {
      startTimer(room, io);
    });

    socket.on("floor-plan", ({ roomCode, sender, color, sensors }) => {
      checkSensors(roomCode, io, sender, color, sensors);
    });

    socket.on("add-five-minutes", ({ roomCode }) => {
      addFiveMinutes(roomCode);
    });

    socket.on("sensorUpdate", ({ sensors, room }) => {
      socket.to(room).emit("sensorUpdate", { sensors });
    });

    socket.on("electricalUpdate", ({ state, room }) => {
      socket.to(room).emit("electricalUpdate", { state });
    });

    socket.on("locationUpdate", ({ red, location, room }) => {
      socket.to(room).emit("locationUpdate", { red, location });
    });

    socket.on("resetLocation", ({ location, room }) => {
      socket.to(room).emit("locationUpdate", { location });
    });

    socket.on("translatorUpdate", ({ key, i, room }) => {
      socket.to(room).emit("translatorUpdate", { key, i });
    });

    socket.on("translation-key", ({ roomCode, sender, color, translation }) => {
      socket.to(roomCode).emit("translatorSync", { translation });
      checkTranslator(roomCode, io, sender, color, translation);
    });

    socket.on("globalPlaySound", ({ roomCode, soundId }) => {
      globalPlaySound(roomCode, io, soundId, false);
    });

    socket.on("globalStopSound", ({ roomCode, soundId }) => {
      globalStopSound(roomCode, io, soundId, false);
    });
  });
}

module.exports = handleIo;
