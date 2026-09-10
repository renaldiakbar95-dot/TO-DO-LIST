const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

let tasks = [];

// 3. Fungsi untuk menampilkan ulang semua task ke layar
function renderTasks() {
  list.innerHTML = ''; // kosongkan dulu list yang lama

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="toggle-btn">✓</button>
        <button class="delete-btn">✕</button>
      </div>
    `;

    // Event: klik ✓ untuk toggle selesai/belum
    li.querySelector('.toggle-btn').addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(); // render ulang setelah data berubah
    });

    // Event: klik ✕ untuk hapus task
    li.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1); // hapus 1 item dari array di posisi index
      renderTasks();
    });

    list.appendChild(li);
  });
}

// 4. Event: submit form untuk menambah task baru
form.addEventListener('submit', (e) => {
  e.preventDefault(); // mencegah halaman reload (default behavior form)

  const text = input.value.trim();
  if (text === '') return; // jangan tambah kalau kosong

  tasks.push({ text: text, completed: false });
  input.value = ''; // kosongkan input setelah ditambah
  renderTasks();
  });