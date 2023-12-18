
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const deleteButtons = document.getElementsByClassName('delete-buttons');
const buttonDefaultText = 'Delete User'
const buttonConfirmText = ' Are you sure? '
const buttonDefaultState = 0;
const buttonConfirmState = 1;

for (i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.state = buttonDefaultState;
    button.addEventListener("click", async () => {
        if (button.state == buttonDefaultState) { //To double check
            button.state = buttonConfirmState; // Change state
            button.innerHTML = buttonConfirmText; // Change text
            sleep(5000).then(() => { button.state = buttonDefaultState; button.innerHTML = buttonDefaultText; });  // set to default
        } else {
            const url = `/users/${button.dataset.id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then((res) => res.json())
                .then((res) => { window.location.href = res.redirect }) // Redirect user to the url from the response
                .catch((err) => { console.log(err) });
        }
    });
}

const searchButton = document.getElementById('user-search-button');
const searchBox = document.getElementById('search-box');
const resetButton = document.getElementById('reset-button');

searchButton.addEventListener('click', () => {
    window.location.href = `/users/get/${searchBox.value}`;
})

searchBox.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        window.location.href = `/users/get/${searchBox.value}`;
    };
});

resetButton.addEventListener('click', () => {
    window.location.href = '/users/get';
});