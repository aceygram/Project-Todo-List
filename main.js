const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const todoCanvas = document.querySelector('.todo-canvas');

const todoTop = document.querySelector('.todo-top');
const addTodo = document.getElementById('addTodo');

// Function to check the viewport width and apply styles
function applyStylesBasedOnWidth() {
  const viewportWidth = window.innerWidth;

   if (viewportWidth > 800) {
    // Apply styles for larger screens
    menu.style.left = '0';
    todoCanvas.style.margin = '100px 0 0 320px';
  } else if (viewportWidth > 560) {
    todoTop.style.width = '100%'
    menu.style.left = '-235px';
    todoCanvas.style.margin = '90px 0 0 90px';
  } else if (viewportWidth > 0) {
    menu.style.left = '-235px';
    todoCanvas.style.margin = '70px 0 0 80px';
    addTodo.textContent = 'Add +'

    setTimeout(() => {
      todoTop.style.width = '100%'
    }, 1000);
  }
}

// Attach the function to the window resize event
window.addEventListener('resize', applyStylesBasedOnWidth);

// Call the function on page load
applyStylesBasedOnWidth();


menuButton.addEventListener('click', () => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth > 800) {
      if (menu.style.left === '-220px') {
        menu.style.left = '0';
        todoCanvas.style.margin = '100px 0 0 320px';
      } else {
        menu.style.left = '-220px';
        todoCanvas.style.margin = '100px 0 0 100px';
        
        setTimeout(() => {
          todoTop.style.width = '100%'
        }, 1000);
      }
  } else if  (viewportWidth > 560) {
    if (menu.style.left === '-235px') {
      todoTop.style.width = '695px'
      menu.style.left = '0';
      todoCanvas.style.margin = '90px 0 0 320px';
    } else {
      menu.style.left = '-235px';
      todoCanvas.style.margin = '90px 0 0 90px';
      

      setTimeout(() => {
        todoTop.style.width = '100%'
      }, 1000);
    }
  } else if (viewportWidth > 0) {
    if (menu.style.left === '-235px') {
      todoTop.style.width = '440px'
      menu.style.left = '0';
      todoCanvas.style.margin = '70px 0 0 320px';
    } else {
      menu.style.left = '-235px';
      todoCanvas.style.margin = '70px 0 0 80px';
      
  
      setTimeout(() => {
        todoTop.style.width = '100%'
      }, 1000);
    }    
  } 


});

// Step 1: Individual Todo Part Creation
const createTodoPart = (title, description, dueDate, priority) => {
  return {
    id: Date.now(),
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false, // Add a completed property with an initial value of false
  };
};


