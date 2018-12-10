function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g,
     ' '));
}

var getAllrecords = function () {
  $.getJSON('https://api.airtable.com/v0/appaje82QQOSfrmgt/Table%201?api_key=keyx07NheOELyB6Uu',
    function (airtable) {
      var html = [];
    
      html.push('<div class="row">');
      $.each(airtable.records, function (index, record) {
        var id = record.id;
        var name = record.fields['Name'];
        var address = record.fields['Address'];
        var rating = record.fields['Rating'];
        var inorout = record.fields['Inside or outside'];
        var picture = record.fields['Picture'];
        html.push(listView(id, name, address, rating, picture, inorout));

      });
      $('.list').append(html);
    }
  );
}

var getOnerecord = function (id) {
  $.getJSON(`https://api.airtable.com/v0/appaje82QQOSfrmgt/Table%201/${id}?api_key=keyx07NheOELyB6Uu`,
    function (record) {
      var html = [];
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var inorout = record.fields['Inside or outside'];
      var picture = record.fields['Picture'];
      html.push(detailView(name, address, rating, picture, inorout));
      $('body').append(html);
    }
  );
}

var listView = function (id, name, address, rating, picture, inorout) {
  return `
  <div class="card" style=" height: 540px; width: 17rem; display: inline-flex;">
  ${picture ? `<img src="${picture[0].url}">` : ``}
  <div class="card-body"> 
    <h2><a href="index.html?id=${id}">${name}</a></h2>
    <p class="card-text"> <li>${address}</li><br><li>${rating}</li><br><li>${inorout}</li></p>
  </div>
</div>
  `;
}

var detailView = function (name, address, rating, picture, inorout) {
  return `
  <h2>
  <div class = "container">
    <div class = "text-center"> 
      <h2>${name}</h2> 
      <p>${address}</p>
      <p>${rating}</p>
      <p>${inorout}</p> 
      ${picture ? `<img src="${picture[0].url}">` : ``}
      </div>
    </div>
    </h2> 
  `;
}

var id = getParameterByName('id');
if (id) {
  getOnerecord(id);
} else {
  getAllrecords();
} 