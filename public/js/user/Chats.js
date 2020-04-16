class Chats {
  constructor(user, friendId) {
    this.user = user;
    this.friend;
    this.socket = io();
    this.container = $("#chat");
    this.init(friendId);
  }
  async init(friendId) {
    console.log(friendId);
    let res = await fetch(`/friends/userStats/${friendId}`);
    let { user } = await res.json();
    this.friend = user[0];
    this.render();
  }
  render() {
    console.log(this.friend);
    let { username } = this.friend;
    $("#friendName").text(username);
    $("#messageSender").on("submit", this.sendMessage.bind(this));
    this.socket.on("11", this.getMessage.bind(this));
  }
  sendMessage(e) {
    e.preventDefault();
    let { value } = e.currentTarget.text;
    e.currentTarget.text.value = "";
    let { idusers } = this.user;
    let idfriends = this.friend.idusers;
    console.log(idusers);
    let roomId = idusers < idfriends ? `${idusers}#${idfriends}` : `${idfriends}#${idusers}`;
    this.socket.emit(roomId, value);
  }
  getMessage(data) {
    console.log(data);
  }
  stop() {}
}
