let str = document.URL;
let url = new URL(str);
let lienId = url.searchParams.get("id");
console.log(lienId);

document.getElementById("orderId").innerHTML = lienId ;