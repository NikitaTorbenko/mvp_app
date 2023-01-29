'use strict';

export class Model {
    #cars = []
    constructor( ) {
        this.#cars = []
    }

    getCarsLength(){
        return this.#cars.length +1
    }

    get cars () {
        return this.#cars
    }

    set cars(val) {
        this.#cars.push(val)
        console.log( this.#cars )
    }
}