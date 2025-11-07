const taskInput = document.querySelector(".task-input");
const tasksList = document.querySelector(".tasks-list");
const totalTasksSpan = document.querySelector(".total-tasks");
const completedTasksSpan = document.querySelector(".completed-tasks");

if (localStorage.getItem("tasks")) {
  tasksList.innerHTML = localStorage.getItem("tasks");
}
updateStats();

document.querySelector(".add-btn").onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Введите задачу");

  const li = document.createElement("li");
  li.className = "task-item";
  li.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="remove-btn">×</button>
      `;

  tasksList.appendChild(li);
  taskInput.value = "";

  saveTasks();
  updateStats();
};

document.querySelector(".clear-btn").onclick = () => {
  if (tasksList.children.length && confirm("Очистить список?")) {
    tasksList.innerHTML = "";
    localStorage.removeItem("tasks");
    updateStats();
  }
};

tasksList.onclick = (e) => {
  const item = e.target.closest(".task-item");
  if (!item) return;

  if (e.target.classList.contains("remove-btn")) {
    item.remove();
  } else {
    item.querySelector(".task-text").classList.toggle("task-done");
  }

  saveTasks();
  updateStats();
};

taskInput.onkeypress = (e) => {
  if (e.key === "Enter") document.querySelector(".add-btn").click();
};

function saveTasks() {
  localStorage.setItem("tasks", tasksList.innerHTML);
}

function updateStats() {
  const total = tasksList.children.length;
  const completed = document.querySelectorAll(".task-done").length;

  totalTasksSpan.textContent = `Всего: ${total}`;
  completedTasksSpan.textContent = `Выполнено: ${completed}`;

  document.querySelector(".empty-message")?.remove();
  if (total === 0) {
    const msg = document.createElement("div");
    msg.className = "empty-message";
    msg.innerHTML = "<p>Список задач пуст</p><p>Добавьте первую задачу</p>";
    tasksList.appendChild(msg);
  }
}
