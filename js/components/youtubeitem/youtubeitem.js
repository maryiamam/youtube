function youtubeItem(){

  var that = this;

  this.addYouTubeContainer = function(){
    var parentElem = document.body;
    var container = document.createElement('div');
    container.setAttribute('id', 'youtube-items-container');
    container.innerHTML = '<p>Hello!</p> <p>Here will be search results!</p>';
    parentElem.appendChild(container);
  }

	this.addItem = function(item){

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
	}

  this.updateItems = function(items){
    var parentElem = document.getElementById("youtube-items-container");
    parentElem.innerHTML = '';
    items.forEach(that.addItem);
  }

}

module.exports = youtubeItem;
