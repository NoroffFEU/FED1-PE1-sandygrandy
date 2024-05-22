import Api from './api.mjs'

async function getBlogPosts() {
  const res = await Api.blogs.getMany(3, 1, 'created', 'desc')
  if (res.ok) {
    const parsedRes = await res.json()
    return parsedRes.data
  } else {
    console.error('Error fetching blog posts')
  }
}

async function loadData() {
    // Fetch data
    const blogPosts = await getBlogPosts()

    // Assign blog post data
    if (blogPosts.length > 0) {
        for (let i = 0; i < blogPosts.length; i++) {
            const blogPost = blogPosts[i]
            const blogElement = document.getElementById(`blog-${i + 1}`)
            blogElement.querySelector(`div h1`).innerText = blogPost.title
            const img = blogElement.querySelector(`img`)
            img.src = blogPost.media.url
            img.alt = blogPost.media.alt

            blogElement.addEventListener('click', () => {
                window.location.href = `/blog-post.html?id=${blogPost.id}`
            })
        }
    }
}

loadData()
