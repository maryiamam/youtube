var search = require('./components/search/search.js');
var youtubeItem = require('./components/youtubeitem/youtubeitem.js');
var pagination = require('./components/pagination/pagination.js');


var youtubeModule = new youtubeItem();
var searchModule = new search();
var paginationModule = new pagination(searchModule.getNextItems, youtubeModule.updateItems);
searchModule.addSearch();
youtubeModule.addYouTubeContainer();
paginationModule.addPaginationContainer();
searchModule.updatePagination = paginationModule.updatePagination;
searchModule.addNewlyUploadedItems = paginationModule.addNewlyUploadedItems;
