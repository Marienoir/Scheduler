
// import fetch from 'node-fetch';

let formWrapper =  document.getElementById('registerUser');

formWrapper.addEventListener('submit', function (e) {
    e.preventDefault();
    let first_name = document.getElementById('fname').value;
    let last_name = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const data = {
        first_name,
        last_name,
        email,
        password
    }
    const url = 'http://localhost:8080/api/v1/create-user';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log(window.location.href);
            if (data.code === 201) {
                window.location.href = 'http://localhost:8080/login'
                alert(data.message)
            } if (data.message === 'duplicate key value violates unique constraint "users_email_key"') {
                alert('Email already exists. Please try again!!!')
            } 
            else {
                console.log('failed');
                alert('Error!!! ' + data.message)
            }
        })
        .catch((error) => {
            alert('Error!!! ' + error);
        });
})

document.getElementById('fname').value = '';
document.getElementById('lname').value = '';
document.getElementById('email').value = '';
document.getElementById('password').value = '';     