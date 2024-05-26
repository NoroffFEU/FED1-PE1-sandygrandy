import Api from './api.mjs'

async function getBlogPosts() {
  const res = await Api.blogs.getMany(12, 1, 'created', 'desc')
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

    // Assign carousel blog post data
    const carouselBlogPosts = blogPosts.slice(0, 3)
    assignCarouselBlogPosts(carouselBlogPosts)

    createBlogPostsGrid(blogPosts)
}

function assignCarouselBlogPosts(blogPosts) {
  if (blogPosts.length > 0) {
    for (let i = 0; i < blogPosts.length; i++) {
        const blogPost = blogPosts[i]
        const blogElement = document.getElementById(`blog-${i + 1}`)
        blogElement.querySelector(`div h1`).innerText = blogPost.title
        const img = blogElement.querySelector(`img`)
        img.src = blogPost.media.url
        img.alt = blogPost.media.alt

        blogElement.addEventListener('click', () => {
            window.location.href = `post/index.html?id=${blogPost.id}`
        })
    }
  }
}


function createBlogPostsGrid(blogPosts) {
  const blogPostsGrid = document.getElementById('grid')
  for (let i = 0; i < blogPosts.length; i++) {
    const blogPost = blogPosts[i]
    const blogPostElement = document.createElement('div')
    blogPostElement.className = 'grid-item clickable'
    blogPostElement.innerHTML = `
        <img src="${blogPost.media.url}" alt="${blogPost.media.alt}">
        <button class="button-style">${blogPost.title}</button>
    `
    blogPostElement.addEventListener('click', () => {
      window.location.href = `post/index.html?id=${blogPost.id}`
    })
    blogPostsGrid.appendChild(blogPostElement)
  }
}

loadData()
