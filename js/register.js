import Api from '../js/api.mjs';

// Get input elements
const registerForm = document.querySelector('form')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

async function register(username, email, password) {
    try {
        const res = await Api.auth.register(username, email, password)
        if (res.ok) {
            window.location.href = '/'
        } else {
            const error = await res.json()
            alert(error.errors[0].message)
        }
    } catch (error) {
        console.error(error)
    }
}

// Register event listeners
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    register(usernameInput.value, emailInput.value, passwordInput.value)
})
