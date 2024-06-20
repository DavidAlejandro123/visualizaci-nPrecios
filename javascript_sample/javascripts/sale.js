
const priceElement = document.getElementById("product");//obtiene id prod
const numberElement = document.getElementById("number");
let purchases = []; //tiene precio y cantidad de cada producto
        
/*fue agregado*/
let products = [{id: 1, nombre: "Mezcla original 200g", precio: 500},
                {id: 2, nombre: "Mezcla original 500g", precio: 900},
                {id: 3, nombre: "Mezcla especial 200g", precio: 700},
                {id: 4, nombre: "Mezcla especial 500g", precio: 1200}];

function add(){
    const id = parseInt(priceElement.value); //id de prod
    const number = parseInt(numberElement.value); //cantidad del prod
    //recorremos array product para encontrar prod de acuerdo a id
    let ban = false;
    let indice_productos = 0;
    let price = 0;
    let nombre = "";
    while(ban!=true){
        if (id == products[indice_productos].id){
            price = products[indice_productos].precio;
            nombre = products[indice_productos].nombre;
            ban = true;
        }
        else{
            indice_productos = indice_productos + 1;
        }
    }

    let purchase = {
        nombre: nombre,
        price: parseInt(price),
        number: parseInt(number),
    };
    let newPurchase = true; 

    purchases.forEach((item) => { 
        if(item.price === purchase.price) {
            newPurchase = false;
        }
    })

    if(purchases.length < 1 || newPurchase) { 
        purchases.push(purchase);
    } else {
        for(let i = 0; i < purchases.length; i++) {
            if(purchases[i].price === purchase.price) {
                purchases[i].number += purchase.number;
            }
        }
    }
    window.alert(`${display()}\nSubtotal: ${subtotal()} yenes`);
    priceElement.value = "";
    numberElement.value = "";
}

function display(){
    let string = "";
    for (let i=0;i<purchases.length;i++){
        //string = string + `El precio es ${purchases[i].price}. La cantidad es ${purchases[i].number}\n`;
        string = string + `${purchases[i].nombre}. El precio es ${purchases[i].price} yenes. La cantidad es ${purchases[i].number}\n`;
    }
    return string;
}

function subtotal(){
    let sum = 0;
    for (let i=0; i<purchases.length; i++){
        sum = sum + purchases[i].price * purchases[i].number;
    }
    return sum;
}

function calc(){
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum); //costo de envio
    window.alert(`${display()}\nSubtotal: ${sum} yenes\nCosto de Envío: ${postage} yenes\nImporte total: ${sum + postage} yenes`);
    purchases = [];
    priceElement.value="",
    numberElement.value="";
}

function calcPostageFromPurchase(sum){
    //determinamos costo de envio
    if (sum == 0 || sum >= 3000){
        return 0;
    }
    else if (sum < 2000){
        return 500;
    }
    else{
        return 250;
    }
}
