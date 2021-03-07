import { createSelector } from 'reselect'

const selectRoute = (state) => state.robot;

export const selectRobot1Health = createSelector(
    [selectRoute],
    (robot) =>robot.robot1Health
    )

    export const selectRobot2Health = createSelector(
        [selectRoute],
        (robot) =>robot.robot2Health
        )

export const selectTurn = createSelector(
    [selectRoute],
    (robot) =>robot.turn
    )