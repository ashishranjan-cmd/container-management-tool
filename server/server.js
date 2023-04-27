const express = require("express")
const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, '../client/public')))

app.get('/app', function (req, res, next) {
 
    const options = {
        root: path.join(__dirname, '../client/public')
    };
 
    const fileName = 'app.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});

app.listen(3000, () => {console.log("Server started.")})