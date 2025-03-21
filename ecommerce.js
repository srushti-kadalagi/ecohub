let cart = [];

function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    updateCart();
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    document.getElementById('cart-count').innerText = cart.length;
    updateCart();
    alert(`${productName} has been added to your cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById('cart-count').innerText = cart.length;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    cartTotal.innerText = `Total: ₹${total.toFixed(2)}`;
}

function buyNow(productName, productPrice) {
    if (confirm(`Are you sure you want to buy a ${productName} for ₹${productPrice.toFixed(2)}?`)) {
        alert(`You bought a ${productName} for ₹${productPrice.toFixed(2)}`);
    }
}

function buyNowFromCart() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding.');
        return;
    }

    if (confirm('Are you sure you want to finalize the purchase?')) {
        alert('Thank you for your purchase!');
        cart = [];
        document.getElementById('cart-count').innerText = cart.length;
        updateCart();
    }
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');
    const cartModal = document.getElementById('cart-modal');
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    if (!cartModal.contains(event.target) && !document.querySelector('.cart-icon').contains(event.target)) {
        cartModal.style.display = 'none';
    }
});
