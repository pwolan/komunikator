class Router {
  constructor() {
    this.root = $("#middle");
    this.navbar = $("#mainNavbar");
  }
  render() {
    this.show("#random");
    $(".friends-card").on("click", (e) => {
      this.messageBox();
    });

    this.navbarListeners();
    //mobile changes

    this.enableAll();
    this.disableAll();
    $(window).resize(() => {
      this.enableAll();
      this.disableAll();
    });
    //sections listeners
    $("#prev").on("click", (e) => {
      this.show("#random");
      this.start();
    });
  }
  navbarListeners() {
    let that = this;
    $("#mainNavbar a").on("click", function () {
      let href = $(this).attr("href");
      that.show(href);
    });
  }
  enableAll() {
    if ($(document).width() >= 992) {
      $("#tabsNav").addClass("d-none");
      $("#tabsNav a").removeClass("active");
      $("#tabs>div").addClass("show active");
    }
  }
  disableAll() {
    if ($(document).width() < 992) {
      $("#tabsNav").removeClass("d-none");
      $("#tabs>div").removeClass("show active");
      $("#tabs>div:first-child").addClass("show active");
      $("#tabsNav a:first-child").addClass("active");
    }
  }
  start() {
    $("#startPage").removeClass("d-none");
    $("#chat").addClass("d-none");
    if ($(document).width() < 992) {
      $("#tabsNav").removeClass("d-none");
      $("#middle").removeClass("show active");
      $("#tabsNav a").removeClass("active");
      $("#tabsNav a").eq(0).tab("show");
    }
  }
  messageBox() {
    $("#middle>div").addClass("d-none");
    $("#chat").removeClass("d-none");
    if ($(document).width() < 992) {
      //on mobile
      $("#tabs>div").removeClass("active");
      $("#middle").addClass("show active");
      //handle nav
      $("#tabsNav").addClass("d-none");
    }
  }
  addFriend() {}
  groups() {}
  settings() {}
  show(href) {
    console.log("zmien");
    // debugger;
    this.root.children("").addClass("d-none");
    $("#tabsNav a").attr("aria-selected", "false");
    $("#tabsNav a").removeClass("active");
    $(href).removeClass("d-none");
    if ($(document).width() < 992) {
      $("#tabsNav").removeClass("d-none");
      $("#friends").removeClass("show active");
      $("#online").removeClass("show active");
      $("#middle").addClass("show active");
    }
  }
}
