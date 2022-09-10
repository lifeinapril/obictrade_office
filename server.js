var express    = require("express");
var app        = express();
var port = 9000;
app.use(express.static("./"));
app.use(function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
// Start Server
app.listen(port, function () {
    console.log( "Admin Express server active");
});