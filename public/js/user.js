import Router from "./user/Router";
import AddFriend from "./user/AddFriend";
import Online from "./user/Online";
import Chats from "./user/Chats";

$(async () => {
  let user = await getuser();
  console.log(user);
  let chats = new Chats(user);
  let router = new Router(user, chats);
  router.render();
  let search = new AddFriend(user);
  let online = new Online(user);
});

async function getuser() {
  let res = await fetch("/friends/currentUser");
  return res.json();
}
