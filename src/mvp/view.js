'use strict';

export class View {
    #presenter = null
    #leftSide
    #form
    #carObject

    constructor(presenter) {
        this.#presenter = presenter

        this.file_imageUrl = document.querySelector('.file_imageUrl');
        this.formUpload = document.querySelector('.file_upload')
        this.#leftSide = document.querySelector('.left_side')
        this.closeBtn = document.querySelector('.close_btn')
        this.left_side = document.querySelector('.left_side')
        this.right_side = document.querySelector('.right_side')
        this.#form = document.forms[1]

        this.flag = true

        this.tabs = Array.from(document.querySelectorAll('.tabs li'));
        this.divs = Array.from(document.querySelectorAll('.controls_content > div'));

        this.selectBrand = this.#form[0]
        this.selectModel = this.#form[1]
        this.selectYear = this.#form[2]
        this.selectPrice = this.#form[3]
        this.newCar = this.#form[4]
        this.usedCar = this.#form[5]
        this.submitBtn = this.#form[6]

        this.eventInit()
    }

    eventInit() {
        this.formUpload['form_image_send'].addEventListener('click', this.formImageHandler.bind(this))
        this.closeBtn.addEventListener('click', this.closeBtnHandler.bind(this))
        this.selectBrand.addEventListener('change', this.selectBrandHandler.bind(this))
        this.selectModel.addEventListener('change', this.selectModelHandler.bind(this))
        this.selectYear.addEventListener('change', this.selectYearHandler.bind(this))
        this.selectPrice.addEventListener('change', this.selectPriceHandler.bind(this))
        this.newCar.addEventListener('click', this.selectNewHandler.bind(this))
        this.usedCar.addEventListener('click', this.selectUsedHandler.bind(this))
        this.submitBtn.addEventListener('click', this.submitBtnHandler.bind(this))
        this.tabsHandler()
    }


    formImageHandler(e) {
        e.preventDefault()

        const reader = new FileReader()

        const brand = this.formUpload['file_brand']
        const model = this.formUpload['file_model']
        const year = this.formUpload['file_year']
        const price = this.formUpload['file_price']
        const miles = this.formUpload['file_miles']
        const newCar = this.formUpload['file_newCar']

        if (!this.file_imageUrl.files[0]) {
            return
        }

        reader.addEventListener('load', () => {
            const fileSrc = reader.result

            const newCarr = { // 46:41
                brand: brand.value,
                model: model.value,
                year: year.value,
                newCar: newCar.value,
                price: price.value,
                miles: miles.value,
                imageUrl: fileSrc
            }

            this.#presenter.getCarFromView(newCarr)
        })

        reader.readAsDataURL(this.file_imageUrl.files[0])
    }

    selectBrandHandler(e) {
        const {target} = e
        const index = target.value
        const brandText = target.options[index - 1].text
        this.#carObject.brand = brandText.toLocaleLowerCase()
    }

    selectModelHandler(e) {
        const {target} = e
        const index = target.value
        const modelText = target.options[index - 1].text
        this.#carObject.model = modelText
    }

    selectYearHandler(e) {
        const {target} = e
        const index = target.value
        const yearText = target.options[index - 1].text
        this.#carObject.year = +yearText
    }

    selectPriceHandler(e) {
        const {target} = e
        const index = target.value
        const priceText = target.options[index - 1].text
        this.#carObject.price = +priceText
    }

    selectNewHandler(e) {
        const {target} = e
        if (target.value === 'new') {
            this.#carObject.newCar = true
        }

    }

    selectUsedHandler(e) {
        const {target} = e
        if (target.value === 'used') {
            this.#carObject.newCar = false
        }

    }

    async submitBtnHandler(e) {
        e.preventDefault()
        await this.#presenter.filterCars(this.#carObject)
    }

    closeBtnHandler(e) {
        if (this.flag) {
            this.left_side.style.width = '0'
            this.right_side.style.width = '100%'
            Array.from(this.left_side.children).forEach(item => {
                item.style.display = 'none'
            })
            this.closeBtn.style.display = 'block'
            this.flag = false
        } else {
            Array.from(this.left_side.children).forEach(item => {
                item.style.display = 'block'
            })
            this.left_side.style.width = '30%'
            this.right_side.style.width = '70%'
            this.flag = true
        }
    }

    tabsHandler(e) {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', e => {
                this.tabs.forEach(tab => tab.classList.remove('active'))
                e.target.classList.add('active')

                this.divs.forEach(div => div.style.display = 'none')
                document.querySelector(e.target.dataset.tab).style.display = 'block'
            })
        })
    }

    getFromPresenter(cars) {
        this.createCarsCards(cars)
    }

    createCarsCards(cars = []) {
        const cardAr = []
        if (Array.isArray(cars)) {
            cars.forEach(car => {
                const card = this.cardTemplate(car)
                cardAr.push(card)
            })
            this.render(cardAr)
        } else {
            console.log('только массивы');
        }
    }

    cardTemplate(car) {
        const card = document.createElement('div')
        card.classList.add('card')

        const card_block_image = document.createElement('div')
        card_block_image.classList.add('card_block_image')

        const card_img_wrap = document.createElement('div')
        card_img_wrap.classList.add('card_img_wrap')

        const card__image = document.createElement('img')
        card__image.classList.add('card__image')

        const card_block_main_info = document.createElement('div')
        card_block_main_info.classList.add('card_block_main_info')

        const card__title = document.createElement('p')
        card__title.classList.add('card__title')

        const card__model = document.createElement('p')
        card__model.classList.add('card__model')

        const card__year = document.createElement('p')
        card__year.classList.add('card__year')

        const card__price = document.createElement('p')
        card__price.classList.add('card__price')

        const card_block_secondary_info = document.createElement('div')
        card_block_secondary_info.classList.add('card_block_secondary_info')

        const card__usage = document.createElement('p')
        card__usage.classList.add('card__usage')

        const card__id = document.createElement('p')
        card__id.classList.add('card__id')

        const card__mileage = document.createElement('p')
        card__mileage.classList.add('card__mileage')

        card_img_wrap.append(card__image)
        card_block_image.append(card_img_wrap)

        card_block_main_info.append(card__title)
        card_block_main_info.append(card__model)
        card_block_main_info.append(card__year)
        card_block_main_info.append(card__price)

        card_block_secondary_info.append(card__usage)
        card_block_secondary_info.append(card__id)
        card_block_secondary_info.append(card__mileage)

        card.append(card_block_image)
        card.append(card_block_main_info)
        card.append(card_block_secondary_info)

        card__image.src = 'https://a.d-cd.net/aa17a36s-960.jpg'

        card__title.textContent = car.brand
        card__model.textContent = car.model
        card__year.textContent = car.year
        card__price.textContent = `цена: ${car.price} $`

        card__usage.textContent = car.newCar ? 'с салона' : 'б/у'
        card__id.textContent = ` id: ${car.id}`
        card__mileage.textContent = ` пробег: ${car.miles}`

        return card
    }

    render(cards) {
        this.clear()
        cards.forEach(car => this.right_side.append(car))
    }

    clear() {
        this.right_side.innerHTML = ''
    }


}






