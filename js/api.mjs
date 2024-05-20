const apiBaseUrl = 'https://v2.api.noroff.dev'

// Husk login
// SanLan78461@stud.noroff.no
// panda123

function getLoggedInUser() {
    const user = localStorage.getItem('user')
    const parsedUser = JSON.parse(user)

    if (parsedUser) {
        return parsedUser
    }
        
    return false
}

export default {
    auth: {
        register: async function (name, email, password, avatar, banner) {
            const response = await fetch(`${apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, avatar, banner }),
            })
            return response
        },
        login: async function (email, password) {
            const response = await fetch(`${apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            
            const res = await response.json()

            if (!response.ok) {
                console.log('Error:', res.message)
                return false
            }
            
            localStorage.setItem('user', JSON.stringify(res.data))
            return true
        },
        getLoggedInUser: function () {
            return getLoggedInUser()
        },
        logout: function () {
            localStorage.removeItem('user')
        }
    },
    blogs: {
        getMany: async function (limit, page) {
            const query = new URLSearchParams();

            if (limit) {
                query.append('limit', limit)
            }

            if (page) {
                query.append('page', page)
            }

            const response = await fetch(`${apiBaseUrl}/blog/posts/Sandra?${query}`)
            return response
        },
        getSingle: async function (id) {
            const response = await fetch(`${apiBaseUrl}/blog/posts/Sandra/${id}`)
            return response
        },
        create: async function (blog) {
            const user = getLoggedInUser()
            if (!user) {
                throw new Error('You must be logged in to create a blog post')
            }
            const response = await fetch(`${apiBaseUrl}/blog/posts/Sandra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(blog),
            })
            return response
        },
        delete: async function (id) {
            const user = getLoggedInUser()
            if (!user) {
                throw new Error('You must be logged in to delete a blog post')
            }
            const response = await fetch(`${apiBaseUrl}/blog/posts/Sandra/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
            return response
        },
        update: async function (id, blog) {
            const user = getLoggedInUser()
            if (!user) {
                throw new Error('You must be logged in to edit a blog post')
            }
            const response = await fetch(`${apiBaseUrl}/blog/posts/Sandra/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(blog),
            })
            return response
        },
    },

}