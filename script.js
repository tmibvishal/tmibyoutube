console.log("fdfd");

window.onload = function(){
    document.getElementById("getVidBut").addEventListener("click", sendvidUrl);
}

function sendvidUrl(){
    document.getElementById("form1").submit();
}