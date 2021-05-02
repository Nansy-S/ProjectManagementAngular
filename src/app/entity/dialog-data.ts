import { User } from '../entity/user';

export interface DialogChangeTaskAssigneeData {
    newAssigneeId: number;
    role: string;
    assigneeList: User[];
  }
  
  export interface DialogDataMsg {
    contect: string;
  }
  
  export interface Responce {
    newAssigneeId: number;
    isChange: boolean;
  }