blog = {};

blog.addLoadEvent = function (f) {
  var oldOnload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = f;
  } else {
    window.onload = function () {
      oldOnload();
      f();
    };
  }
};

blog.eventDelegate = function delegate(element, eventType, selector, fn) {
  element.addEventListener(eventType, e => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (element === el) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e, el);
  })
  return element
}

blog.ajax = function (params) {
  params = params || {};
  params.method = (params.method || "GET").toUpperCase();
  params.timeout = params.timeout || 10000;

  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObjcet("Microsoft.XMLHTTP");
  }

  var timer;
  var isTimeout = false;
  xhr.open(params.method, params.url, true);
  xhr.onreadystatechange = function () {
    if (isTimeout) {
      params.error &&
        params.error({
          error: "Time Out!",
        });
    } else {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
          var response = JSON.parse(xhr.responseText);
          params.success && params.success(response);
        } else {
          params.error && params.error(status);
        }
        clearTimeout(timer);
      }
    }
  };
  timer = setTimeout(function () {
    isTimeout = true;
    params.error &&
      params.error({
        error: "Time Out!",
      });
    xhr.abort();
  }, params.timeout);
  xhr.send(null);
};




blog.addLoadEvent(function () {
  document.querySelector("a.nav__toggle").addEventListener("click", function (e) {
    document.querySelector("header").classList.toggle("menu--expanded");
    document.querySelector("div.overlay-container").classList.toggle("show");
    document.querySelector("div.overlay-container").classList.toggle("z-600");
    document.querySelector("div.overlay-container").classList.toggle("show-backdrop");
    document.querySelector('div.backdrop').addEventListener('click', closeMenu);
  });

  // close menu and remove backdrop click listener
  var closeMenu = function (ev) {
    document.querySelector("header").classList.remove("menu--expanded");
    document.querySelector("div.overlay-container").classList.remove("show", "z-600", "show-backdrop");
  
    ev.target.removeEventListener('click', closeMenu);
  }
});