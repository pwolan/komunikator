import io from "socket.io-client";

export default class Chats {
  constructor(user) {
    this.user = user;
    this.friend = null;
    this.friendRequestAction = false;
    this.firstConnect = true;
    this.socket = io();
    this.roomId = null;
    this.loadedArticles = 0;
    this.container = $("#chat");
    this.init();
  }
  init() {
    this.socket.on("connect", () => {
      if (this.roomId && this.firstConnect) {
        this.socket.emit("changeroom", this.roomId);
      }
      this.firstConnect = false;
    });
    this.socket.on("changeroom", this.changeRoom.bind(this));
    this.socket.on("updatechat", this.updateChat.bind(this));

    $(".message-send-button").on("click", this.sendMessage.bind(this));
    this.handleEnterSend();
  }
  changeFriend(friendId) {
    let id = this.friend ? this.friend.idusers : null;
    if (id != friendId && !this.friendRequestAction) {
      this.friendRequestAction = true;
      this.getFriend(friendId).then(() => {
        this.socket.emit("changeroom", this.roomId);
        this.friendRequestAction = false;
      });
    }
  }
  updateChat({ username, idusers }, msg) {
    $(".chat-box").append(this.renderMessage(username, idusers, msg));
    //auto scroll
    let chatBox = $(".chat-box").get(0);
    if (chatBox.clientHeight > chatBox.scrollHeight - chatBox.scrollTop - 200) {
      this.scrollDown();
    }
  }
  changeRoom(data) {
    let { username } = this.friend;
    $("#friendName").text(username);

    console.log(data);
    for (let { username, senderid, message } of data.reverse()) {
      $(".chat-box").append(this.renderMessage(username, senderid, message));
    }
    this.scrollDown();
  }

  sendMessage() {
    let value = $(".message-send-sender").val();
    if (value) {
      $(".message-send-sender").val("");
      this.socket.emit("sendmessage", value);
    }
  }
  renderMessage(username, idusers, msg) {
    if (this.user.idusers === idusers) {
      //its my own message
      let reciver = $("<div>").addClass("chat-box-reciver");
      let message = $("<div>").addClass("chat-box-reciver-message").text(msg);
      reciver.append(message);
      return reciver;
    } else {
      //its someone other message
      let sender = $("<div>").addClass("chat-box-sender");
      let container = $("<div>").addClass("chat-box-sender-container");
      let avatar = $("<img>")
        .addClass("chat-box-sender-avatar")
        .attr(
          "src",
          "http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
        );
      container.append(avatar);
      let message = $("<div>").addClass("chat-box-sender-message").text(msg);
      sender.append(container, message);
      return sender;
    }
  }

  handleEnterSend() {
    $(".message-send-sender").on("focus", () => {
      $(document).on("keydown", (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    });
    $(".message-send-sender").on("blur", () => {
      $(document).off("keydown");
    });
  }
  scrolling(e) {
    console.log("object");
    console.log($(e.target).scrollTop());
    if ($(e.target).scrollTop() < 100) {
      console.log("Disabled");
      $(".chat-box").off("scroll");
      this.fetchMoreMessages();
    }
  }
  handleScrolling() {
    console.log("Enabled");
    $(".chat-box").on("scroll", this.scrolling.bind(this));
  }

  async getFriend(friendId) {
    let res = await fetch(`/friends/userStats/${friendId}`);
    let { user } = await res.json();
    this.friend = user[0];
    let { idusers } = this.user;
    let idfriends = this.friend.idusers;
    this.roomId = idusers < idfriends ? `${idusers}#${idfriends}` : `${idfriends}#${idusers}`;
  }
  async fetchMoreMessages() {
    let res = await fetch(`/chat/messages/${++this.loadedArticles}`);
    let data = await res.json();
    console.log(data);
    for (let { username, senderid, message } of data.reverse()) {
      $(".chat-box").prepend(this.renderMessage(username, senderid, message));
    }
    this.handleScrolling();
  }
  scrollDown() {
    $(".chat-box").animate({ scrollTop: $(".chat-box").get(0).scrollHeight }, 500);
    setTimeout(() => {
      this.handleScrolling();
    }, 500);
  }
}
