// const url = 'http://localhost:8998/user/login';
const url = 'https://successful-pocket-hare.cyclic.app/user/login';
const nameEl= document.querySelector('#name');
const passwordEl = document.querySelector('#password');
let token = localStorage.getItem('token') || '';
const formEl = document.querySelector('form')
formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    const obj = {};
    obj.name = nameEl.value;
    obj.password = passwordEl.value;
    makingRequest(obj);
})


const makingRequest = async (obj)=>{
    let res = await fetch(url, {
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        },
        method: "POST"
    });
    if(res.ok){
        res = await res.json();
        token = res.token;
        localStorage.setItem('token', token);
        window.location.href= 'showtodo.html'
    }
}