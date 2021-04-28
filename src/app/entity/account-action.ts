import { Action } from './action'

export interface AccountAction {
    actionId: number;
    accountId: number;
    reason: string;
    action: Action;
}