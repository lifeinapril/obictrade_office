


    var thousands_separators=function(num){
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    };
 


    
app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '').toLowerCase().trim().replace(/[^a-zA-Z ]/g, "");
    };
  }]);
  



  app.filter('currency', function(){
    return function(input){
        if(isNaN(input)){
          return input;
        } else {
          var symbol = ' ₦ ';
            input=Math.round(input * 100) / 100;
            return symbol + thousands_separators(input);
          }
        };
  });
  
  


app.filter('unique', function() {
    return function(collection, keyname) {
       var output = [], 
           keys = [];
 
       angular.forEach(collection, function(item) {
           var key = item[keyname];
           if(keys.indexOf(key) === -1) {
               keys.push(key);
               output.push(item);
           }
       });
 
       return output;
    };
 });
 
 
  app.filter('split', function() {
         return function(input, splitChar, splitIndex) {
             return input.split(splitChar)[splitIndex];
         }
     });
 
 
 app.filter('regex', function() {
   return function(input, field, regex) {
     var patt = new RegExp(regex);
     var out = [];
     for (var i = 0; i < input.length; i++) {
       if (patt.test(input[i][field]))
         out.push(input[i]);
     }
     return out;
   };
 });
 
 
 
 app.filter('searchfilter', function() {
   return function(input, term) {
     var regex = new RegExp(term || '', 'i');
     var obj = {};
     angular.forEach(input, function(v, i){
       if(regex.test(v + '')){
         obj[i]=v;
       }
     });
     return obj;
   };
 });
 
 app.filter('capitalize', function() {
     return function(input) {
       return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
     }
   })
 
 app.filter('range', function() {
   return function(input, min, max) {
     min = parseInt(min); 
     max = parseInt(max);
     for (var i=min; i<max; i++)
       input.push(i);
     return input;
   };
 });
 
 
 