let panierGlobal = Object.values(localStorage);

console.log(Object.values(localStorage));

console.log(localStorage.length);

for (let i = 1; i < panierGlobal.length - 2; i++) {
  let idDuPanier = panierGlobal[i].split(",")[0];
  let CouleurDuPanier = panierGlobal[i].split(",")[1];
  let QuantiteDuPanier = panierGlobal[i].split(",")[2];
  console.log(idDuPanier);
  console.log(CouleurDuPanier);
  console.log(QuantiteDuPanier);

  document.getElementById("cart__items").innerHTML +=
    '<article class="cart__item" data-id="' +
    idDuPanier +
    '" data-color="{product-color}"' +
    ">" +
    '<div class="cart__item__img"' +
    ">" +
    '<img src="../images/product01.jpg" alt="Photographie ' +
    "d" +
    "'" +
    'un canapé">' +
    "</div>" +
    '<div class="cart__item__content"' +
    ">" +
    '<div class="cart__item__content__description"' +
    ">" +
    "<h2>" +
    idDuPanier +
    "</h2>";
  "<p>" +
    CouleurDuPanier +
    "</p>" +
    "<p>42,00 €</p>" +
    "</div>" +
    '<div class="cart__item__content__settings">' +
    ' <div class="cart__item__content__settings__quantity">' +
    "<p>Qté : </p>" +
    '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">' +
    "</div>" +
    '<div class="cart__item__content__settings__delete">' +
    '<p class="deleteItem">Supprimer</p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</article>;";
}
console.log(localStorage);
console.log(Object.values(localStorage)[1]);
