function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

function getPanier() {
  let panier = localStorage.getItem("panier");
  if (panier == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("panier"));
  }
}

function addPanier(produit) {
  let panier = getPanier();
  let foundProduit = panier.find((p) => p.id == produit.id && p.couleur == produit.couleur);
  if (panier.includes(foundProduit)) {
  foundProduit.quantity += parseInt(localStorage.quantity, 10);
  } else {
    panier.push(produit);
  }
  savePanier(panier);
}

function removeFromPanier(produit) {
  let panier = getPanier();
  panier = panier.filter((p) => p.id != produit.id);
  savePanier(panier);
}

function changeQuantity(produit, quantity) {
  let panier = getPanier();
  let foundProduit = panier.find((p) => p.id == produit.id);
  if (foundProduit != undefined) {
    foundProduit.quantity += quantity;
    if (foundProduit.quantity <= 0) {
      removeFromPanier(foundProduit);
    } else {
      savePanier(panier);
    }
  }
}

function getNumberProduit() {
  let panier = getPanier();
  let number = 0;
  for (let produit of panier) {
    number += produit.quantity;
  }
  return number;
}

function getTotalPrice() {
  let panier = getPanier();
  let total = 0;
  for (let produit of panier) {
    total += produit.quantity * produit.prix;
  }
  return total;
}

let str = document.URL;
let url = new URL(str);
let lienId = url.searchParams.get("id");

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    for (let i of value) {
      if (i._id == lienId) {
        document.getElementsByClassName("item__img")[0].innerHTML +=
          "<img src=" + i.imageUrl + " alt=" + '"' + i.altTxt + '"' + ">";
        document.getElementById("title").innerHTML = i.name;
        document.getElementById("price").innerHTML = i.price;
        document.getElementById("description").innerHTML = i.description;
        for (let j of i.colors) {
          document.getElementById("colors").innerHTML += "<option value=" + j + ">" + j + "</option>";
        }
      }
    }
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

//Fonction qui ajoute au panier en cliquant sur le bouton
const button = document.getElementById("addToCart");
button.addEventListener("click", () => {
  if (localStorage.couleur == undefined || "" || document.querySelector("select").value == "") {
    alert("Choisissez une couleur");
  } else {
    addPanier({ id: lienId, couleur: localStorage.couleur, quantity: parseInt(localStorage.quantity) });
    // alert("Panier mis à jour, Couleur: " + localStorage.couleur + " Quantité: " + localStorage.quantity);
  }
});


//localStorage.clear();
