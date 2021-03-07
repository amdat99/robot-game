import robotActionTypes from './robot.types'

export const setRobot1Health = (value) => ({
    type: robotActionTypes.SET_ROBOT1_HEALTH,
    payload: value

})

export const setRobot2Health = (value) => ({
    type: robotActionTypes.SET_ROBOT2_HEALTH,
    payload: value

})

export const setTurn = (player) => ({
    type: robotActionTypes.SET_TURN,
    payload: player

})