let usersContainer = document.getElementById("user");
const API = "https://6940ed93993d68afba6dd445.mockapi.io/api/v1/users";

fetch(API)
  .then(res => res.json())
  .then(data => renderData(data));

function renderData(data) {
  usersContainer.innerHTML = "";
  data.forEach(user => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${user.avatar}" alt="${user.name}">
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>

      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

    // DELETE
    div.querySelector(".delete").addEventListener("click", () => {
      fetch(`${API}/${user.id}`, {
        method: "DELETE"
      }).then(() => {
        div.remove();
      });
    });

    // EDIT
    div.querySelector(".edit").addEventListener("click", () => {
      let newName = prompt("New name:", user.name);
      let newEmail = prompt("New email:", user.email);
      let newPhone = prompt("New phone:", user.phone);

      if (!newName || !newEmail || !newPhone) return;

      fetch(`${API}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          phone: newPhone,
        }),
      })
      .then(res => res.json())
      .then(() => {
        fetch(API)
          .then(res => res.json())
          .then(data => renderData(data));
      });
    });

    usersContainer.appendChild(div);
  });
}
