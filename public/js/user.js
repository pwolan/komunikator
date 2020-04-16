// console.log(user);
$(async () => {
  let user = await getuser();
  console.log(user);
  let router = new Router(user);
  router.render();
  let search = new AddFriend(user);
  let online = new Online(user);
});

async function getuser() {
  let res = await fetch("/friends/currentUser");
  return res.json();
}
