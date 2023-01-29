'use strict';

export class Presenter {
    #view = null
    #model = null

    constructor() {}

    init(view, model) {
        this.#view = view
        this.#model = model

        /*this.fetchCars()*/
    }

    async fetchCars() { // 57;00
        const cars = await this.#model.cars

        //send to view
        await this.sendToView(cars)
    }

    async sendToView(cars) {
        await this.#view.getFromPresenter(cars)
    }

    async filterCars(car) {
        const cars = this.#model.cars.filter(mCar => {
            if (mCar.brand.toLowerCase() === car.brand.toLowerCase() &&
                mCar.model.toLowerCase() === car.model.toLowerCase() &&
                mCar.price === car.price &&
                mCar.year === car.year &&
                mCar.newCar === car.newCar
            ) {
                return true
            }

        })
        this.#view.getFromPresenter(cars)
    }

    async getCarFromView(car) {


        car.brand = this.normalizeStr(car.brand)
        car.model = this.normalizeStr(car.model)
        car.year = +this.validateDigitData(car.year)
        car.price = +this.validateDigitData(car.price)
        car.miles = +this.validateDigitData(car.miles)
        car.id = this.#generateID()
        car.post_date = new Date().toLocaleString()
        this.#model.cars = car
    }

    #generateID() {
        return this.#model.getCarsLength()
    }

    validateDigitData(digits){
        const pattern = /^[0-9]+$/;
        if (pattern.test(digits)){
            return digits
        }else{
            throw new Error("только цифры")
        }
    }

    normalizeStr(str = '') {
        return str.trim().toLowerCase()
    }
}
