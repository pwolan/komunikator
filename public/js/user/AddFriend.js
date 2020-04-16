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
      let li = $("<li>").addClass("searchFriend");
      let img = $("<img>")
        .attr(
          "src",
          "http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
        )
        .attr("id", "searchAvatar");
      let name = $("<p>").attr("id", "searchUser").text(username);
      let btn = $("<button>").attr("id", "searchButton").attr("data-id", idusers).text("Add");
      li.append(img, name, btn);
      $("#searchOutput").append(li);
    });
    $("#searchButton").off("click");
    let that = this;
    $("#searchButton").on("click", function () {
      let id = this.dataset.id;
      $(this).parent().remove();
      console.log(id);
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
