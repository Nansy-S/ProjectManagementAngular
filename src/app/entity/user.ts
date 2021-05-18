import { Account } from './account'

export interface User {
    userId?: number;
    position: string;
    currentStatus?: string;
    phone: string;
    accountInfo: Account;
}