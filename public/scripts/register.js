
const registerSubmit = document.getElementById('register-submit');
console.log('Added eventlistener to button');

registerSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) return alert('Please enter a username and password');
    const body = {
        username,
        password
    };

    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    let data = await res.json();
    if (data.success) {
        window.location.href = data.redirect;
    } else {
        alert(data.message)
    }
}); 
