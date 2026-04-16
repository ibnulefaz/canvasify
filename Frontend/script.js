let grandTotal = 0;
let itemsInCart = [];

// Toggles the visibility of the extra designs gallery
function toggleGallery(id) {
    const gallery = document.getElementById('gallery-' + id);
    if (gallery) {
        // Switch between grid and none
        gallery.style.display = (gallery.style.display === "grid") ? "none" : "grid";
    }
}

// Swaps the main product image when a thumbnail is clicked
function swapImg(id, src) {
    const mainImg = document.getElementById('main-' + id);
    if (mainImg) {
        mainImg.src = src;
    }
}

// Changes the quantity on the product card
function changeQty(id, change) {
    const el = document.getElementById('qty-' + id);
    if (el) {
        let val = parseInt(el.innerText);
        if (val + change >= 1) {
            el.innerText = val + change;
        }
    }
}

// Adds items to the logic and updates the checkout total
function addToCart(name, id) {
    const qtyElement = document.getElementById('qty-' + id);
    if (!qtyElement) return;

    const qty = parseInt(qtyElement.innerText);
    // Applying your bulk discount logic: ৳59 for 5+ items, otherwise ৳69
    const price = (qty >= 5) ? 59 : 69;
    const total = qty * price;

    grandTotal += total;
    itemsInCart.push(`${qty}x ${name} (৳${price} each)`);

    // Update the UI total
    const displayTotal = document.getElementById('total-val');
    if (displayTotal) {
        displayTotal.innerText = grandTotal;
    }

    alert(`${qty} ${name} added to cart!\nTotal: ৳${grandTotal}`);
}

// Formats the data and opens WhatsApp
function sendWhatsApp() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const addr = document.getElementById('address').value.trim();

    // Validation
    if (!name || !phone || !addr) {
        alert("Please provide your Name, Phone, and Address.");
        return;
    }

    if (grandTotal === 0) {
        alert("Your cart is empty! Please add some canvases first.");
        return;
    }

    // Creating the WhatsApp message format
    const orderList = itemsInCart.join('%0A- '); // New line for each item
    const text = `*New Order: Canvasify*%0A%0A` +
        `*Customer Details:*%0A` +
        `• Name: ${name}%0A` +
        `• Phone: ${phone}%0A` +
        `• Address: ${addr}%0A%0A` +
        `*Order Summary:*%0A- ${orderList}%0A%0A` +
        `*Grand Total: ৳${grandTotal}*%0A%0A` +
        `Please confirm my order!`;

    // Opens WhatsApp with your specific number
    const whatsappUrl = `https://wa.me/8801312866114?text=${text}`;
    window.open(whatsappUrl, '_blank');
}