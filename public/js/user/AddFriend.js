export default class AddFriend {
  constructor(user) {
    this.render();
    this.user = user;
  }
  render() {
    $("#search").on("input", (e) => {
      this.handleSearch(e.target.value);
    });
  }
  async handleSearch(val) {
    if (val.length > 2) {
      let res = await fetch("/friends/searchFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: val,
          userId: this.user.idusers,
        }),
      });
      let data = await res.json();
      this.renderSearchFriends(data.users);
    } else {
      $("#searchOutput").empty();
    }
  }
  renderSearchFriends(users) {
    $("#searchOutput").empty();
    users.forEach(({ username, idusers }) => {
      let li = $("<li>").addClass("searchFriend").text(username).attr("data-id", idusers);
      $("#searchOutput").append(li);
    });
    $(".searchFriend").off("click");
    let that = this;
    $(".searchFriend").on("click", function () {
      let id = this.dataset.id;
      that.addFriend(id);
    });
  }
  async addFriend(id) {
    let res = await fetch("/friends/addFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.user.idusers,
        newFriendId: id,
      }),
    });
    let data = await res.json();
    console.log(data);
  }
}
