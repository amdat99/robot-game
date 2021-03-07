import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import robotReducer from './robot/robot.reducer'



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    robot: robotReducer,
 
})

export default persistReducer(persistConfig, rootReducer)