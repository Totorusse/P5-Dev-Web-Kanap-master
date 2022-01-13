let str = document.URL;
let url = new URL(str);
let lienId = url.searchParams.get("id");

document.getElementById("orderId").innerHTML = lienId;

let str2 = "http://127.0.0.1:5500/P5-Dev-Web-Kanap-master/front/html/confirmation.html";
const nextTitle = "Confirmation";
const nextState = { additionalInformation: "Updated the URL with JS" };

window.history.replaceState(nextState, nextTitle, str2);
