function Cont() {
    var cn = document.getElementById("contname").value;
    var ci = document.getElementById("contimages").value;
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        document.getElementById("outcome").innerHTML = this.responseText;
    }
    xhttp.open("GET", "http://localhost:3000/run?contname=" + cn + "&contimages=" + ci);
    xhttp.send();
}

function contps() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        document.getElementById("outcome").innerHTML = this.responseText;
    }
    xhttp.open("GET", "http://localhost:3000/ps"); 
    xhttp.send(); 
}

function contimgs(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        document.getElementById("outcome").innerHTML = this.responseText;
    }
    xhttp.open("GET", "http://localhost:3000/imgs"); 
    xhttp.send(); 
}