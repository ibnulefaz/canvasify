let total = 0;
let cart = [];

// Smooth scroll
function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Toggle gallery (safer version)
function toggleGallery(id) {
    let g = document.getElementById("gallery-" + id);

    if (!g.style.display || g.style.display === "none") {
        g.style.display = "grid";
    } else {
        g.style.display = "none";
    }
}

// Change main image
function swapImg(id, src) {
    document.getElementById("main-" + id).src = src;
}

// Quantity control
function changeQty(id, val) {
    let el = document.getElementById("qty-" + id);
    let q = parseInt(el.innerText);

    q = Math.max(1, q + val);
    el.innerText = q;
}

// Add to cart (FIXED LOGIC)
function addToCart(name, id) {
    let qtyEl = document.getElementById("qty-" + id);
    let qty = parseInt(qtyEl.innerText);
    let price = 69;

    let itemTotal = qty * price;

    // check if already exists
    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += qty;
        existing.total += itemTotal;
    } else {
        cart.push({
            id: id,
            name: name,
            qty: qty,
            price: price,
            total: itemTotal
        });
    }

    total += itemTotal;

    document.getElementById("total").innerText = total;

    // reset quantity after adding
    qtyEl.innerText = 1;

    alert(name + " added to cart ✅");
}

// Send WhatsApp Order (SAFE ENCODING FIX)
function sendWhatsApp() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    if (cart.length === 0) {
        alert("Please add at least one product ❗");
        return;
    }

    if (!name || !phone || !address) {
        alert("Please fill all details ❗");
        return;
    }

    let productDetails = "";

    cart.forEach((item, index) => {
        productDetails += `${index + 1}. ${item.name} x${item.qty} = ৳${item.total}\n`;
    });

    let msg =
        `🛒 New Order\n\n` +
        `${productDetails}\n` +
        `Total: ৳${total}\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Address: ${address}`;

    let url = "https://wa.me/8801312866114?text=" + encodeURIComponent(msg);

    window.open(url, "_blank");
}