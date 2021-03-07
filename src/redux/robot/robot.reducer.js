import robotActionTypes from './robot.types'

const INITIAL_STATE = {
    robot1Health: 100,
    robot2Health: 100,
    turn: 'player1'
}

const headerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case robotActionTypes.SET_ROBOT1_HEALTH:
            return{
                ...state,
                robot1Health: state.robot1Health+action.payload
            }

            case robotActionTypes.SET_ROBOT2_HEALTH:
                return{
                    ...state,
                    robot2Health: state.robot2Health+action.payload
                }
            case robotActionTypes.SET_TURN:
                    return{
                        ...state,
                        turn: action.payload
                    }
            
        default:
            return state
    }
}

export default headerReducer