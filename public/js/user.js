// console.log(user);
$(() => {
  enableAll();
  disableAll();
  $(window).resize(() => {
    enableAll();
    disableAll();
  });

  $(".friends-card").on("click", function(e) {
    console.log(this);
    // let chat = new ChatUi(user);
    renderMessageBox();
  });
  $("#prev").on("click", function(e) {
    renderStart();
  });
});
function enableAll() {
  if ($(document).width() >= 992) {
    $("#tabsNav a").removeClass("active");
    $("#tabs>div").addClass("show active");
  }
}
function disableAll() {
  if ($(document).width() < 992) {
    $("#tabs>div").removeClass("show active");
    $("#tabs>div:first-child").addClass("show active");
    $("#tabsNav a:first-child").addClass("active");
  }
}

function renderMessageBox() {
  $("#startPage").addClass("d-none");
  $("#chat").removeClass("d-none");
  if ($(document).width() < 992) {
    //on mobile
    $("#tabs>div").removeClass("active");
    $("#middle").addClass("show active");
    //handle nav
    $("#tabsNav").addClass("d-none");
  }
}
function renderStart() {
  $("#startPage").removeClass("d-none");
  $("#chat").addClass("d-none");
  if ($(document).width() < 992) {
    $("#tabsNav").removeClass("d-none");
    $("#middle").removeClass("show active");
    $("#tabsNav a").removeClass("active");
    $("#tabsNav a")
      .eq(0)
      .tab("show");
  }
}
// firstTime = true;
// function scroll() {
//   if (firstTime) {
//     container.scrollTop = container.scrollHeight;
//     firstTime = false;
//   } else if (container.scrollTop + container.clientHeight === container.scrollHeight) {
//     container.scrollTop = container.scrollHeight;
//   }
// }

class ChatUi {
  constructor() {
    this.user;
    this.init();
  }
  init() {}
  fetchMessages() {}
  sendMessage() {}
}
