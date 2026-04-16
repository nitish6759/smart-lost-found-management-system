const API = "https://YOUR-BACKEND-URL.onrender.com/api/items";

async function addItem() {
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const location = document.getElementById("location").value;

  const item = { itemName: name, type, location };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });

  loadItems();
}

async function loadItems() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("items");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h3>${item.itemName}</h3>
        <p>Type: ${item.type}</p>
        <p>Location: ${item.location}</p>
      </div>
    `;
  });
}

async function searchItem() {
  const query = document.getElementById("search").value;

  const res = await fetch(API + "/search?query=" + query);
  const data = await res.json();

  const container = document.getElementById("items");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h3>${item.itemName}</h3>
        <p>Type: ${item.type}</p>
        <p>Location: ${item.location}</p>
      </div>
    `;
  });
}

loadItems();
