const apiBaseUrl = 'https://v2.api.noroff.dev';

// Husk login
// SanLan78461@stud.noroff.no
// panda123

function getUser() {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    if (parsedUser) {
        return parsedUser
    }
        
    throw new Error('No user found');
}

export default {
    auth: {
        login: async function (email, password) {
            const response = await fetch(`${apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            localStorage.setItem('user', data);
            return await response.json();
        },
        register: async function (name, email, password, avatar, banner) {
            // TODO: Finish this method
            const response = await fetch(`${apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, avatar, banner }),
            });
            return await response.json();
        },
    },
    blogs: {
        getAll: async function () {
            const user = getUser()
            const response = await fetch(`${apiBaseUrl}/blogs/${user.name}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            return response.json();
        },
        getSingle: async function (id) {
            const user = getUser()
            const response = await fetch(`${apiBaseUrl}/blogs/${user.name}/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            return await response.json();
        },
        create: async function (title, body, tags, media) {
            const user = getUser()
            const response = await fetch(`${apiBaseUrl}/blogs/${user.name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify({ title, body, tags, media }),
            });
            return await response.json();
        },
        delete: async function (id) {
            const user = getUser()
            const response = await fetch(`${apiBaseUrl}/blogs/${user.name}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            return await response.json();
        },
        update: async function (id, title, body, tags, media) {
            const user = getUser()
            const response = await fetch(`${apiBaseUrl}/blogs/${user.name}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify({ title, body, tags, media }),
            });
            return await response.json();
        },
    },

}