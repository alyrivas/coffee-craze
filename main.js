function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllrecords = function() { 
$.getJSON('https://api.airtable.com/v0/appaje82QQOSfrmgt/Table%201?api_key=keyx07NheOELyB6Uu',
  function(airtable){
     var html = [];
     console.log("Allrecords");
    html.push('<div class="row">'); 
    $.each(airtable.records, function(index, record) {
      var id = record.id; 
      console.log(id)
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var inorout = record.fields['Insideoroutside'];
      var picture = record.fields['Picture']; 
      html.push(listView(id, name, address, rating, picture, inorout));
    
    });
    $('body').append(html);
  } 
); 
} 

  var getOnerecord = function(id) { 
    $.getJSON('https://api.airtable.com/v0/appaje82QQOSfrmgt/Table%201?api_key=keyx07NheOELyB6Uu',
    function(record){
      var hmtl = []; 
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var inorout = record.fields['Insideoroutside'];
      var picture = record.fields['Picture']; 
        html.push(listView(name, address, rating, picture, inorout));
        $('body').append(html);
  }
 );
} 
var listView = function(id, name, address, rating, picture) { 
  console.log(name)
  return `
  <h2><a href="index.html?id=${id}">${name}</a></h2>
  <p>${address}</p>
  <p>${rating}</p> 
  ${picture ? `<img src="${picture[0].url}">` : ``}
  `; 
}

var detailView = function( name, address, rating, picture) { 
  return `
  <h2>${name}</h2>
  <p>${address}</p>
  <p>${rating}</p> 
  ${picture ? `<img src="${picture[0].url}">` : ``}
  `; 
}
var id = getParameterByName('id'); 
if (id) {
  getOnerecord(id);
} else { 
  getAllrecords();
}
