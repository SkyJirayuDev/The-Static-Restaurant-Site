(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

  // ฟังก์ชันแสดง loading
  function showLoading(selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  }

  // ฟังก์ชันแทรก HTML
  function insertHtml(selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  }

  // ฟังก์ชันแทนที่ค่าในเทมเพลต {{propName}} ด้วย propValue
  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // STEP 0: เริ่มต้นโหลดหน้า
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML,
      true
    );
  });

  function buildAndShowHomeHTML(categories) {
    // STEP 2: โหลด home snippet
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        // STEP 2: เลือกหมวดหมู่แบบสุ่ม
        var chosenCategoryShortName = chooseRandomCategory(categories).short_name;

        // STEP 3: แทนที่ {{randomCategoryShortName}}
        var homeHtmlToInsertIntoMainPage = insertProperty(
          homeHtml,
          "randomCategoryShortName",
          "'" + chosenCategoryShortName + "'"
        );

        // STEP 4: แทรก HTML เข้าไปในหน้า
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
      },
      false
    );
  }

  function chooseRandomCategory(categories) {
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
    return categories[randomArrayIndex];
  }

  global.$dc = dc;
})(window);
