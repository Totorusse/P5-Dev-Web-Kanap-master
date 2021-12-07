let str = document.URL;
let url = new URL(str);
let LienId = url.searchParams.get("id");

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    for (let i of value) {
      if (i._id == LienId) {
        document.getElementsByClassName("item__img")[0].innerHTML +=
          "<img src=" + i.imageUrl + " alt=" + '"' + i.altTxt + '"' + ">";
        document.getElementById("title").innerHTML = i.name;
        document.getElementById("price").innerHTML = i.price;
        document.getElementById("description").innerHTML = i.description;
        for (let j of i.colors) {
          document.getElementById("colors").innerHTML += "<option value=" + j + ">" + j + "</option>";
        }
        localStorage._id = i._id;
      }
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

//Fonction qui récupère la quantité de canapé
const input = document.querySelector("input");
const qte = document.getElementById("quantity");
input.addEventListener("change", updateValue);

function updateValue(e) {
  qte.textContent = e.target.value;
  localStorage.quantity = e.target.value;
}

//Fonction qui récupère la couleur du canapé
document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.querySelector("select").onchange = changeEventHandler;
  },
  false
);

function changeEventHandler(event) {
  localStorage.couleur = event.target.value;
}

console.log(localStorage);

//Fonction qui annonce l'ajout au panier
function send(x, y, z) {
  x = localStorage._id;
  y = localStorage.couleur;
  z = localStorage.quantity;
  const panier = [x, y, z];

  if (y == y) {
    console.log(panier);
  }

  alert("Panier mis à jour, Couleur: " + y + " Quantité: " + z);
}
document.getElementById("addToCart").addEventListener("click", send);
