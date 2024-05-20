import Api from './api.mjs'

const urlParams = new URLSearchParams(window.location.search);
const blogPostId = urlParams.get('id');

const titleInput = document.getElementById('recipeTitle')
const imageInput = document.getElementById('image-url')
const descriptionInput = document.getElementById('description')

const isNewBlog = !blogPostId

async function loadData(id) {
    try {
        const res = await Api.blogs.getSingle(id)
        if (res.ok) {
            const parsedRes = await res.json()
            const data = parsedRes.data
            titleInput.value = data.title
            imageInput.value = data.media.url
            descriptionInput.value = data.body
        } else {
            console.error('Error:', res)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

function collectData() {
    return {
        title: titleInput.value,
        body: descriptionInput.value,
        media: {
            url: imageInput.value
        }
    }
}

async function submit() {
    const blog = collectData()
    try {
        const res = isNewBlog
            ? await Api.blogs.create(blog)
            : await Api.blogs.update(blogPostId, blog)

        if (res.ok) {
            const parsedRes = await res.json()
            window.location.href = `blog-post.html?id=${parsedRes.data.id}`
        } else {
            console.error('Error:', res)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

// Load data if blogPostId is present
if (!!blogPostId) {
    loadData(blogPostId)
}

const form = document.querySelector('form#edit')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    submit()
})
