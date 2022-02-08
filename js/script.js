"use strict";

const DB_NAME = "saved_data";
let countTasks;

let hi,delAll,didIt,chengMind,taskSave,noAdd;
(function (){
  hi = new Audio();
  hi.src = "sounds/Hi.mp3";
  hi.load();

  delAll = new Audio();
  delAll.src = "sounds/Delete all.mp3";
  delAll.load();

  didIt = new Audio();
  didIt.src = "sounds/Did it.mp3";
  didIt.load();        

  chengMind = new Audio();
  chengMind.src = "sounds/Сhanged mind.mp3";
  chengMind.load();

  taskSave = new Audio();
  taskSave.src = "sounds/Task save.mp3";
  taskSave.load();

  noAdd = new Audio();
  noAdd.src = "sounds/No add.mp3";
  noAdd.load();

})();
document.querySelector("#todoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input, textarea");

  const obj = {
    completed: false,
  };

  for (const input of inputs) {
    if (!input.value.length) {
        return setTimeout(()=>{
        noAdd.play();
        alert("No way you can add this shit !")
    },500);
    }
    obj[input.name] = input.value;
  }

  saveData(obj);
    renderItem(obj);
      taskSaved();
  countTasks = document.querySelectorAll(".taskWrapper");

  e.target.reset();
});

function taskSaved(){
      taskSave.play();
};

document.body.addEventListener("click", (e) => {
  if (
    (e.target.type === "checkbox" && e.target.closest(".taskWrapper")) ||
    e.target.name === "delTask"
  ) {
    const data = JSON.parse(localStorage[DB_NAME]);

    for (let i = 0; i < countTasks.length; i++) {
      if (countTasks[i] === e.target.closest(".taskWrapper")) {
        if (e.target.name === "delTask") {
          data.splice(data.length - 1 - i, 1);
              chengMind.play();
          localStorage.setItem(DB_NAME, JSON.stringify(data));

          document.querySelector("#todoItems").innerHTML = "";
          data.forEach((item) => renderItem(item));

          countTasks = document.querySelectorAll(".taskWrapper");
        } else {
            data[data.length - 1 - i].completed = data[data.length - 1 - i]
            .completed
            ? false
            : true;
            if (data[data.length - 1 - i].completed){
                   didIt.play();
            }
        }
      }
    }
    localStorage.setItem(DB_NAME, JSON.stringify(data));
  }
});

function saveData(todoItem) {
  if (localStorage[DB_NAME]) {
    const data = JSON.parse(localStorage[DB_NAME]);
    data.push(todoItem);
    localStorage.setItem(DB_NAME, JSON.stringify(data));
    return data;
  }

  const data = [todoItem];
  localStorage.setItem(DB_NAME, JSON.stringify(data));
  return data;
}

function deleteAll() {
    setTimeout(()=>{ delAll.play(); let question=confirm("Do you want to delete ALL this shit ?"); 
      if (question) {
        document.querySelector("#todoItems").innerHTML = "";
        localStorage.setItem(DB_NAME, JSON.stringify([]));
      }
}
  ,500);   
 
}

window.addEventListener("load", () => {
  if (!localStorage[DB_NAME]) return;
  const data = JSON.parse(localStorage[DB_NAME]);
  data.forEach((item) => renderItem(item));
  countTasks = document.querySelectorAll(".taskWrapper");
});

function renderItem(todoItem) {
  const template = createTemplate(
    todoItem.title,
    todoItem.description,
    todoItem.completed
  );
  document.querySelector("#todoItems").prepend(template);
}

function createTemplate(
  titleText = "",
  descriptionText = "",
  completedFlag = false
) {
  const mainWrp = document.createElement("div");
  mainWrp.className = "col-4";

  const wrp = document.createElement("div");
  wrp.className = "taskWrapper";
  mainWrp.append(wrp);

  wrp.innerHTML += ` <div class="col-sm-2 offset-md-10">
            <a href="#" class="btn btn-sm btn-danger ml-5" name = "delTask">X</a>
        </div>
        `;

  const title = document.createElement("div");
  title.innerHTML = titleText;
  title.className = "taskHeading text-break";
  wrp.append(title);

  const description = document.createElement("div");
  description.innerHTML = descriptionText;
  description.className = "taskDescription text-break";
  wrp.append(description);

  const label = document.createElement("label");
  const input = document.createElement("input");

  input.setAttribute("type", "checkbox");
  if (completedFlag) {
    input.setAttribute("checked", "checked");
  }

  label.append(input);
  label.innerHTML += " Выполнено";

  wrp.append(label);

  return mainWrp;
}

function clickPic(img){
    hi.play();
    img.src ="./img/baby2.png"
    setTimeout(()=>img.src='./img/baby1.png',1500)
}
