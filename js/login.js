import Api from '../js/api.mjs';

// Get input elements
const loginForm = document.querySelector('form#login')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

async function login(username, password) {
    console.log('Logging in...')
    try {
        const res = await Api.auth.login(username, password)
        if (!!res) {
            console.log('Logged in!', res)
            window.location.href = '/'
        }
    } catch (error) {
        console.error(error)
    }
}

// Register event listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    login(usernameInput.value, passwordInput.value)
})
