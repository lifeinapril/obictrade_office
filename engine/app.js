const app=angular.module("office", ['ngRoute','chart.js',"ngStorage","ui.bootstrap",'ngFileUpload',"toastr"])
.constant('Config', {  
  API:'https://obictrade.com/api/admin/',
  media:'https://storage.googleapis.com/obicstorage/',
  token:"eyJhbGciOiJIUzI1NiJ9.eyJTZWNyZXQiOiJ0cmFkZW9iaWNAZ21haWwuY29tIiwiSXNzdWVyIjoiSXNzdWVyIiwiZXhwIjoxNjUxODUyMjU4LCJpYXQiOjE2NTE4NTIyNTh9.WsvtTMfX4KQJW3wveHc7q5khQQtVCqxQpjJFzjBjR6A"
}).config(['ChartJsProvider', function (ChartJsProvider) {
    ChartJsProvider.setOptions('line', {
      chartColors: ['#FFA500', '#FFA500'],
      responsive: true,
      showLines: true
    });
  }])

  