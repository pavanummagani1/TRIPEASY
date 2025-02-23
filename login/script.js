let logincontainer = document.getElementById('loginformContainer');
let registercontainer = document.getElementById('registerContainer')

function login(){
    registercontainer.style.display = 'none';
    logincontainer.style.display='block';
}

function register(){
    registercontainer.style.display = 'block';
    logincontainer.style.display='none';
}

