let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById("total").innerText = total;
}

async function placeOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const order = {
        name,
        phone,
        address,
        items: cart,
        total
    };

    const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    const data = await res.json();
    alert("✅ Order placed!");

    // Reset cart
    cart = [];
    total = 0;
    document.getElementById("total").innerText = total;
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}
