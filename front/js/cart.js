//let panierGlobal = Object.values(localStorage);

console.log(Object.values(localStorage));
console.log(localStorage);

function getPanier() {
  let panier = localStorage.getItem("panier");
  if (panier == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("panier"));
  }
}

let panier = Object.values(localStorage);
console.log(panier.length);

for (let i = 0; i < panier.length; i++) {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      for (const j in value) {
        if (value[j]._id == idDuPanier) {
          const lienImage = value[j].imageUrl;
          const nom = value[j].name;
          const prix = value[j].price;

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

          console.log(document.getElementsByClassName("cart__item__content__settings__quantity"));
        }
      }
    });
}
