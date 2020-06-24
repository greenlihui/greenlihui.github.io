function initSearch(path, search_id, content_id, enter_to_search) {
  "use strict";
  blog.ajax({
    url: path,
    success: function (jsonResponse) {
      var datas = jsonResponse;

      var $input = document.getElementById(search_id);
      var $resultContent = document.getElementById(content_id);


      if (enter_to_search) {
        $input.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                loadSearchResult(this.value);
            }
          });
      } else {
        $input.addEventListener("input", function () {
            loadSearchResult(this.value);
        });
      }

      function loadSearchResult(value) {
        var str = '<ul class="search-result-list">';
        var keywords = value
          .trim()
          .toLowerCase()
          .split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (value.trim().length <= 0) {
          return;
        }
        // perform local searching
        datas.forEach(function (data) {
          var isMatch = true;
          var content_index = [];
          var data_title = data.title.trim().toLowerCase();
          var data_content = data.content
            .trim()
            .replace(/<[^>]+>/g, "")
            .toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          // only match artiles with not empty titles and contents
          if (data_title != "" && data_content != "") {
            keywords.forEach(function (keyword, i) {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0) {
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }
                if (i == 0) {
                  first_occur = index_content;
                }
              }
            });
          }
          // show search results
          if (isMatch) {
            str +=
              "<li><a href='" +
              data_url +
              "' class='search-result-title hover--underline'>" +
              data_title +
              "</a>";
            var content = data.content.trim().replace(/<[^>]+>/g, "");
            if (first_occur >= 0) {
              // cut out 100 characters
              var start = first_occur - 6;
              var end = first_occur + 6;

              if (start < 0) {
                start = 0;
              }

              if (start == 0) {
                end = 10;
              }

              if (end > content.length) {
                end = content.length;
              }

              var match_content = content.substr(start, end);

              // highlight all keywords
              keywords.forEach(function (keyword) {
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(
                  regS,
                  '<em class="search-keyword">' + keyword + "</em>"
                );
              });

              str += '<p class="search-result">' + match_content + "...</p>";
            }
            str += "</li>";
          }
        });
        str += "</ul>";
        $resultContent.innerHTML = str;
      }
    },
  });
};


var searchString = new URLSearchParams(window.location.search).get('search');
console.log('search', searchString);

if (searchString) {
    $input = document.getElementById('search-input');
    $input.value = searchString;
    $input.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true,
    }));
}