function search(){

  var that = this;
  var token;
  var inputValue;

  this.makeItems = function(resp1, resp2){
    var items = [];
    for (var i = 0; i < resp1.pageInfo.resultsPerPage; i++){
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
      }
    }
    return items;
  }

  this.collectIds = function(resp){
    var ids = resp.items[0].id.videoId;
    for(var i = 1; i < resp.pageInfo.resultsPerPage; i++){
      ids = ids + ',' + resp.items[i].id.videoId;
    }
    return ids;
  }

  this.getNextItems = function(){
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&type=video&part=snippet&maxResults=15&pageToken=' + token + '&q=' + inputValue, true);
    xhr.onload = function() {
    response = JSON.parse(this.responseText);
    if (response.items.length == 0){
      return;
    } else{
      token = response.nextPageToken;
      ids = that.collectIds(response);

      var xhr_stat = new XHR();
      xhr_stat.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&id=' + ids + '&part=statistics', true);
      xhr_stat.onload = function() {
        resp_stat = JSON.parse(this.responseText);
        items = that.makeItems(response, resp_stat);
        that.addNewlyUploadedItems(items)
      }
      xhr_stat.onerror = function() {
        alert( 'ERROR ' + this.status );
      }
      xhr_stat.send();
    }
  }
  xhr.onerror = function() {
    alert( 'ERROR ' + this.status );
  }
  xhr.send();
}

  this.addSearch = function(){
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

	  handler = function(){

      if (inputForm.value == ''){
        var container = document.getElementById('youtube-items-container');
        container.innerHTML = '<p>Input your request!</p>';
      }
      else{

        var response, resp_stat;
        var items = [];
        var ids;
        var totalResults;
        inputValue = inputForm.value;

    		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    		var xhr = new XHR();
    		xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&type=video&part=snippet&maxResults=15&q='+ inputForm.value, true);
        xhr.onload = function() {
          response = JSON.parse(this.responseText);
          if (response.items.length == 0){
            var container = document.getElementById('youtube-items-container');
            container.innerHTML = '<p>Nothing found!</p>';
          }
          else{
            ids = that.collectIds(response);
            token = response.nextPageToken;
            totalResults = response.pageInfo.totalResults;

            var xhr_stat = new XHR();
            xhr_stat.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCIGF_3mtgo3dQrvq_U2Tf0-YGnnOhaoJ4&id=' + ids + '&part=statistics', true);
            xhr_stat.onload = function() {
              resp_stat = JSON.parse(this.responseText);
              items = that.makeItems(response, resp_stat);
              that.updatePagination(items, totalResults);
            }
        		xhr_stat.onerror = function() {
        		  alert( 'ERROR ' + this.status );
        		}
        		xhr_stat.send();
          }

        }
    		xhr.onerror = function() {
    		  alert( 'ERROR ' + this.status );
    		}
    		xhr.send();

      }

	  }
  }

}

module.exports = search;
