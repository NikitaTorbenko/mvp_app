'use strict'

import './index.scss'
import {View} from './mvp/view'
import {Presenter} from './mvp/presenter'
import {Model} from './mvp/model'
import moment from 'moment'
import cars from './mvp/cars.json'


const model = new Model()
const presenter = new Presenter()
const view = new View(presenter)

presenter.init(view, model)
