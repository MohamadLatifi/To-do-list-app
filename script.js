
const taskLists = document.getElementById("task_lists");
const addBtn = document.getElementById("add_btn");
const taskInput = document.getElementById("taskInput");

function loadTask() {
    const lodingTask = JSON.parse(localStorage.getItem("tasks")) || [];
    lodingTask.forEach(task => {
        createElement(task.text, task.complition)
    });
    checkEmptylist()
}



function createElement(taskText, complition = false) {
    const li = document.createElement("li");


    li.className = 'list ';

    if (complition) { li.classList.add("checked_list") }

    li.innerHTML = ` <span class="task-text light_text">${taskText}</span>
                <button class="All_btn" id="remove_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            `;

    taskLists.appendChild(li);
    li.style.transform = 'translateY(200px)';
    // taskLists.appendChild(li);

    setTimeout(() => {
        li.style.transform = 'translateY(0)';
        li.style.transition = ' 0.3s, transform 0.3s';
    }, 10);

    checkEmptylist()
    saveTask()
    // return li
}


addBtn.addEventListener("click", () => {
    createElement(taskInput.value.trim())
    taskInput.value = ''

})

taskInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        createElement(taskInput.value.trim())
        taskInput.value = ''
    }
})
taskLists.addEventListener("click", (e) => {
    if (e.target.closest("#remove_btn")) {
        const listItem = e.target.closest(".list");
        listItem.style.transform = "translateX(100px)";
        setTimeout(() => {
            listItem.remove();
            saveTask()
            checkEmptylist();
        }, 300)

    }

    else if (e.target === e.target.closest(".list") || e.target.closest(".task-text")) {
        // (e.target.closest(".list") && !e.target.closest(".remove-btn")) این روش هم هست

        const listItem = e.target.closest(".list")
        listItem.classList.toggle("checked_list")
        saveTask()
    }

});

function saveTask() {
    const tasks = [];
    taskElemnt = document.querySelectorAll(".list");

    taskElemnt.forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            complition: li.classList.contains("checked_list")
        })
        // localStorage.setItem("tasks" , JSON.stringify(tasks))
    });
    // Fix: Remove 'tasks' key when array is empty
    if (tasks.length === 0) {
        localStorage.removeItem('tasks'); // Clear key entirely
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


function checkEmptylist() {
    if (taskLists.children.length === 0) {
        const emptyText = document.createElement("div")
        emptyText.className = "light_text empty_state"
        emptyText.textContent = "لیست خالی است"
        taskLists.appendChild(emptyText)
    }
    else {
        const emptyText = document.querySelector(".empty_state")
        if (emptyText) {
            emptyText.remove()
        }
    }
}

loadTask()

