let formWrapper =  document.getElementById('loginUser');

formWrapper.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const data = {
        email,
        password
    }
    const url = 'http://localhost:8080/api/v1/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                window.location.href = 'http://localhost:8080/schedule';
                localStorage.setItem('token', data.token)
                alert('Success!!! ' + data.message)
            } else {
                console.log('failed');
                alert('Error!!! ' + data.message)
            }
        })
        .catch((error) => {
            alert('Error!!! ' + error);
        });
})
document.getElementById('email').value = '';
document.getElementById('password').value = '';