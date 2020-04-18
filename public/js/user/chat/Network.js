export default class Network {
  constructor(userId) {
    this.loadedArticles = 0;
    this.userId = userId;
    this._friendId = null;
    this.friendRequestAction = false;
  }
  set friendId(friendId) {
    this._friendId = parseInt(friendId);
    this.loadedArticles = 0;
  }
  async getFriend() {
    this.friendRequestAction = true;
    let res = await fetch(`/friends/userStats/${this._friendId}`);
    let { user } = await res.json();
    this.friendRequestAction = false;
    return user[0];
  }
  async fetchMessages() {
    console.log(this.loadedArticles);
    let res = await fetch(`/chat/messages/${this.loadedArticles++}`);
    let data = await res.json();
    return data.reverse();
  }
}
