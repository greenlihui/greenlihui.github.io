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
  // click toc button to show toc, and hide floating buttons
  document.querySelector("#showToc").addEventListener("click", function () {
    document.querySelector("div.overlay-container").classList.add("show", "z-800", "show-backdrop", "show-toc");
    document.querySelector("#toTop").classList.add("hidden");
    document.querySelector("#showToc").classList.add("hidden");

    // click backdrop to close toc, and show floating buttons
    document.querySelector(".show-toc div.backdrop").addEventListener("click", closeToc);
  });

  // close toc and remove backdrop click listener
  var closeToc =  function (ev) {
    document.querySelector("div.overlay-container").classList.remove("show", "z-800", "show-backdrop", "show-toc");
    document.querySelector("#showToc").classList.remove("hidden");
    if (document.querySelector(".wrapper--content").scrollTop > 0) {
      document.querySelector("#toTop").classList.remove("hidden");
    }
    ev.target.removeEventListener('click', closeToc);
  }

  // hide toc on anchor clicked
  var toc = document.querySelector("ol.toc");
  blog.eventDelegate(toc, "click", "a.toc-link", closeToc);
});