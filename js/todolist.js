;(function () {
    "use strict"

    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul = document.getElementById("todo-list")
    const lis = document.getElementsByTagName("li")

    let arrTasks = getSaveData ()
    
    function getSaveData () {

        let tasksData = localStorage.getItem("tasks")
        tasksData = JSON.parse(tasksData)
        
      return tasksData && tasksData.length ? tasksData : [
     {
        name : "Tarefa 1",
        createAt: Date.now(),
        completed: false,
     }]
    
    }
    function setNewData () {
        localStorage.setItem("tasks", JSON.stringify(arrTasks))
    }
    setNewData ()
   

    function createLiTasks (obj){
        const li =document.createElement("li")
        li.className = "todo-item"

        const p = document.createElement("p")
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deleteButton = document.createElement("i")

        checkButton.className= "Check-button"
        checkButton.innerHTML = `<i class='fas fa-check ${obj.completed ? " " : "displayNone"}' data-action ='checkButton'></i>`
        checkButton.setAttribute("data-action", "checkButton")
        li.appendChild(checkButton)

        
        p.className = "task-name"
        p.textContent = obj.name
        li.appendChild(p)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action", "editButton")
        li.appendChild(editButton)

        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"

        const containerInput = document.createElement("input")
        containerInput.className = "editInput"
        containerInput.setAttribute("type", "text")
        containerInput.value = obj.name
        containerEdit.appendChild(containerInput)

        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action", "contEditButton")
        containerEdit.appendChild(containerEditButton)

        const containerCancelButton = document.createElement("button")
        containerCancelButton.className = "cancelButton"
        containerCancelButton.textContent = "cancel"
        containerCancelButton.setAttribute("data-action", "contCancelButton")
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)


        deleteButton.className = "fas fa-trash-alt"
        deleteButton.setAttribute("data-action", "deleteButton")
        li.appendChild(deleteButton)
        
        return li
    }

    function renderTasks () {
        ul.innerHTML= " "
        arrTasks.forEach( objtask => {
            ul.appendChild(createLiTasks(objtask))
         });
    }

    function addTask (itemInput) {
        arrTasks.push ({
            name: itemInput,
            createAt: Date.now(),
            completed: false

        })  
        setNewData ()  
    }    

    function clickedUl (e) {
        const dataAction = e.target.getAttribute("data-action")
        
        if (!dataAction) return

        let currentLi = e.target

        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement
        }
        //console.log(currentLi)
        
        const currentLiIndex = [...lis].indexOf(currentLi)
        //console.log(currentLiIndex)

        const actions = {
            checkButton : function () {

                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed

               renderTasks()
               setNewData ()
            },
            editButton : function () {
                const editContainer = currentLi.getElementsByClassName("editContainer");

                [...ul.getElementsByClassName("editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });

                editContainer[0].style.display = "flex";
            },
            contEditButton : function () {
                const val = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = val
                renderTasks()
                setNewData ()
            },
            contCancelButton :function () {
                const editContainer = currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrTasks[currentLiIndex].name
            },
            deleteButton : function () {
                arrTasks.splice(currentLiIndex, 1)
                console.log(arrTasks)
                renderTasks ()
                setNewData ()
            }
        }
       
        if (actions[dataAction]) {
            actions[dataAction] ()
        }
    }

    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
      
        console.log(itemInput.value)
        addTask(itemInput.value)
        renderTasks()
        itemInput.value = " "
        itemInput.focus()
    });

    ul.addEventListener("click", clickedUl)
    renderTasks ()

        
})()





