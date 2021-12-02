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
      document.getElementsByClassName("item__img")[0].innerHTML += i; 
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
