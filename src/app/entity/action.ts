export interface Action {
    actionId: number;
    typeAction: string;
    datetime: Date;
    reporter: number;
    reporterInfo: Account;
}