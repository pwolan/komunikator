import io from "socket.io-client";
import Network from "./chat/Network";
import Ui from "./chat/Ui";

export default class Chats {
  constructor(user) {
    this.Network = new Network(user.idusers);
    this.Ui = new Ui(user.idusers);

    // this.user = user;
    this.friend = null;
    this.firstConnect = true;
    this.socket = io();
    this.init();
  }

  init() {
    this.socket.on("connect", () => {
      if (this.friend && this.firstConnect) {
        this.socket.emit("changeroom", this.friend.idusers);
      }
      this.firstConnect = false;
    });
    this.socket.on("changeroom", this.changeRoom.bind(this));
    this.socket.on("updatechat", this.Ui.updateChat.bind(this.Ui));

    this.Ui.initChatsSendMessage(this.sendMessage.bind(this));
  }

  async changeFriend(friendId) {
    this.Network.friendId = friendId;
    let id = this.friend ? this.friend.idusers : null;
    if (id != friendId && !this.Network.friendRequestAction) {
      this.friend = await this.Network.getFriend(friendId);
      this.socket.emit("changeroom", friendId);
    }
  }
  sendMessage() {
    let value = this.Ui.handleMessageSending();
    if (value) {
      this.socket.emit("sendmessage", value);
    }
  }

  changeRoom(data) {
    let { username } = this.friend;
    this.Ui.renderNewRoom(data, username);
    this.Ui.enableScrollingFetch(this.scrollFetch.bind(this));
  }
  async scrollFetch() {
    let messages = await this.Network.fetchMessages();
    for (let { senderid, message } of messages) {
      this.Ui.addMessage(senderid, message, "prepend");
    }
  }
}