const createTodoList = (title, todoParts) => {
    return {
    id: Date.now(),
    title: title,
    todos: todoParts || [],
    addTodo: function (todoPart) {
        this.todos.push(todoPart);
    },
    removeTodo:  function (todo) {
      const todoId = todo.id;
    
      if (this.todos.includes(todo)) {
        console.log(`Removing todo with ID ${todoId}`);
        console.log("Before Deletion:", this.todos);
    
        // Remove the todo
        this.todos = this.todos.filter(t => t.id !== todoId);
    
        console.log("After Deletion:", this.todos);
    
        // Remove the corresponding DOM element from the map and the document
        const todoElement = todoIdToElementMap.get(todoId);
        if (todoElement) {
          todoElement.remove();
          todoIdToElementMap.delete(todoId);
        }
    
        // Reset the checkboxCounter only if todos are removed
        checkboxCounter = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
        console.log("Updated checkboxCounter:", checkboxCounter);
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
  removeTodoList: function (projectId) {
    const projectIndex = this.todoLists.findIndex(project => project.id === projectId);
    if (projectIndex !== -1) {
      this.todoLists.splice(projectIndex, 1);
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
// const todoPart2 = createTodoPart("Finish homework", "Math assignment", "2023-10-30", "Medium");
const project = createTodoList("Project 1");
project.addTodo(todoPart1);
// project.addTodo(todoPart2);
projectFolder.addTodoList(project);

// const todoPart3 = createTodoPart("Go for a run", "5 miles at the park", "2023-10-27", "Low");
// const todoPart4 = createTodoPart("Go for a run", "5 miles at the park", "2023-10-27", "Low");
// const todoPart5 = createTodoPart("Go for a run", "5 miles at the park", "2023-10-27", "Low");

// const todoPart6 = createTodoPart("Shoot a gun", "Use a 50 caliber gun", "2020-1-25", "High");
// const todoPart7 = createTodoPart("Make Pizza", "Make a pepperoni pizza", "2022-5-2", "medium");


// const project2 = createTodoList("Project 2");
//   project.addTodo(todoPart3);
//   project.addTodo(todoPart4);
//   project.addTodo(todoPart5);

// project2.addTodo(todoPart6);
// project2.addTodo(todoPart7);



// projectFolder.addTodoList(project2);

let checkboxCounter = 1; // Initialize a counter
let selectedProject = projectFolder.getTodoLists()[0]; // Set the initial selected project (e.g., the first project)
let todoIdToElementMap = new Map(); // Map to track todo ID to corresponding DOM elements


function renderProjectTodo(todo, i) {
  console.log(`Rendering todo at index ${i}`);
  const canvas = document.querySelector('.todo-canvas');
  const todoLists = document.querySelector('.todo-lists');

  const todoList = document.createElement('div');
  todoList.classList.add('todo-list');
  todoLists.appendChild(todoList);

  // Create and append todo items here (similar to your existing code)

  const label = document.createElement('label');
  const checkboxId = `checkbox${checkboxCounter}`; // Unique ID for each checkbox
  label.setAttribute('for', checkboxId);
  todoList.appendChild(label);

  const checkbox = document.createElement('input');
  const customCheckbox = document.createElement('span');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', checkboxId);
  customCheckbox.classList.add('custom-checkbox');
  label.appendChild(checkbox);
  label.appendChild(customCheckbox);

  // Set the checkbox state based on the todo's 'completed' property
  checkbox.checked = todo.completed;

  const todoContent = document.createElement('div');
  todoContent.classList.add('todo-content');
  todoList.appendChild(todoContent);

  const todoHeading = document.createElement('div');
  todoContent.appendChild(todoHeading);

  const todoTitle = document.createElement('p');
  todoTitle.classList.add('todo-title');
  todoTitle.textContent = capitalizeSentences(todo.title);
  todoHeading.appendChild(todoTitle);

  //creating the svg in the header
  const deleteButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  deleteButton.setAttribute("width", "24");
  deleteButton.setAttribute("height", "24");

  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z");

  deleteButton.appendChild(path);
  
  // Create a unique identifier for the todo
  todoList.dataset.todoId = i; // Use the index as the identifier

  // Add a click event listener to the delete button to remove the corresponding todo
  deleteButton.addEventListener('click', (event) => {
    const deleteModal = document.getElementById('deleteBookModal');
    deleteModal.classList.remove('form-hide');
    deleteModal.classList.add('confirm');
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
  
    yes.addEventListener('click', () => {
      // Retrieve the todo ID from the dataset
      const todoId = parseInt(todoList.dataset.todoId);
  
      // Retrieve the todo object from the project's todos using the ID
      const todo = selectedProject.getTodos().find(t => t.id === todoId);
  
      // Check if todo is defined before calling removeTodo
      if (todo) {
        // Check if selectedProject is defined before calling removeTodo
        if (selectedProject) {
          selectedProject.removeTodo(todo);
        }
  
        todoList.remove();
      }
  
      deleteModal.classList.add('form-hide');
      deleteModal.classList.remove('confirm');
    });
  
    no.addEventListener('click', () => {
      deleteModal.classList.add('form-hide');
      deleteModal.classList.remove('confirm');
    });
  });

  todoHeading.appendChild(deleteButton);

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

  p1.textContent = capitalizeFirstLetter(todo.description);
  p2.textContent = todo.dueDate;
  p3.textContent = capitalizeFirstLetter(todo.priority);

  if (p3.textContent === 'High') {
    p3.style.color = 'red';
  } else if (p3.textContent === 'Medium') {
    p3.style.color = 'gold';
  } else {
    p3.style.color = 'green';
  }

  checkboxCounter++; // Increment the counter

  // Create a unique identifier for the todo
  const todoId = todo.id;

  // Add the todoId to the dataset for identification
  todoList.dataset.todoId = todoId;

  // Add the todoId and corresponding DOM element to the map
  todoIdToElementMap.set(todoId, todoList);

  // Add a click event listener to the checkbox to update the 'completed' property
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
  });
}



addTodo.addEventListener('click', () => {
  activatePopup.showPopup();
  
  activatePopup.activateCloseButton();
});


const form = document.querySelector('form');
form.addEventListener('submit', handleSubmitButton);

function handleSubmitButton(e){

  e.preventDefault();

  const title = document.getElementById('title');
  const titleValue = title.value

  const description = document.getElementById('description');
  const descriptionValue = description.value

  const date = document.getElementById('date');
  const dateValue = date.value

  const priority = document.getElementById('priority');
  const priorityValue = priority.value

  if (titleValue === '' && descriptionValue === '' && dateValue === '' && priorityValue === ''){
    return;
  }
    const todoPart = createTodoPart(titleValue, descriptionValue, dateValue, priorityValue);
    selectedProject.addTodo(todoPart); // Add the todo to the selected project

    const todoIndex = selectedProject.getTodos().length - 1; // Get the index of the newly added todo
    renderProjectTodo(todoPart, todoIndex); // Pass both todo and index to renderProjectTodo

    activatePopup.closePopUp();
    title.value = '';
    description.value = '';
    date.value = ''; 
    priority.value = '';
}

var activatePopup = (function() {
  const form = document.querySelector('.form');

  return {
    closePopUp: function() {
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
    }
    ,
    activateCloseButton:function (){
      document.querySelector('.close').onclick = () => {
        this.closePopUp();
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

const sideMenu = document.querySelector('.side-menu');
const addProjectButton = document.getElementById('addProject');
let isInputVisible = false;
let warningDisplayed = false; // Flag to track whether the warning message has been displayed
let inputElement;

// Add a click event listener to the "Add Project" button
addProjectButton.addEventListener('click', () => {
  if (!isInputVisible) {
    // Create an input element to collect the project name
    inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = 'Enter project name';
    inputElement.classList.add('project-input');

    
    // Add an event listener to the input element for both 'focusout' and 'keydown' events
    inputElement.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });

    inputElement.addEventListener('keydown', handleKeydown);

    // Append the input element to the middle menu
    sideMenu.appendChild(inputElement);
    isInputVisible = true; // Set the flag to indicate that the input is visibley
  }
});

// Update the middle menu with existing project titles
function updateMiddleMenu() {
  const titles = projectFolder.getProjectTitles();
  const svg = '<svg class="menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>briefcase</title><path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" /></svg>';
  const svgDelete = '<svg class="svg-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';
  sideMenu.innerHTML = ' ';

  let selectedProjectIndex = 0; // Keep track of the selected project index

  titles.forEach((t, index) => {
    const p = document.createElement('p');
    const title = `<span>${t.title}</span>`;
    p.innerHTML = svg + title + svgDelete;
    p.classList.add('project-folders');
    p.dataset.projectId = t.id; // Set the project ID in the dataset
    sideMenu.appendChild(p);

    if (index === selectedProjectIndex) {
      p.classList.add('selected-folder');
    }

    p.addEventListener('click', () => {
      // Remove the 'selected-folder' class from the previously selected project folder
      const projectFolders = document.querySelectorAll('.project-folders');
      projectFolders[selectedProjectIndex].classList.remove('selected-folder');

      // Update the selected project index
      selectedProjectIndex = index;

      // Add the 'selected-folder' class to the currently selected project folder
      p.classList.add('selected-folder');

      // Clear the canvas
      const todoLists = document.querySelector('.todo-lists');
      todoLists.innerHTML = ' '; // Clear the todo list 

      const todoHeader = document.querySelector('.todo-header');
      todoHeader.innerHTML = svg + ' Todo list for ' + t.title;

      selectedProject = t;

      t.todos.forEach((todo, i) => {
        renderProjectTodo(todo, i);
      });

    });

    // Add a click event listener for deleting a project folder
    const deleteIcon = p.querySelector('.svg-delete');
    deleteIcon.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to the project folder

      const projectIndex = projectFolder.getTodoLists().findIndex(project => project.id === t.id);
      const deleteModal = document.getElementById('deleteProjectModal');

      if (projectIndex === 0) {
        // Provide a message or alert that the default project cannot be deleted
        if (!warningDisplayed) {
          console.log("Cannot delete the default project.");
          const p = document.createElement('p');
          function showError() {
            p.textContent = "You cannot delete the default project folder!";
            p.classList.add('warning');
            sideMenu.appendChild(p);
            warningDisplayed = true; // Set the flag to true
            // Remove the warning message after 5 seconds
            setTimeout(() => {
              p.remove();
              warningDisplayed = false; // Reset the flag after removal
            }, 3000);
          }
          // Show the error message
          showError();
        }
      } else if (projectIndex >= 1) {
        deleteModal.classList.remove('form-hide');
        deleteModal.classList.add('confirm');
        const yes = document.getElementById('yess');
        const no = document.getElementById('noo');
  
        yes.addEventListener('click', () => {
          // Remove the project folder from the projectFolder array
          projectFolder.removeTodoList(t.id);
  
          // Update the middle menu
          updateMiddleMenu();
  
          // Clear the canvas
          const todoLists = document.querySelector('.todo-lists');
          while (todoLists.firstChild) {
            todoLists.removeChild(todoLists.firstChild);
          }
  
          if (projectIndex === projectFolder.getTodoLists().length) {
            // If the last project is deleted, select the new last project
            selectProjectFolder();
          } else {
            // Select the project after deletion (if any)
            selectedProject = projectFolder.getTodoLists()[projectIndex];
          }
  
          deleteModal.classList.add('form-hide');
          deleteModal.classList.remove('confirm');
        });
  
        no.addEventListener('click', () => {
          deleteModal.classList.add('form-hide');
          deleteModal.classList.remove('confirm');
        });
      }
    });
  });

  // Automatically select the last project in the list
  selectProjectFolder();
}

// Initial rendering of project titles
updateMiddleMenu();







function capitalizeSentences(text) {
  // Split the text into sentences using regular expressions
  const sentences = text.split(/(?<=[.!?])\s+/);

  // Capitalize the first letter of every word in each sentence
  const capitalizedSentences = sentences.map((sentence) => {
    // Split the sentence into words
    const words = sentence.split(/\s+/);

    // Capitalize the first letter of each word (except for standalone "a")
    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        if (word.toLowerCase() === 'a') {
          return word; // Preserve standalone "a"
        } else {
          // Capitalize the first character and concatenate it with the rest of the word
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      } else {
        return word; // Preserve empty words (e.g., after punctuation)
      }
    });

    // Join the capitalized words back into a sentence
    return capitalizedWords.join(' ');
  });

  // Join the sentences back into a single string
  return capitalizedSentences.join(' ');
}

function capitalizeFirstLetter(word) {
  if (word.length === 0) {
    return word; // Return an empty string as-is
  }

  // Capitalize the first letter and concatenate it with the rest of the word
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function selectProjectFolder() {
  // Automatically select the newly created project
  const projectFolders = document.querySelectorAll('.project-folders');
  const newProjectIndex = projectFolder.getTodoLists().length - 1; // Index of the newly created project

  // Check if there is a project folder element to select
  if (newProjectIndex >= 0) {
    projectFolders[newProjectIndex].click(); // Simulate a click event on the new project folder
  }
}

// Common logic function
function handleInput() {
  // Remove the event listeners before handling the input
  inputElement.removeEventListener('keydown', handleKeydown);

  const projectName = capitalizeFirstLetter(inputElement.value.trim());

  if (projectName.length >= 11) {
    if (!warningDisplayed) {
      const p = document.createElement('p');
      p.textContent = "Your project name should not be more than 10 characters!";
      p.classList.add('warning');
      sideMenu.appendChild(p);
      warningDisplayed = true; // Set the flag to true

      // Delay the removal of the warning message after 5 seconds
      setTimeout(() => {
        if (warningDisplayed) {
          const warningMessage = sideMenu.querySelector('.warning');
          if (warningMessage) {
            warningMessage.remove();
          }
          warningDisplayed = false;
        }

        // Reattach event listeners after showing the warning
        attachEventListeners();
      }, 3000);
    }
  } else {
    // Reset the warningDisplayed flag when the input is valid
    if (warningDisplayed) {
      const warningMessage = sideMenu.querySelector('.warning');
      if (warningMessage) {
        warningMessage.remove();
      }
      warningDisplayed = false;
    }

    // Create a new project and add it to the project folder
    const newProject = createTodoList(projectName);
    projectFolder.addTodoList(newProject);

    // Clear the input element
    inputElement.value = '';

    updateMiddleMenu();

    selectProjectFolder();

    isInputVisible = false; // Reset the flag
  }
  // Reattach event listeners after removing the warning
  inputElement.addEventListener('keydown', handleKeydown);
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    handleInput();
    console.log("it's working");
  }
}

