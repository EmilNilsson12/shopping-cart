const addToCartBtns = document.querySelectorAll('.shop-item-button');


addToCartBtns.forEach(storeItem => {
   storeItem.addEventListener('click', addToCart)
})


const cartItems = [
   {
      name: "Album 1",
      imgSrc: "Images/Album 1.png",
      price: 12.99,
      numInCart: 0
   },
   {
      name: "Album 2",
      imgSrc: "Images/Album 2.png",
      price: 14.99,
      numInCart: 0
   },
   {
      name: "Album 3",
      imgSrc: "Images/Album 3.png",
      price: 9.99,
      numInCart: 0
   },
   {
      name: "Album 4",
      imgSrc: "Images/Album 4.png",
      price: 19.99,
      numInCart: 0
   },
   {
      name: "T-Shirt",
      imgSrc: "Images/Shirt.png",
      price: 19.99,
      numInCart: 0
   },
   {
      name: "Coffee Cup",
      imgSrc: "Images/Cofee.png",
      price: 6.99,
      numInCart: 0
   }
];



function addToCart(evt) {

   // Find name of div clicked
   const shopItemClicked = evt.target.parentNode.parentNode;
   const nameOfItemClicked = shopItemClicked.querySelector('span').textContent;

   // Find corresponding object in cart array
   const clickedItem = cartItems.find(item => {
      return item.name == nameOfItemClicked;
   })

   // Increase numInCart for item clicked by 1
   clickedItem.numInCart++

   // Update cart
   updateCart();

   // Update total
   updateTotalCost();
}


function updateCart() {
   const cartDiv = document.querySelector('.cart-items');
   cartDiv.innerHTML = '';

   cartItems.forEach(cartItem => {
      if (cartItem.numInCart > 0) {
         cartDiv.insertAdjacentHTML('beforeend', `
         <div class="cart-row">
            <div class="cart-item cart-column">
               <img class="cart-item-image" src="${cartItem.imgSrc}" width="100" height="100">
               <span class="cart-item-title">${cartItem.name}</span>
            </div>
            <span class="cart-price cart-column">${cartItem.price}</span>
            <div class="cart-quantity cart-column">
               <input class="cart-quantity-input" type="number" value="${cartItem.numInCart}">
               <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
         </div>
        `)
      }
   })

   document.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', removeItemFromCart)
   });

   document.querySelectorAll('.cart-quantity-input').forEach(btn => {
      btn.addEventListener('click', quantityChanged)
   }); 
}

function removeItemFromCart(evt) {

   // Find name of div clicked
   const shopItemClicked = evt.target.parentNode.parentNode;
   const nameOfItemClicked = shopItemClicked.querySelector('span').textContent;

   // Find corresponding object in cart array
   const clickedItem = cartItems.find(item => {
      return item.name == nameOfItemClicked;
   })

   // Set numInCart to 0
   clickedItem.numInCart = 0;

   // Update cart
   updateCart();

   // Update total
   updateTotalCost();
}



function quantityChanged(evt) {

   // Find name of div clicked
   const shopItemClicked = evt.target.parentNode.parentNode;
   const input = evt.target;
   const nameOfItemClicked = shopItemClicked.querySelector('span').textContent;

   // Find corresponding object in cart array
   const clickedItem = cartItems.find(item => {
      return item.name == nameOfItemClicked;
   })

   // Set numInCart to input.value
   if (input.value <=  0) {
      clickedItem.numInCart = 1
      updateCart();
   }
   else {
      clickedItem.numInCart = parseInt(input.value)
   }

   // Update total cost
   updateTotalCost();
}

function updateTotalCost() {

   // Calculate totalcost
   const totalCost = cartItems.reduce((accumulator, currentItem) => {
      if (currentItem.numInCart > 0) {
         accumulator = accumulator + currentItem.numInCart * currentItem.price
      }
      return accumulator
   }, 0)

   // Print total cost
   const totalCostSpan = document.querySelector('.cart-total-price');
   totalCostSpan.innerText = `$${Math.round(totalCost * 100) / 100}`;
}

const purchaseBtn = document.querySelector('.btn-purchase');
purchaseBtn.addEventListener('click', purchaseClicked)


function purchaseClicked() {
   cartItems.forEach(item => {
      item.numInCart = 0;
   })

   // Update cart
   updateCart();

   // Update total cost
   updateTotalCost();
}
