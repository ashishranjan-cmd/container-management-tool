const { exec } = require("child_process")

const express = require("express")
const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, '../client/public')))

app.get('/about', function (req, res, next) {
 
    const options = {
        root: path.join(__dirname, '../client/public')
    };
 
    const fileName = 'about.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error(`error: ${err.message}`);
            res.send("Error:" + "<br/>"+" Failed to load page.")
            return;
            //next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});

app.get('/', function (req, res, next) {
 
    const options = {
        root: path.join(__dirname, '../client/public')
    };
 
    const fileName = 'homepage.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error(`error: ${err.message}`);
            res.send("Error:" + "<br/>"+" Failed to load page.")
            return;
            //next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});

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


app.get("/run", (req,res, next) => {
    const contname = req.query.contname;
    const contimages = req.query.contimages;

    exec('docker run -dit --name ' + contname + " " + contimages , (err, stdout, stderr) => {
        if (err){
            next(err);
            res.send("Error while running launching the container.")
        } else {
            console.log("New Container launched with id : " + stdout)  // latest container log
            res.send("<pre>Container Launched Succesfully...." + "<br>" + "Container Id is  - " + "<br>"+ stdout + "</pre>");
            next();
        }
    });
});

app.get("/ps", (req,res) => {
    exec("docker ps | tail -n +2" , (err, stdout, stderr) => {
        if (err){
            res.send("Error while loading...")
        } else {
            let data =  stdout.split("\n");  // storing the entire value in a variable // "\n" is used because table has hidden new line character
            res.write("<table text-align='center' width='100%' bgcolor='#2E3840' >"); // to get td and tr tag work inside the callback function
            res.write("<tr><th>Container ID</th><th bgcolor='black'>Image Name</th><th>Container Name</th></tr>")

            data.forEach(( contdetails) => { 
            cinfo = contdetails.trim().split(/\s+/) ;
            console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[cinfo.length -1]);
            res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td bgcolor='black'>" + cinfo[1] + "</td>" + "<td>" + cinfo[cinfo.length -1] + "</td>"+"</td>" + "</tr>")
            })
            // res.send("<pre>" + stdout + "</pre>");
            res.write("</table>")
            res.send();
        }    
    });
});

app.get("/imgs", (req,res) => {
    exec('docker images', (err, stdout, stderr) => {
        console.log("listing all the docker images availabel" + stdout)  // all container images
        res.send( "<pre>" + stdout + "</pre>");
    });
});

app.get("/exe", (req,res) => {

    const conname = req.query.conname;
    const concmd = req.query.concmd;

    exec('docker exec ' + conname + " " + concmd, (err, stdout, stderr) => {

        if (err) {
            console.error(`error: ${err.message}`);
            res.send("Command failed" + "<br/>"+"Container not running.")
            return;
          }
        console.log("Executing " + concmd + " command in "+ conname +"\n" + stdout)  // executing command
        res.send( "<pre>" + stdout + "</pre>");
    });
});

app.get("/srt", (req,res) => {
    const conname = req.query.conname;

    exec('docker start ' + conname , (err, stdout, stderr) => {
        console.log("Starting stopped container " + conname + "\n" + stdout)  // start container using name
        res.send( "A container started with name : "+"<pre>" + stdout + "</pre>");
    });
});

app.get("/stp", (req,res) => {
    const conname = req.query.conname;

    exec('docker stop ' + conname , (err, stdout, stderr) => {
        console.log("Stopped container " + conname + "\n" + stdout)  // stop container using name
        res.send(" A Container stopped with name : " + stdout);
    });
});

app.get("/ctrm", (req,res) => {

    const conname = req.query.conname;

    exec('docker rm ' + conname , (err, stdout, stderr) => {

        if (err) {
            console.error(`error: ${err.message}`);
            res.send("Failed" + "<br/>"+" Can't remove running container.")
            return;
          }
        console.log(stdout)  // executing command
        res.send( "Container removed with name : <br/>" + stdout);
    });
});



app.listen(3000, () => {console.log("Server started.")})