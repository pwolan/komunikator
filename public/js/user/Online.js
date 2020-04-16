class Online {
  constructor(user) {
    this.user = user;
    this.render();
  }
  render() {
    let that = this;
    $(".acceptFriend").on("click", async function (e) {
      e.stopPropagation();
      let friendId = $(this).parent().parent()[0].dataset.id;
      let res = await fetch(`/friends/acceptFriend/${friendId}`);
      let { succes } = await res.json();
      if (succes) {
        that.changeCard($(this).parent().parent());
      }
    });
    $(".declineFriend").on("click", async function (e) {
      e.stopPropagation();
      let friendId = $(this).parent().parent()[0].dataset.id;
      let res = await fetch(`/friends/declineFriend/${friendId}`);
      let { succes } = await res.json();
      if (succes) {
        $(this).parent().parent().remove();
      }
    });
  }
  changeCard($root) {
    console.log($root);
    let content = $root.children(".friends-card-content");
    content.children("button").remove();
    let text = $("<div>").addClass("friends-card-text").text("Offiline");
    content.append(text);
    let statusDot = $("<div>").addClass("friends-card-statusdot");
    let statusDotBody = $("<div>").addClass("friends-card-statusdot-body");
    statusDot.append(statusDotBody);
    $root.append(statusDot);
  }
  // renderCard($root, acceptedUser) {
  //   $root.empty();
  //   let avatarContainer = $("<div>").addClass("friends-card-avatar-container");
  //   let avatar = $("<img>")
  //     .addClass("friends-card-avatar")
  //     .attr(
  //       "src",
  //       "http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
  //     );
  //   avatarContainer.append(avatar);
  //   let content = $("<div>").addClass("friends-card-content p-3");
  //   let username = $("<div>")
  //     .addClass("friends-card-username font-weight-bold")
  //     .text(acceptedUser.username);
  //   let text = $("<div>").addClass("friends-card-text").text("Offline");
  //   content.append(username, text);
  //   let statusDot = $("<div>").addClass("friends-card-statusdot");
  //   let statusDotBody = $("<div>").addClass("friends-card-statusdot-body");
  //   statusDot.append(statusDotBody);
  //   $root.append(avatarContainer, content, statusDot);
  // }
}
