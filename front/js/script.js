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
         "./product.html?id=" + i.id +
         ">" +
         "<article>" +
         "<img src=" +
         i.imageUrl +
         " alt=" +
         "Lorem ipsum dolor sit amet," + i.name +
         ">" +
         "<h3 class=" +
         "productName" +
         ">" +
         i.name +
         "</h3>" +
         "<p class=" +
         "productDescription" +
         ">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>" +
         "</article>" +
         "</a>";
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });


  

