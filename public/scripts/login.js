const loginSubmit = document.getElementById('login-submit');

loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault(); // prevent the form from submitting, which is the default behavior of a button in a form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) return alert('Please enter a username and password');
    const body = {
        username,
        password
    };

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    let data = await res.json();
    if (data.success) {
        window.location.href = data.redirect;
    } else {
        showError(data.message);
    }
})


const showError = (message) => {
    const error = document.getElementById('error-text');
    error.innerText = message;
    error.style.display = 'block';
}