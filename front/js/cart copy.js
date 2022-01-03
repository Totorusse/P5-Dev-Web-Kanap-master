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

//Fonction qui retire des éléments du panier ; produit = array
function removeFromPanier(produit) {
  let panier = getPanier();
  let foundProduit = panier.find((p) => p.id == produit.id && p.couleur == produit.couleur);
  panier = panier.filter((p) => p != foundProduit);
  savePanier(panier);
}

//Fonction qui modifie des quantités du panier ; produit = array
function changeQuantity(produit, quantity) {
  let panier = getPanier();
  let foundProduit = panier.find((p) => p.id == produit.id && p.couleur == produit.couleur);
  if (foundProduit != undefined) {
    foundProduit.quantity = quantity;
    if (foundProduit.quantity <= 0) {
      removeFromPanier(foundProduit);
    } else {
      savePanier(panier);
    }
  }
}

//Fonction qui récupère les quantité d'éléments du panier
function getNumberProduit() {
  let panier = getPanier();
  let number = 0;
  for (let produit of panier) {
    number += parseInt(produit.quantity, 10);
  }
  return number;
}

//Fonction qui calcule le total du prix des éléments du panier
function getTotalPrice() {
  let panier = getPanier();
  let total = 0;
  for (let produit of panier) {
    total += produit.quantity * produit.prix;
  }
  return total;
}

let panier = getPanier();
for (let i = 0; i < panier.length; i++) {
  let idDuPanier = panier[i].id;
  let CouleurDuPanier = panier[i].couleur;
  let QuantiteDuPanier = panier[i].quantity;

  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      for (let j in value) {
        if (value[j]._id == idDuPanier) {
          let lienImage = value[j].imageUrl;
          let nom = value[j].name;
          let prix = value[j].price;

          document.getElementById("cart__items").innerHTML +=
            '<article class="cart__item" data-id="' +
            idDuPanier +
            '" data-color="' +
            CouleurDuPanier +
            '"' +
            ">" +
            '<div class="cart__item__img"' +
            ">" +
            '<img src="' +
            lienImage +
            '" alt="Photographie ' +
            "d" +
            "'" +
            'un canapé">' +
            "</div>" +
            '<div class="cart__item__content"' +
            ">" +
            '<div class="cart__item__content__description"' +
            ">" +
            "<h2>" +
            nom +
            "</h2>" +
            "<p>" +
            CouleurDuPanier +
            "</p>" +
            "<p>" +
            prix +
            "€</p>" +
            "</div>" +
            '<div class="cart__item__content__settings">' +
            ' <div class="cart__item__content__settings__quantity">' +
            "<p>Qté : </p>" +
            '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +
            QuantiteDuPanier +
            '">' +
            "</div>" +
            '<div class="cart__item__content__settings__delete">' +
            '<p class="deleteItem">Supprimer</p>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</article>";
        }
      }
    });
}

//Fonction qui récupère la valeur de l'input modifié et appelle la fonction qui modifie la quantité du panier
function updateValue(e) {
  let target = e.target;
  let valeur = target.value;
  let article = target.closest("article");
  let articleId = article.dataset.id;
  let articleColor = article.dataset.color;
  let panierUpdate = { id: articleId, couleur: articleColor, quantity: valeur };
  changeQuantity(panierUpdate, valeur);
  document.getElementById("totalQuantity").innerHTML = getNumberProduit();
  document.getElementById("totalPrice").innerHTML = getTotalPrice();
}

//Fonction qui récupère la valeur de l'input modifié et appelle la fonction qui modifie la quantité du panier
function supprProduit(elt) {
  let target = elt.target;
  let article = target.closest("article");
  let articleId = article.dataset.id;
  let articleColor = article.dataset.color;
  let panierSuppr = { id: articleId, couleur: articleColor };
  removeFromPanier(panierSuppr);
  article.innerHTML = "";
  document.getElementById("totalQuantity").innerHTML = getNumberProduit();
  document.getElementById("totalPrice").innerHTML = getTotalPrice();
}
/*
//Fonction qui attend 1 seconde pour laissé la page chargé les informations
function resolveAfter1Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let x = document.querySelectorAll("article");
      x.forEach((x) => x.addEventListener("change", updateValue));
      let y = document.querySelectorAll(".deleteItem");
      y.forEach((y) => y.addEventListener("click", supprProduit));
      resolve(x);
    }, 1000);
  });
}

async function asyncCall() {
  const result = await resolveAfter1Seconds();
  console.log(result);
}

asyncCall();
*/

document.getElementById("totalQuantity").innerHTML = getNumberProduit();
document.getElementById("totalPrice").innerHTML = getTotalPrice();

//Fonction qui attend 1 seconde pour laissé la page chargé les informations
function resolveAfter1Seconds2() {
  return new Promise(() => {
      let x = document.querySelectorAll("article");
      x.forEach((x) => x.addEventListener("change", updateValue));
      let y = document.querySelectorAll(".deleteItem");
      y.forEach((y) => y.addEventListener("click", supprProduit));
  });
}

async function asyncCall2() {
  const result = await fetch("http://localhost:3000/api/products");
  resolveAfter1Seconds2();
  console.log(result);
}

asyncCall2();