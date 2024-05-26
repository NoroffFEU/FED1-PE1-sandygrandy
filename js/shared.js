import Api from './api.mjs'

const isLoggedIn = !!Api.auth.getLoggedInUser()

if (isLoggedIn) {
    document.body.classList.add('logged-in')
} else {
    document.body.classList.add('logged-out')
}
