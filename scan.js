const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback =   (decodedText, decodedResult) => {
  
  console.log(`Code matched = ${decodedText}`, decodedResult);
  let url = `https://it.openfoodfacts.org/api/v0/product/${decodedText}.json`;
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then((data) => {
    
    //* NameSet
    document.getElementById("nome-prodotto").innerHTML = `${data.product.product_name}`;

    //* Valori
    document.getElementById("energia").innerHTML = `Energia: ${data.product.nutriments.energy_100g} kj`;
    document.getElementById("grassi").innerHTML = `Grassi: ${data.product.nutriments.fat_100g} g`;
    document.getElementById("zuccheri").innerHTML = `Zuccheri: ${data.product.nutriments.sugars_100g} g`;
    document.getElementById("proteine").innerHTML = `Proteine: ${data.product.nutriments.proteins_100g} g`;
    document.getElementById("sale").innerHTML = `Sale: ${data.product.nutriments.salt_100g} g`;

    //* Foto
    document.getElementById("fotoprodotto").src = data.product.image_url;
    setTimeout(Scroll(), 2);
    
  })
  .catch(err => { throw err });
  ;

};

//*ScrollPagina
function Scroll(){
  window.scrollTo(0, 400);
  
}

//!Config
const config = { fps: 10, qrbox: { width: 250, height: 250 } };
html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback); 











