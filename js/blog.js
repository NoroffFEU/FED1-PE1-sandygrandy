import Api from './api.mjs'

const urlParams = new URLSearchParams(window.location.search)
const blogPostId = urlParams.get('id')

async function getBlogPost() {
  const res = await Api.blogs.getSingle(blogPostId)
  if (res.ok) {
    const parsedRes = await res.json()
    return parsedRes.data
  } else {
    console.error('Error fetching blog post')
  }
}

async function loadData() {
    // Fetch data
    const data = await getBlogPost()

    // Assign blog post data
    document.getElementById('blog-post-title').innerText = data.title
    document.getElementById('recipe-content').innerText = data.body
    document.getElementById('recipe-img').src = data.media.url
    document.getElementById('date-published').innerText = new Date(data.created).toLocaleDateString()

    // Assign author data
    document.getElementById('author-name').innerText = data.author.name
    document.getElementById('chef-img').src = data.author.avatar.url
    document.getElementById('author-description').innerText = data.author.bio
}

if (!!blogPostId) {
    loadData()
} else {
    console.error('No blog post ID provided')
}
