const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const todoCanvas = document.querySelector('.todo-canvas');

menuButton.addEventListener('click', () => {
  if (menu.style.left === '-220px') {
      menu.style.left = '0';
      todoCanvas.style.margin = '100px 0 0 320px';
  } else {
      menu.style.left = '-220px';
      todoCanvas.style.margin = '100px 0 0 100px';
  }
});

// const createTodoParts = (title, description, dueDate, priority) => {
//     const todo = [];
 
//     (function createTitle() {
//         let title = prompt('title', '');
//         todo.push(title)
//     })();

//     (function createDescription() {
//         let description = prompt('description', '');
//         todo.push(description)
//     })();

//         (function createDueDate() {
//         let dueDate = prompt('dueDate', '');
//         todo.push(dueDate)
//     })();

//     (function createTitle() {
//         let priority = prompt('priority', '');
//         todo.push(priority)
//     })();
    
//     return todo
// };

// const project1 = createTodoList("Project 1");

// function createTodoList(name) {
//     let nameOfProject = name;

//     defaultTodo = createTodoParts("description", "dueDate", "priority", "notes", "checklist");

//     const todos = [defaultTodo, ];    
    
//     return {
//       addTodo: function () {
//         todos.push(todo);
//       },
//       removeTodo: function (index) {
//         if (index >= 0 && index < todos.length) {
//           todos.splice(index, 1);
//         }
//       },
//       getTodos: function () {
//         return todos;
//       },
//       clearTodos: function () {
//         todos.length = 0;
//       },
//       nameOfProject,
//     };
// };

// // project1.addTodo("new project")
// console.log(project1.getTodos());
// console.log(project1.nameOfProject)
  
  
// // , dueDate, priority, notes, checklist

// Step 1: Individual Todo Part Creation
const createTodoPart = (title, description, dueDate, priority) => {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
  };
};

const createTodoList = (title, todoParts) => {
    return {
      title: title,
      todos: todoParts || [],
      addTodo: function (todoPart) {
        this.todos.push(todoPart);
      },
      removeTodo: function (index) {
        if (index >= 0 && index < this.todos.length) {
          this.todos.splice(index, 1);
        }
      },
      getTodos: function () {
        return this.todos;
      },
      clearTodos: function () {
        this.todos.length = 0;
      },
    };
  };
  

// Step 3: Project Folder or Module
// Create an array of todo lists
const projectFolder = {
  todoLists: [],
  addTodoList: function (todoList) {
    this.todoLists.push(todoList);
  },
  removeTodoList: function (index) {
    if (index >= 0 && index < this.todoLists.length) {
      this.todoLists.splice(index, 1);
    }
  },
  getTodoLists: function () {
    return this.todoLists;
  },
  getProjectTitles: function () {
    const titles = this.todoLists;
    return titles
  },
};



// Create and add todo lists to the project folder
const todoPart1 = createTodoPart("Buy groceries", "Milk, eggs, and bread", "2023-11-01", "High");
const todoPart2 = createTodoPart("Finish homework", "Math assignment", "2023-10-30", "Medium");
const project = createTodoList("Project 1");
project.addTodo(todoPart1);
projectFolder.addTodoList(project);

const todoPart3 = createTodoPart("Go for a run", "5 miles at the park", "2023-10-27", "Low");
const todoList2 = createTodoList("Fitness Goals");
todoList2.addTodo(todoPart3);
projectFolder.addTodoList(todoList2);

(function appendProject() {
  const titles = projectFolder.getProjectTitles();
  const middleMenu = document.querySelector('.menu-middle');
  const todoHeader = document.querySelector('.todo-header');
  const svg = '<svg class="menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>briefcase</title><path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" /></svg>'

  todoHeader.innerHTML = `${svg} Todo list for Project 1`;


  titles.forEach(t => {
    const p = document.createElement('p');
    p.innerHTML = svg + t.title;
    middleMenu.appendChild(p);
    p.addEventListener('click', () => {
      todoHeader.innerHTML = `${svg} Todo list for ${t.title}`;
    })
  })
})();

(function appendTodolist() {
  const projects = projectFolder.getTodoLists();
  const canvas = document.querySelector('.todo-canvas');

  console.log(projects);
  

  projects.forEach(project => {
    console.log(project);

    const todoLists = document.createElement('div');
    todoLists.classList.add('todo-lists');
    canvas.appendChild(todoLists);

    project.todos.forEach(p => {

      console.log(p);

      const todoList = document.createElement('div');
      todoList.classList.add('todo-list');
      todoLists.appendChild(todoList);

      const label = document.createElement('label');
      label.setAttribute('for', 'checkbox');
      todoList.appendChild(label);

      const checkbox = document.createElement('input');
      const customCheckbox = document.createElement('span');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', 'checkbox');
      customCheckbox.classList.add('custom-checkbox');
      label.appendChild(checkbox);
      label.appendChild(customCheckbox);

      const todoContent = document.createElement('div');
      todoContent.classList.add('todo-content');
      todoList.appendChild(todoContent);

      const todoTitle = document.createElement('p');
      todoTitle.classList.add('todo-title');
      todoTitle.textContent = p.title;
      todoContent.appendChild(todoTitle);

      const div = document.createElement('div');
      todoContent.appendChild(div);

      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      const p3 = document.createElement('p');
      p1.classList.add('todo-description');
      p2.classList.add('todo-date');
      p3.classList.add('todo-priority');
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);

      p1.textContent = p.description;
      p2.textContent = p.dueDate;
      p3.textContent = p.priority;




    })

    // todoLists.forEach(todolist => {
    //   // const todolist
    // })
  })
})();








const addProjectButton = document.getElementById('addProject');

addProjectButton.addEventListener('click', () => {
  activatePopup.showPopup();
  
  activatePopup.activateCloseButton();
});





var activatePopup = (function() {
  const form = document.querySelector('.form');

  return {
    activateCloseButton:function (){
      document.querySelector('.close').onclick = () => {
        if (form.style.right === '-350px') {
          form.style.right = '0';
        } else {
          form.style.right = '-350px';
        }  
    
        setTimeout(() => {
          document.querySelector('.close').classList.add('form-hide');
          document.getElementById('addBookModal').classList.remove('overlay');
          document.getElementById('addBookModal').classList.add('form-hide');
    
        }, 1000);
      };
    },
    showPopup: function () {
      document.getElementById('addBookModal').classList.add('overlay');
      document.getElementById('addBookModal').classList.remove('form-hide');
  

      if (form.style.right === '0') {
        form.style.right = '-350px';
      } else {
        form.style.right = '0';
      }
      
      setTimeout(() => {
        document.querySelector('.close').classList.remove('form-hide');
      }, 1500);    
    }
  }
})();