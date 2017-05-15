/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function pagination(getNextItems, updateItems) {

  var that = this;
  var items = [];
  var page = 1;
  var itemsPerPage = 3;
  var itemsCount = 15;
  var alreadyLoadedCount = 15;

  this.addPaginationContainer = function () {
    var parentElem = document.body;
    var container = document.createElement('div');
    container.setAttribute('id', 'pagination-container');
    parentElem.appendChild(container);
  };

  this.addNewlyUploadedItems = function (newItems) {
    items = items.concat(newItems);
    alreadyLoadedCount += newItems.length;
  };

  this.drawPagination = function (totalResults) {
    var parentElem = document.getElementById('pagination-container');
    parentElem.innerHTML = '';
    var left = document.createElement('a');
    left.setAttribute('class', 'fa fa-arrow-left');
    left.setAttribute('onclick', 'pageLeft()');
    var pageNumber = document.createElement('span');
    pageNumber.innerHTML = '&nbsp;' + page + '&nbsp;';
    pageNumber.setAttribute('id', 'page-number');
    var right = document.createElement('a');
    right.setAttribute('class', 'fa fa-arrow-right');
    right.setAttribute('onclick', 'pageRight()');
    var ofPages = document.createElement('div');
    ofPages.innerHTML = 'of';
    var totalPagesNumber = document.createElement('div');
    totalPagesNumber.innerHTML = '&nbsp;' + Math.floor(totalResults / itemsPerPage);
    parentElem.appendChild(left);
    parentElem.appendChild(pageNumber);
    parentElem.appendChild(right);
    parentElem.appendChild(ofPages);
    parentElem.appendChild(totalPagesNumber);

    pageLeft = function () {
      if (page == 1) {
        return;
      } else {
        page--;
        var itemsToShow = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        updateItems(itemsToShow);
        var pageNumberElem = document.getElementById('page-number');
        pageNumberElem.innerHTML = '&nbsp;' + page + '&nbsp;';
      }
    };

    pageRight = function (itemsCount) {
      var totalCountPages = 0;
      if (itemsCount % itemsPerPage === 0) {
        totalCountPages = itemsCount / itemsPerPage;
      } else {
        totalCountPages = Math.floor(itemsCount / itemsPerPage) + 1;
      }
      var totalLoadedPages = 5;
      if (alreadyLoadedCount % itemsPerPage === 0) {
        totalLoadedPages = alreadyLoadedCount / itemsPerPage;
      } else {
        totalLoadedPages = Math.floor(alreadyLoadedCount / itemsPerPage) + 1;
      }
      if (page == totalCountPages) {
        return;
      } else {
        page++;
        if (page >= totalLoadedPages - 3) {
          getNextItems();
        }
        if (items.length < (page - 1) * itemsPerPage) {
          var container = document.getElementById('youtube-items-container');
          container.innerHTML = '<p>Loading...</p>';
          while (items.length < (page - 1) * itemsPerPage) {
            continue;
          }
        }
        var itemsToShow = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        updateItems(itemsToShow);
        var pageNumberElem = document.getElementById('page-number');
        pageNumberElem.innerHTML = '&nbsp;' + page + '&nbsp;';
      }
    };

    var itemsToShow = items.slice(0, itemsPerPage);
    updateItems(itemsToShow);
  };

  this.updatePagination = function (newItems, totalResults) {
    page = 1;
    itemsPerPage = 3;
    items = newItems;
    itemsCount = totalResults;
    that.drawPagination(itemsCount);
  };
}

