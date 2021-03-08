import { createSelector } from 'reselect'

const selectRobot = (state) => state.robot;

export const selectRobot1Health = createSelector(
    [selectRobot],
    (robot) =>robot.robot1Health
    )

    export const selectRobot2Health = createSelector(
    [selectRobot],
    (robot) =>robot.robot2Health
    )

export const selectTurn = createSelector(
    [selectRobot],
    (robot) =>robot.turn
    )

export const selectGameMode = createSelector(
    [selectRobot],
    (robot) =>robot.gameMode
        )