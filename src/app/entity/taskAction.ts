import { Action } from './action'

export interface TaskAction {
    actionId: number;
    taskId: number;
    assigneeId: number;
    action: Action;
}