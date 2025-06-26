let products = [];

async function loadProducts() {
  const res = await fetch("data/products.json");
  products = await res.json();
  displayProducts(products);
}

function displayProducts(items) {
  const container = document.getElementById("product-grid");
  container.innerHTML = "";
  items.forEach(p => {
    container.innerHTML += `
      <div class="product-card" id="product-${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs. ${p.price}</p>
        <p>Status: <strong id="status-${p.id}">${p.status}</strong></p>
        <button onclick="updateStatus(${p.id}, 'Cancelled')">❌ Cancel</button>
        <button onclick="updateStatus(${p.id}, 'Delivered')">✅ Delivered</button>
      </div>
    `;
  });
}

function updateStatus(id, newStatus) {
  const product = products.find(p => p.id === id);
  if (product) {
    product.status = newStatus;
    document.getElementById(`status-${id}`).textContent = newStatus;
  }
}


function filterProducts(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
}

window.onload = loadProducts;

function searchProducts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  displayProducts(filtered);
}

