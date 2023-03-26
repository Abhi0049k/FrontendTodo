// const url = 'http://localhost:8998/user/register';
const url = 'https://successful-pocket-hare.cyclic.app/user/register';
const formEl = document.querySelector('form');
const nameEl = document.querySelector('#name');
const roleEl = document.querySelector('#role');
const ageEl = document.querySelector('#age');
const passEl = document.querySelector('#password');


formEl.addEventListener('submit', async (evnt)=>{
    evnt.preventDefault();
    let obj = {};
    obj.name = nameEl.value;
    obj.role = roleEl.value;
    obj.age = +ageEl.value;
    obj.password = passEl.value;
    let res = await fetch(url, {
        body: JSON.stringify(obj),
        headers:{
            'Content-type': "application/json"
        },
        method: "POST"
    })
    if(res.ok){
        window.location.href='index.html'
    }
})