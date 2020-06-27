// show floating buttons on scroll
blog.addLoadEvent(function () {
  var wrapper = document.querySelector(".wrapper--content");
  var prevScrollpos = wrapper.scrollTop;
  wrapper.onscroll = function () {
    var currentScrollPos = wrapper.scrollTop;
    if (prevScrollpos > currentScrollPos) {
      document.querySelector("#toTop").classList.remove("hidden");
      document.querySelector("#showToc").classList.remove("hidden");
    } else {
      document.querySelector("#toTop").classList.add("hidden");
      document.querySelector("#showToc").classList.add("hidden");
    }
    prevScrollpos = currentScrollPos;
  };
});

// show and hide toc
blog.addLoadEvent(function () {
  // click toc button to show toc
  document.querySelector("#showToc").addEventListener("click", function () {
    document.querySelector("div.overlay-container").classList.add("show");
  });
  // click backdrop to close toc
  document.querySelector("div.backdrop").addEventListener("click", function () {
    document.querySelector("div.overlay-container").classList.remove("show");
  });
});

var toc = document.querySelector("ol.toc");
blog.eventDelegate(toc, "click", "a.toc-link", function () {
  document.querySelector("div.overlay-container").classList.remove("show");
});
