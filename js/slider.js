function sliderInit() {
    const slideshows = document.querySelectorAll('.slideshow')

    slideshows.forEach(slideshow => {
        const slideItems = slideshow.children
        for (let i = 0; i < slideItems.length; i++) {
            const item = slideItems[i]
            item.style.left = `${(i * item.clientWidth)}px`
        }

        let state = {
            current: 0,
            imageCount: slideItems.length,
            slideshow
        }

        const prevButton = document.querySelector(slideshow.attributes['data-cycle-prev'].value)
        const nextButton = document.querySelector(slideshow.attributes['data-cycle-next'].value)

        prevButton.addEventListener('click', sliderPrev.bind(state))
        nextButton.addEventListener('click', slidernext.bind(state))

        window.addEventListener('resize', () => {
            for (let i = 0; i < slideItems.length; i++) {
                const item = slideItems[i]
                item.style.left = `${(i * item.clientWidth)}px`
            }
        })
    })
}

function sliderPrev() {
    this.current = this.current - 1
    if (this.current < 0) {
        this.current = this.imageCount - 1
    }
    updatePosition.call(this)
}

function slidernext() {
    this.current = (this.current + 1)
    if (this.current >= this.imageCount) {
        this.current = 0
    }
    updatePosition.call(this)
}

function updatePosition() {
    this.slideshow.style.transform = `translateX(-${this.current * 100}%)`
}

sliderInit()
