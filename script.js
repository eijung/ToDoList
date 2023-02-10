//getting all required Elements

const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0) { //if user values aren't only spaces
        addBtn.classList.add('active'); //active the add button
    } else {
        addBtn.classList.remove('active'); //unactive the add button
    }
}

showTasks();

//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem('New Todo'); // getting localstorage
    if(getLocalStorage == null){//if localStorage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();
    addBtn.classList.remove('active'); //unactive the add button
}

//function to add task list inside ul

function showTasks(){
    let getLocalStorage = localStorage.getItem('New Todo'); // getting localstorage
    if(getLocalStorage == null){//if localStorage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }

    const pendingNumb = document.querySelector('.pendingNumb')
    pendingNumb.textContent = listArr.length;
    if(listArr.length > 0) {//if array length is greater than 0
        deleteAllBtn.classList.add('active'); //active the clearall button
    } else {
        deleteAllBtn.classList.remove('active'); //unactive the clearall button
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`; 
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

//delete task function 
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('New Todo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
     //after remove the li again update the local strorage
    localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforming js object into a json string
    showTasks()
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = []; //empty an array
     //after delete the li again update the local strorage
    localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforming js object into a json string
    showTasks()
}

var listCheck = false
$('.todoList > li').click(function(){
    if(listCheck == false) {
        $(this).css({'text-decoration' : 'red line-through'}) 
        listCheck = true
    } else {
        $(this).css({'text-decoration' : 'none'})
        listCheck = false
    }
});