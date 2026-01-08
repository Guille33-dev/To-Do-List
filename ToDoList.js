const KEY = "space_todos";

const form = document.getElementById("form");
const input = document.getElementById("taskInput");
const list = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem(KEY) || "[]");

const save = () => localStorage.setItem(KEY, JSON.stringify(tasks));

const render = () => {
  list.innerHTML = tasks.length ? "" : `<li><div class="task"> <span>Sin misiones. Añade una arriba </span></div></li>`;

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = t.done ? "done" : "";
    li.innerHTML = `
      <div class="task"> ${t.done ? "✅" : ""} <span>${t.text}</span></div>
      <div class="actions">
        <button data-id="${t.id}" data-a="toggle">${t.done ? "Deshacer" : "Completar"}</button>
        <button class="del" data-id="${t.id}" data-a="del">Eliminar</button>
      </div>
    `;
    list.appendChild(li);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({ id: Date.now(), text, done: false });
  save();
  render();

  input.value = "";
  input.focus();
});

list.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const action = btn.dataset.a;

  if (action === "toggle") tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  if (action === "del") tasks = tasks.filter(t => t.id !== id);

  save();
  render();
});

render();
