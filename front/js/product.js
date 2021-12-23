//Fonction qui sauvegarde les éléments du panier
function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

//Fonction qui récupère les éléments du panier
function getPanier() {
  let panier = localStorage.getItem("panier");
  if (panier == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("panier"));
  }
}

//Fonction qui ajoute les éléments du panier
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

//Fonction qui retire des éléments du panier
function removeFromPanier(produit) {
  let panier = getPanier();
  panier = panier.filter((p) => p.id != produit.id);
  savePanier(panier);
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
        localStorage.prix = i.price;
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
console.log(qte);

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
    addPanier({ id: lienId, couleur: localStorage.couleur, quantity: parseInt(localStorage.quantity), prix: localStorage.prix });
    // alert("Panier mis à jour, Couleur: " + localStorage.couleur + " Quantité: " + localStorage.quantity);
  }
});

//localStorage.clear();
