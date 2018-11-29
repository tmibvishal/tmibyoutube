function sendvidUrl(){
    let wholeUrl = document.getElementById("yurl").value;
    //https://www.youtube.com/watch?v=IWJUphbYnpg
    let first = wholeUrl.indexOf("?")+1;
    let end = wholeUrl.length;
    wholeUrl = wholeUrl.slice(first, end);
    let vidId = (wholeUrl.split("=")[1]);
    //console.log(vidId);

    document.getElementById("form1").submit();
}