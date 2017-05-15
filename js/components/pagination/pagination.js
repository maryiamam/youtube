function pagination(getNextItems, updateItems){

  var that = this;
  var items = [];
  var page = 1;
  var itemsPerPage = 3;
  var itemsCount = 15;
  var alreadyLoadedCount = 15

  this.addPaginationContainer = function(){
    var parentElem = document.body;
    var container = document.createElement('div');
    container.setAttribute('id', 'pagination-container');
    parentElem.appendChild(container);
  }

  this.addNewlyUploadedItems = function(newItems){
    items = items.concat(newItems);
    alreadyLoadedCount += newItems.length;
  }

  this.drawPagination = function(totalResults){
    var parentElem = document.getElementById('pagination-container');
    parentElem.innerHTML = '';
    var left = document.createElement('a');
    left.innerHTML = '<-';
    left.setAttribute('onclick', 'pageLeft()');
    var pageNumber = document.createElement('span');
    pageNumber.innerHTML = page;
    pageNumber.setAttribute('id', 'page-number');
    var right = document.createElement('a');
    right.innerHTML = '->';
    right.setAttribute('onclick', 'pageRight()');
    var totalPagesNumber = document.createElement('span');
    totalPagesNumber.innerHTML = totalResults;
    parentElem.appendChild(left);
    parentElem.appendChild(pageNumber);
    parentElem.appendChild(right);
    parentElem.appendChild(totalPagesNumber);

    pageLeft = function(){
      if (page == 1){
        return;
      }else{
        page--;
        var itemsToShow = items.slice((page - 1)*itemsPerPage, page *itemsPerPage);
        updateItems(itemsToShow);
        var pageNumberElem = document.getElementById('page-number');
        pageNumberElem.innerHTML = page;
      }
    }

    pageRight = function(itemsCount){
      var totalCountPages = 0;
      if (itemsCount%itemsPerPage === 0){
        totalCountPages = itemsCount/itemsPerPage;
      }else{
        totalCountPages = Math.floor(itemsCount/itemsPerPage) + 1;
      }
      var totalLoadedPages = 5;
      if (alreadyLoadedCount%itemsPerPage === 0){
        totalLoadedPages = alreadyLoadedCount/itemsPerPage;
      }else{
        totalLoadedPages = Math.floor(alreadyLoadedCount/itemsPerPage) + 1;
      }
      if (page == totalCountPages){
        return;
      } else {
        page++;
        if (page >= totalLoadedPages - 3){
          getNextItems();
        }
        if (items.length < (page - 1)*itemsPerPage){
          var container = document.getElementById('youtube-items-container');
          container.innerHTML = '<p>Loading...</p>';
          while(items.length < (page - 1)*itemsPerPage){
            continue;
          }
        }
        var itemsToShow = items.slice((page - 1)*itemsPerPage, page*itemsPerPage);
        updateItems(itemsToShow);
        var pageNumberElem = document.getElementById('page-number');
        pageNumberElem.innerHTML = page;
      }
    }

    var itemsToShow = items.slice(0, itemsPerPage);
    updateItems(itemsToShow);

  }

  this.updatePagination = function(newItems, totalResults){
    page = 1;
    itemsPerPage = 3;
    items = newItems;
    itemsCount = totalResults;
    that.drawPagination(itemsCount);
  }

}

module.exports = pagination;
