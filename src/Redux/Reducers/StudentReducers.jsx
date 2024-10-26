import { GET_USER, REMOVE_USER, SET_USER } from "../ActionTypes";

const initialValue = {
    userInitialvalue: {}
}

export const StudentReducers = (state = initialValue, action) => {
    switch (action.type) {
        case SET_USER: {
            localStorage.setItem("user",JSON.stringify(action.payload))

            return{
                ...state,userInitialvalue:action.payload
            }
        }
        case GET_USER:{
           let getdata=JSON.parse(localStorage.getItem("userr"))
            return{
                ...state,userInitialvalue:getdata?getdata:{}
            }
        }
        case REMOVE_USER:{
            localStorage.removeItem("userr")
            return{
                ...state,userInitialvalue:{}
            }
        }
        default: 
        return state
        

    }
}



