import {createStore,combineReducers,applyMiddleware} from "redux"
import { thunk } from "redux-thunk"
import { StudentReducers } from "./Reducers/StudentReducers"

const Rootreducers=combineReducers({
    StudentReducers
})

export const store=createStore(Rootreducers,applyMiddleware(thunk))