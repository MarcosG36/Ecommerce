
const btnTheme = document.getElementById( "theme-btn" )
const body = document.body
const cartBtnOpen = document.getElementById("cart-btn")
const cartBtnClose = document.getElementById("close-cart")
const cartContainer = document.getElementById("cart-container")
const menubtn = document.getElementById("menu-btn")
const navlist = document.getElementById("nav-list")

const darkThemeChange = () => {
/*
    if( body.classList.contains( "dark" ) ){
        body.classList.remove( "dark" )
    }else{
        body.classList.add("dark")
    }
    */

    //classList.toggle("clase")
    if( btnTheme.classList.contains("bx-sun") ){
        btnTheme.classList.replace("bx-sun", "bx-moon")
    }else{
        btnTheme.classList.replace("bx-moon", "bx-sun")
    }
    
    body.classList.toggle( "dark" )
}


btnTheme.addEventListener( "click", () => darkThemeChange())

cartBtnOpen.addEventListener( "click", () => cartContainer.classList.remove("hide") )

cartBtnClose.addEventListener( "click", () => cartContainer.classList.add("hide")  )

menubtn.addEventListener( "click", () => navlist.classList.toggle("nav-list-hide"))




const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]








function showProducts (){
    const content = document.getElementById( "cart-content" )

    let fragment = ""
    cartProducts.forEach( product => {
        fragment += `
        <section>
            <h2>${product.name}</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet provident optio dolorem? Est accusantium quos consequuntur aliquam quia ad?
            </p>
        </section>
        `
    } )

    content.innerHTML = fragment
}


//document -> documento

//window -> la ventana del navegador

const nav = document.querySelector("nav")

window.addEventListener( "scroll", () =>{
    if(scrollY >= 50){
        nav.classList.add("scroll-bg")
    }else{
        nav.classList.remove("scroll-bg")
    }
} )



function productsContainet (items){
    const productContainer= document.getElementById("product-container")
    
    let fragment = "";

    items.forEach((producto)=>{
        fragment += `
        <article id="${producto.id} " class="card-´product">
          <div class="img-product">
            <img src="${producto.image}"">
          </div>

         <div class="data-product">
            <h3 class="${producto.price}"> $${producto.price} <span>| stock: ${producto.quantity}</span></h3>
            <h4 class="name-product">${producto.category} </h4>
         </div>
         <button class="btn-producto-add"  id="${producto.id}">Add</button>
      </article>
        
        `
    })

    productContainer.innerHTML = fragment
}

productsContainet(items);

const cardProducts = [];



 function addProduct(cardProducts){
    const cart= document.getElementById("cart-content")
    
    let fragment1 = "";

    cardProducts.forEach((producto)=>{
        fragment1 += `
        <article id="${producto.id} " class="card-product-select">
          <div class="img-product-select">
              <img src="${producto.image}"">
          </div>

         <div class="data-product">
            <h3 class="${producto.price}"> $${producto.price} <span>
            <h4 class="name-product-select">${producto.category} </h4>
            <h4 >Cantidad: ${producto.quantitySelected} </h4>
            <button id= "${producto.id}"class="btn-delete">Delete</button>
         </div>
         
      </article>
        
        `
    })

    cart.innerHTML = fragment1
    counterProductSelect(cardProducts);

 }

function findProduct(id, items, cardProducts ){
    const item = items.find(product => product.id == id)
    console.log(item)
    
    

    let productSelected = cardProducts.find( product => product.id === item.id)


    if( productSelected ){

        
        let index = cardProducts.indexOf( productSelected )

        cardProducts[index].quantitySelected++
        
    }else{
        
        const item1 = items.find( itemi => itemi.id === item.id )
        
        item1.quantitySelected = 1
        cardProducts.push( item1 )
    }


   console.log(cardProducts)
    addProduct(cardProducts)


}

let productContainer= document.getElementById("product-container")

function eventsListeners(items, cardProducts){
    productContainer.addEventListener('click',(e)=>{
        e.preventDefault()

        if(e.target.classList.contains("btn-producto-add")){
            console.log(e.target.id);
            findProduct(e.target.id,items, cardProducts)
        }
    })
    
}

eventsListeners(items,cardProducts);

function deleteProductSelect( itemid, cardProducts){
    let productSelectedToDelete = cardProducts.find( product => product.id == itemid)
   console.log(productSelectedToDelete)
    if(productSelectedToDelete.quantitySelected>1){
        productSelectedToDelete.quantitySelected= productSelectedToDelete.quantitySelected - 1;
    }else{
        let indice = cardProducts.indexOf(productSelectedToDelete);
        cardProducts.splice(indice,1)
    }
    addProduct(cardProducts)
}


let cart= document.getElementById("cart")

function eventsListenersDelete(cardProducts){
    cart.addEventListener('click',(e)=>{
        e.preventDefault()

        if(e.target.classList.contains("btn-delete")){
            console.log(e.target.id);
            deleteProductSelect(e.target.id, cardProducts)
        }
    })
    
}

eventsListenersDelete(cardProducts);

let cartCounter = document.getElementById("cart-btn")

function counterProductSelect(cardProducts){

    let total = 0;
    cardProducts.forEach((producto)=>{
        total = producto.quantitySelected + total
    })

    cartCounter.innerHTML = `
    <i class='bx bx-shopping-bag bx-sm' ></i>
    <span class="cart-counter" id="cart-counter">${total} </span> `

}

