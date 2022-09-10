$(document).ready(function(){
	
  var url = "http://www.veefinition.com";
  
  $.ajax({
    url: API + 'scraper_processor',
    data: 'url='+url,
    type: 'POST',
    success: function(response){
        $('#blogplot').html(response);
    },
    error: function(r){
    }
    });
	
	
});