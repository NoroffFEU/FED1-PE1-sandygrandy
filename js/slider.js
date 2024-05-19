function sliderInit() {
    const slideshows = document.querySelectorAll('.slideshow')

    slideshows.forEach(slideshow => {
        const images = slideshow.querySelectorAll('img')
        images.forEach((img, i) => {
            img.style.left = `${(i * img.clientWidth)}px`
        })

        let state = {
            current: 0,
            imageCount: images.length
        }

        const prevButton = document.querySelector(slideshow.attributes['data-cycle-prev'].value)
        const nextButton = document.querySelector(slideshow.attributes['data-cycle-next'].value)

        prevButton.addEventListener('click', sliderPrev.bind(state))
        nextButton.addEventListener('click', slidernext.bind(state))
    })
}

function sliderPrev() {
    this.current = this.current - 1
    if (this.current < 0) {
        this.current = this.imageCount - 1
    }
    document.querySelector('.slideshow').style.transform = `translateX(-${this.current * 100}%)`
}

function slidernext() {
    this.current = (this.current + 1)
    if (this.current >= this.imageCount) {
        this.current = 0
    }
    document.querySelector('.slideshow').style.transform = `translateX(-${this.current * 100}%)`
}

sliderInit()