const usersContainer = document.getElementById('users');
const todosContainer = document.getElementById('todos');
const todoList = document.getElementById('todoList');

// Завантаження списку користувачів
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    usersContainer.innerHTML = '<p>Error loading users.</p>';
  }
}

// Відображення списку користувачів
function renderUsers(users) {
  users.forEach((user) => {
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.textContent = user.name;
    userElement.onclick = () => fetchTodos(user.id, user.name);
    usersContainer.appendChild(userElement);
  });
}

// Завантаження списку справ для конкретного користувача
async function fetchTodos(userId, userName) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    const todos = await response.json();
    renderTodos(todos, userName);
  } catch (error) {
    console.error('Error fetching todos:', error);
    todoList.innerHTML = '<p>Error loading todos.</p>';
  }
}

// Відображення списку справ
function renderTodos(todos, userName) {
  todosContainer.style.display = 'block';
  todosContainer.querySelector('h2').textContent = `To-Do List for ${userName}`;
  todoList.innerHTML = ''; // Очищення попереднього списку

  todos.forEach((todo) => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.title;
    if (todo.completed) {
      todoItem.classList.add('completed');
    }
    todoList.appendChild(todoItem);
  });
}

// Виклик функції завантаження користувачів
fetchUsers();
