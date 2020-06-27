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
      el = el.parentNode
    }
    el && fn.call(el, e, el)
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
  document
    .querySelector("a.nav__toggle")
    .addEventListener("click", function (e) {
      document.querySelector("body").classList.toggle("menu--expanded");
    });
});

