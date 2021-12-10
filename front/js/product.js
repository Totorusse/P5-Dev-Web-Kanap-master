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
localStorage.quantity = 1;
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

//Fonction qui annonce l'ajout au panier
let panier = [];
document.getElementById("addToCart").onclick = function () {
  if (localStorage.couleur == undefined || "" || document.querySelector("select").value == "") {
    alert("Choisissez une couleur");
  } else if (panier.includes(localStorage.couleur) == false) {
    panier.push(localStorage._id, localStorage.couleur, localStorage.quantity);
    //alert("Panier mis à jour, Couleur: " + localStorage.couleur + " Quantité: " + localStorage.quantity);
  } else if (panier.includes(localStorage.couleur) == true) {
    let a = panier.indexOf(localStorage.couleur) + 1;
    let b = parseInt(localStorage.quantity, 10) + parseInt(panier[a], 10);

    panier.splice(a, 1, b);
    // alert("Panier mis à jour, Couleur: " + localStorage.couleur + " Quantité: " + localStorage.quantity);
  }
  let x = "panier" + localStorage._id;
  localStorage[x] = panier;

  console.log(panier);
};

//localStorage.clear();

console.log(localStorage);
