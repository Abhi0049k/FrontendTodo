// const baseUrl = 'http://localhost:8998/todo/'
const baseUrl = 'https://successful-pocket-hare.cyclic.app/todo/'
const containerEl = document.querySelector('#todoContainer')
const taskEl = document.querySelector('#createTask');
const descEl = document.querySelector('#createDesc');
const stateEl = document.querySelector('#createState');
const updateId = document.querySelector('#updateId');
const updateTask = document.querySelector('#updateTask');
const updateDesc = document.querySelector('#updateDesc');
const updateState = document.querySelector('#updateState');
const updationFormEl = document.querySelector('#updationForm')
const token = localStorage.getItem('token') || '';

const fetchingTodo = async ()=>{
    let res = await fetch(baseUrl,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    res = await res.json();
    display(res);
}

const display = (data)=>{
    let arr = data.map(IndividualCard);
    containerEl.innerHTML = arr.join('\n');
    const editbuttons = document.querySelectorAll('#todoContainer div> button.edit');
    editbuttons.forEach((el)=>{
        el.addEventListener('click', ()=>{
            let id = el.dataset.id;
            editingTask(id);
        })
    })
    const deletebtns = document.querySelectorAll('#todoContainer div> button.delete');
    deletebtns.forEach((el)=>{
        el.addEventListener('click', ()=>{
            let id = el.dataset.id;
            deletingTask(id);
        })
    })
}

const deletingTask = async (id)=>{
    let res = await fetch(`${baseUrl}delete/${id}`,{
        headers: {
            'Content-type': 'application/json',
            Authorization: `${token}`
        },
        method: 'DELETE'
    })
    if(res.ok){
        alert('Task Deleted');
        fetchingTodo();
    }else{
        alert('Please Try Again');
    }
}


async function editingTask(id){
    let data = await fetch(`${baseUrl}${id}`, {
        headers:{
            Authorization: `${token}`
        }
    })
    data = await data.json();
    updateId.value = data._id;
    updateTask.value = data.task;
    updateDesc.value = data.desc;
    updateState.value = data.pending;
}

updationFormEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    let obj = {};
    obj.id= updateId.value;
    obj.task = updateTask.value;
    obj.desc = updateDesc.value;
    obj.pending = updateState.value;
    makingChanges(obj);
})

const makingChanges = async (obj)=>{
    let res = await fetch(`${baseUrl}update/${obj.id}`,{
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(obj)
    })
    if(res.ok){
        alert('Task updated');
        fetchingTodo();
        emptyFieldUpdate();
    }else{
        alert('Please Try Again');
    }
}

const emptyFieldUpdate = () =>{
    updateId.value = '';
    updateTask.value = '';
    updateDesc.value = '';
    updateState.value = '';  
}

const IndividualCard = (el)=>{
    let str = `
    <div>
    <h3>${el.task}</h3>
    <p>${el.desc}</p>
    <p>${el.pending}</p>
    <button class='edit' data-id=${el._id} onclick='editingTask(${el._id})'>Edit</button>
    <button class='delete' data-id=${el._id} onclick='deleteTask(${el._id}'>Delete</button>
    </div>
    `
    return str;
}

const formfirstEl = document.querySelector('#container #left div:nth-child(2) form');

formfirstEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    newTask();
})

const newTask = async ()=>{
    let obj = {};
    obj.task = taskEl.value;
    obj.desc = descEl.value;
    obj.pending = stateEl.value;
    let res = await fetch(`${baseUrl}add`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    })
    if(res.ok){
        alert('Task added');
        emptyFieldCreate();
        fetchingTodo();
    }else{
        alert('Please Try again');
    }
}

const emptyFieldCreate = () =>{
    taskEl.value = '';
    descEl.value = '';
    stateEl.value = '';
}