module.exports = pagination;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function search() {

  var that = this;
  var token;
  var inputValue;

  this.makeItems = function (resp1, resp2) {
    var items = [];
    for (var i = 0; i < resp1.pageInfo.resultsPerPage; i++) {
      var date = resp1.items[i].snippet.publishedAt.slice(0, 10);
      items[i] = {
        title: resp1.items[i].snippet.title,
        url: 'https://www.youtube.com/watch?v='.concat(resp1.items[i].id.videoId),
        preview: resp1.items[i].snippet.thumbnails.medium.url,
        description: resp1.items[i].snippet.description,
        authorUrl: 'https://www.youtube.com/channel/'.concat(resp1.items[i].snippet.channelId),
        author: resp1.items[i].snippet.channelTitle,
        date: date,
        views: resp2.items[i].statistics.viewCount
      };
    }
    return items;
  };

  this.collectIds = function (resp) {
    var ids = resp.items[0].id.videoId;
    for (var i = 1; i < resp.pageInfo.resultsPerPage; i++) {
      ids = ids + ',' + resp.items[i].id.videoId;
    }
    return ids;
  };

  this.getNextItems = function () {
    var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&type=video&part=snippet&maxResults=15&pageToken=' + token + '&q=' + inputValue, true);
    xhr.onload = function () {
      response = JSON.parse(this.responseText);
      if (response.items.length == 0) {
        return;
      } else {
        token = response.nextPageToken;
        ids = that.collectIds(response);

        var xhr_stat = new XHR();
        xhr_stat.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&id=' + ids + '&part=statistics', true);
        xhr_stat.onload = function () {
          resp_stat = JSON.parse(this.responseText);
          items = that.makeItems(response, resp_stat);
          that.addNewlyUploadedItems(items);
        };
        xhr_stat.onerror = function () {
          alert('ERROR ' + this.status);
        };
        xhr_stat.send();
      }
    };
    xhr.onerror = function () {
      alert('ERROR ' + this.status);
    };
    xhr.send();
  };

  this.addSearch = function () {
    var parentElem = document.body;

    var searchForm = document.createElement('form');
    searchForm.setAttribute('id', 'search-form');

    var input = document.createElement('div');
    input.setAttribute('class', 'text-input');
    var inputForm = document.createElement('input');
    input.appendChild(inputForm);
    input.setAttribute("type", "text");

    var buttonSubmit = document.createElement('div');
    var btn = document.createElement('input');
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "Search");
    btn.setAttribute("class", "sbtn");
    buttonSubmit.setAttribute("class", "search-btn");
    buttonSubmit.setAttribute("onclick", "handler()");
    buttonSubmit.appendChild(btn);

    searchForm.appendChild(input);
    searchForm.appendChild(buttonSubmit);

    parentElem.appendChild(searchForm);

    handler = function () {

      if (inputForm.value == '') {
        var container = document.getElementById('youtube-items-container');
        container.innerHTML = '<p>Input your request!</p>';
        var paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = '';
      } else {

        var response, resp_stat;
        var items = [];
        var ids;
        var totalResults;
        inputValue = inputForm.value;

        var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&type=video&part=snippet&maxResults=15&q=' + inputForm.value, true);
        xhr.onload = function () {
          response = JSON.parse(this.responseText);
          if (response.items.length == 0) {
            var container = document.getElementById('youtube-items-container');
            container.innerHTML = '<p>Nothing found!</p>';
            var paginationContainer = document.getElementById('pagination-container');
            paginationContainer.innerHTML = '';
          } else {
            ids = that.collectIds(response);
            token = response.nextPageToken;
            totalResults = response.pageInfo.totalResults;

            var xhr_stat = new XHR();
            xhr_stat.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&id=' + ids + '&part=statistics', true);
            xhr_stat.onload = function () {
              resp_stat = JSON.parse(this.responseText);
              items = that.makeItems(response, resp_stat);
              that.updatePagination(items, totalResults);
            };
            xhr_stat.onerror = function () {
              alert('ERROR ' + this.status);
            };
            xhr_stat.send();
          }
        };
        xhr.onerror = function () {
          alert('ERROR ' + this.status);
        };
        xhr.send();
      }
    };
  };
}

module.exports = search;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function youtubeItem() {

  var that = this;

  this.addYouTubeContainer = function () {
    var parentElem = document.body;
    var container = document.createElement('div');
    container.setAttribute('id', 'youtube-items-container');
    container.innerHTML = '<p>Hello!</p> <p>Here will be search results!</p>';
    parentElem.appendChild(container);
  };

  this.addItem = function (item) {

    var parentElem = document.getElementById("youtube-items-container");

    var Item = document.createElement('div');
    Item.setAttribute('class', 'youtube-item');

    var title = document.createElement('div');
    title.setAttribute('class', 'video-title');
    title.innerHTML = '<a href="' + item.url + '" target="_blank">' + item.title + '</a>';

    var preview = document.createElement('div');
    preview.setAttribute('class', 'video-preview');
    preview.innerHTML = "<img src='" + item.preview + "' width='260px'>";

    var info = document.createElement('div');
    info.setAttribute('class', 'video-info');

    var description = document.createElement('div');
    description.setAttribute('class', 'video-description');
    description.innerHTML = item.description;

    var author = document.createElement('p');
    var authorA = document.createElement('a');
    authorA.setAttribute('class', 'fa fa-user video-author');
    authorA.setAttribute('href', item.authorUrl);
    authorA.innerHTML = '&nbsp;' + item.author;
    author.appendChild(authorA);

    var date = document.createElement('p');
    var dateS = document.createElement('span');
    dateS.setAttribute('class', 'fa fa-calendar');
    dateS.innerHTML = '&nbsp;' + item.date;
    date.appendChild(dateS);

    var views = document.createElement('p');
    var viewsS = document.createElement('span');
    viewsS.setAttribute('class', 'fa fa-eye');
    viewsS.innerHTML = '&nbsp;' + item.views;
    views.appendChild(viewsS);

    info.appendChild(author);
    info.appendChild(date);
    info.appendChild(views);
    info.appendChild(description);

    Item.appendChild(title);
    Item.appendChild(preview);
    Item.appendChild(info);

    parentElem.appendChild(Item);
  };

  this.updateItems = function (items) {
    var parentElem = document.getElementById("youtube-items-container");
    parentElem.innerHTML = '';
    items.forEach(that.addItem);
  };
}

module.exports = youtubeItem;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var search = __webpack_require__(1);
var youtubeItem = __webpack_require__(2);
var pagination = __webpack_require__(0);

var youtubeModule = new youtubeItem();
var searchModule = new search();
var paginationModule = new pagination(searchModule.getNextItems, youtubeModule.updateItems);
searchModule.addSearch();
youtubeModule.addYouTubeContainer();
paginationModule.addPaginationContainer();
searchModule.updatePagination = paginationModule.updatePagination;
searchModule.addNewlyUploadedItems = paginationModule.addNewlyUploadedItems;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
