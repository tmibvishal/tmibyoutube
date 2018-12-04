function getvidurl(wholeUrl) {
    //http://localhost:63342/tmibvishal.github.io/tmibyoutube/download.htm?yurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D0xT_2jfVaII
    let first = wholeUrl.indexOf("?") + 1;
    let end = wholeUrl.length;
    wholeUrl = wholeUrl.slice(first, end);
    let yUrl = wholeUrl.split("=")[1]
    return decodeURIComponent(yUrl);
}

function downloadVideo1(but){
    let parent = document.getElementById("selectid1")
    let url = parent.value;
    let a = document.createElement("a");
    a.href = url;
    a.click();
}

function downloadVideo2(but){
    let parent = document.getElementById("selectid2")
    let url = parent.value;
    let a = document.createElement("a");
    a.href = url;
    a.click();
}

window.onload = function () {
    let parent = document.getElementById("video");
    console.log("yo boi");
    let current_url = document.URL;
    //console.log("current url 3 is :" + getvidurl(current_url));
    $.ajax({
        url: "https://tmibvishal.000webhostapp.com/getting_json.php",
        method: "get",
        data: {"link": getvidurl(current_url)},
        success: function (data) {
            //console.log((data));
            let jsonfile = JSON.parse(data);
            console.log(jsonfile["videoTitle"]);
            console.log(jsonfile["videoAuthor"]);
            let DOMtitle = document.createElement("div");

            let str = `<div class="flex-container"><div class="box1_style2"><div style="text-align: center; margin: auto;"><strong>${jsonfile["videoTitle"]}</strong> <br>
<strong>Channel:</strong> ${jsonfile["videoAuthor"]} <br>`;
            if (jsonfile["videoViews"] != null)
                str += `<strong>Views:</strong> ${jsonfile["videoViews"]} <br>`;
            str += `<br> <div class="crop"><img src="${jsonfile["videoThumbURL"]}" width="355"></div></div></div> <div class="box1_style2"><div style="text-align: center; margin: auto;"><strong>Commonly used Available Formats</strong><br> <div style="margin: 10px;"><select id="selectid1"><optgroup label="Video Formats">`;

            let commonlyUsedAvailableFormats = jsonfile["commonlyUsedAvailableFormats"];
            commonlyUsedAvailableFormats.forEach(function (item) {

                str+= `<option value='${item["url"]}' itag="${item["itag"]}">${item["quality"]} ${item["type"]}`;

                if (item["size"] != "0 MB") {
                    str+= ` (${item["size"]})`;
                }

                str+= `</option>`;
            });

            str += `</optgroup></select> <button onclick="downloadVideo1()">Download</button></div>`;


            //for all formats
            str += `<br><br> <strong>All available Video (without Audio) and Audio Formats </strong><br> <div style="margin: 10px;"><select id="selectid2"><optgroup label="Videos without audio and audio only">`;

            let allAvailableFormats = jsonfile["remainingFormats"];
            allAvailableFormats.forEach(function (item) {

                str+= `<option value='${item["url"]}' itag="${item["itag"]}">${item["quality"]} ${item["type"]}`;

                if (item["size"] != "0 MB") {
                    str+= ` (${item["size"]})`;
                }

                str+= `</option>`;
            });

            str += `</optgroup></select> <button onclick="downloadVideo2()">Download</button></div></div></div></div><br><div style="text-align: center;">By using this website, you accept our Terms of Service and agree not to download Copyright content.</div><br><br>`;


            console.log(str);
            DOMtitle.innerHTML = str;
            parent.innerText = "";
            parent.appendChild(DOMtitle);
        },
        error: function (data) {
            console.log("error occured");
        }
    });
    console.log("yeah22");
}