fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    for (let i of value) {
      console.log(i);
      document.getElementById("items").innerHTML +=
        "<a href=" +
        "./product.html?id=" +
        i._id +
        ">" +
        "<article>" +
        "<img src=" +
        i.imageUrl +
        " alt=" +
        '"' +
        i.altTxt +
        '"' +
        ">" +
        "<h3 class=" +
        "productName" +
        ">" +
        i.name +
        "</h3>" +
        "<p class=" +
        "productDescription" +
        ">" +
        i.description +
        "</p>" +
        "</article>" +
        "</a>";
    }
    document.getElementsByClassName("item__img").innerHTML = "test";
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
