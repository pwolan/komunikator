export default class Ui {
  constructor(userId) {
    this.container = $(".chat-box");
    this.userId = userId;
    this.initListeners();
  }
  initListeners() {}
  initChatsSendMessage(callback) {
    $(".message-send-button").on("click", callback);
    $(".message-send-sender").on("focus", () => {
      $(document).on("keydown", (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          callback();
        }
      });
    });
    $(".message-send-sender").on("blur", () => {
      $(document).off("keydown");
    });
  }
  renderNewRoom(data, username) {
    $("#friendName").text(username);
    console.log(data);
    $(".chat-box").empty();
    for (let { senderid, message } of data.reverse()) {
      this.addMessage(senderid, message);
    }
    $(".chat-box").scrollTop($(".chat-box").get(0).scrollHeight);
  }
  handleMessageSending() {
    let value = $(".message-send-sender").val();
    $(".message-send-sender").val("");
    return value;
  }
  updateChat(idusers, msg) {
    this.addMessage(idusers, msg);
    //auto scroll
    let chatBox = $(".chat-box").get(0);
    if (chatBox.clientHeight > chatBox.scrollHeight - chatBox.scrollTop - 200) {
      $(".chat-box").animate({ scrollTop: $(".chat-box").get(0).scrollHeight }, 500);
    }
  }
  addMessage(senderId, msg, action = "append") {
    let root;
    if (this.userId === senderId) {
      //its my own message
      root = $("<div>").addClass("chat-box-reciver");
      let message = $("<div>").addClass("chat-box-reciver-message").text(msg);
      root.append(message);
    } else {
      //its someone other message
      root = $("<div>").addClass("chat-box-sender");
      let container = $("<div>").addClass("chat-box-sender-container");
      let avatar = $("<img>")
        .addClass("chat-box-sender-avatar")
        .attr(
          "src",
          "http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
        );
      container.append(avatar);
      let message = $("<div>").addClass("chat-box-sender-message").text(msg);
      root.append(container, message);
    }
    this.container[action](root);
  }
  enableScrollingFetch(callback) {
    $(".chat-box").off("scroll");
    $(".chat-box").on("scroll", this.ScrollingFetch.bind(this, callback));
  }
  async ScrollingFetch(callback) {
    let chatBox = $(".chat-box").get(0);
    let condition = chatBox.scrollHeight > chatBox.clientHeight + 200;
    if ($(".chat-box").scrollTop() < 100 && condition) {
      $(".chat-box").off("scroll");
      await callback();
      $(".chat-box").on("scroll", this.ScrollingFetch.bind(this, callback));
    }
  }
}
