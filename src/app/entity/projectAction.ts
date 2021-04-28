import { Action } from './action'

export interface ProjectAction {
    actionId: number;
    projectId: number;
    action: Action;
}