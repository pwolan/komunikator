class Online {
  constructor(user) {
    this.user = user;
    this.render();
  }
  render() {
    let that = this;
    $(".acceptFriend").on("click", function (e) {
      e.stopPropagation();
      let friendId = $(this).parent().parent()[0].dataset.id;
    });
    $(".declineFriend").on("click", async function (e) {
      e.stopPropagation();
      let friendId = $(this).parent().parent()[0].dataset.id;
      let { iduser } = that.user;
      let res = await fetch(`/api/declineFriend/${iduser}?friend=${friendId}`);
      let { succes } = await res.json();
      if (succes) {
        $(this).parent().parent().remove();
      }
    });
  }
}
