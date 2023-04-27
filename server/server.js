const { exec } = require("child_process")

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


app.get("/run", (req,res) => {
    const contname = req.query.contname;
    const contimages = req.query.contimages;

    exec('docker run -dit --name ' + contname + " " + contimages , (err, stdout, stderr) => {
        console.log("New Container launched with id : " + stdout)  // latest container log
        res.send("<pre>Container Launched Succesfully...." + "<br>" + "Container Id is  - " + "<br>"+ stdout + "</pre>");
    })
})

app.listen(3000, () => {console.log("Server started.")})