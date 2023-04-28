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

function coexe(){
    document.getElementById("conname").disabled = false;
    // document.getElementById("conid").disabled = true;
    document.getElementById("concmd").disabled = false;
    var don = document.getElementById("strstp");
    don.style.display = "block";
    var strt = document.getElementById("str");
    strt.style.display = "none";
    var strt = document.getElementById("stp");
    strt.style.display = "none";
    var corm = document.getElementById("crm");
    corm.style.display = "none";
}


function contexe(){
    var connm = document.getElementById("conname").value;
    var concmmd= document.getElementById("concmd").value;

    if (connm.length>0 && concmmd.length>0){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            document.getElementById("outcome").innerHTML = this.responseText;
        }
        xhttp.open("GET", "http://localhost:3000/exe?conname=" + connm + "&concmd=" + concmmd); 
        xhttp.send();   
    }
    else {
        alert("! Invalid input \n Please Enter Container name or ID with Command.")
    }
}

function start(){
    document.getElementById("conname").disabled = false;
    // document.getElementById("conid").disabled = false;
    document.getElementById("concmd").disabled = true;
    var strt = document.getElementById("str");
    strt.style.display = "block";
    var strt = document.getElementById("stp");
    strt.style.display = "none";
    var don = document.getElementById("strstp");
    don.style.display = "none";
    var corm = document.getElementById("crm");
    corm.style.display = "none";
}

function stop(){
    document.getElementById("conname").disabled = false;
    // document.getElementById("conid").disabled = false;
    document.getElementById("concmd").disabled = true;
    var strt = document.getElementById("str");
    strt.style.display = "none";
    var strt = document.getElementById("stp");
    strt.style.display = "block";
    var don = document.getElementById("strstp");
    don.style.display = "none";
    var corm = document.getElementById("crm");
    corm.style.display = "none";
}

function contsrt(){
    var connm = document.getElementById("conname").value;
    const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            document.getElementById("outcome").innerHTML = this.responseText;
        }
        xhttp.open("GET", "http://localhost:3000/srt?conname=" + connm); 
        xhttp.send();
}

function contstp(){
    var connm = document.getElementById("conname").value;
    const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            document.getElementById("outcome").innerHTML = this.responseText;
        }
        xhttp.open("GET", "http://localhost:3000/stp?conname=" + connm); 
        xhttp.send();
}