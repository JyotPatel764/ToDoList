//We need to render the items dynamically when we click on "add task" button.
//we also need to load the added tasks when wew refresh.
//this can be done when we save the added items.
//and most importantly adding and deletion of those tasks.

const items = [];
const inputValue = document.getElementById("input-box");
const storageKey = "items";
const itemsDiv = document.getElementById("biggest-container");
function renderTasks() {
    itemsDiv.innerHTML = null;
  for (const [index , item] of Object.entries(items)) {
      const insideContainer = document.createElement("div");
      insideContainer.style.marginBottom = "10px";
      
      const text = document.createElement("p");
      text.innerHTML = item;
      text.style.display = "inline";
      text.style.marginRight = "5px";

      const button = document.createElement("button");
      button.innerHTML = "Delete";
      button.onclick = () => removeItem(index);

      insideContainer.appendChild(text);
      insideContainer.appendChild(button);

      itemsDiv.appendChild(insideContainer);
      

  }
}


function loadTasks() {
 const backToString = localStorage.getItem(storageKey);
 if (backToString)  items.push(...JSON.parse(backToString));
 renderTasks();
}

function saveTasks() {
 const storageItem = JSON.stringify(items);
 localStorage.setItem(storageKey , storageItem);
 
}

function addItem() { 
    let value = inputValue.value;
    if (!value) {
        alert("no empty values are accepted");
        return;
    }
 
  items.push(value);
  renderTasks();
  inputValue.value = "";
  saveTasks();
  
}

function removeItem(index) {
   items.splice(index , 1);
   renderTasks();
   saveTasks();
}

document.addEventListener("DOMContentLoaded" , loadTasks);