import io from "socket.io-client";

export default class Chats {
  constructor(user) {
    this.user = user;
    this.friend;
    this.socket = io();
    this.container = $("#chat");
    this.init();
  }
  init() {
    this.socket.on("connect", () => {
      console.log("connect");
      let { username } = this.user;
      this.socket.emit("adduser", username);
    });
    this.socket.on("updatechat", this.updateChat.bind(this));
    $("#messageSender").on("submit", this.sendMessage.bind(this));
  }
  render() {
    let { username } = this.friend;
    $("#friendName").text(username);
  }
  updateChat(username, msg) {
    console.log("updateChat");
    console.log(username, msg);
  }
  changeFriend(friendId) {
    this.getFriend(friendId).then(this.changeRoom.bind(this));
  }
  changeRoom() {
    console.log("changeRoom");
    console.log(this.roomId);
    this.socket.emit("changeroom", this.roomId);
    this.render();
  }
  sendMessage(e) {
    console.log("Clicked send");
    e.preventDefault();
    let { value } = e.currentTarget.text;
    e.currentTarget.text.value = "";
    this.socket.emit("sendmessage", value);
  }

  async getFriend(friendId) {
    let res = await fetch(`/friends/userStats/${friendId}`);
    let { user } = await res.json();
    this.friend = user[0];
    let { idusers } = this.user;
    let idfriends = this.friend.idusers;
    this.roomId = idusers < idfriends ? `${idusers}#${idfriends}` : `${idfriends}#${idusers}`;
    this.render();
  }
  stop() {}
}
