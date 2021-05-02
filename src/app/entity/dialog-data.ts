
export interface DialogChangeTaskAssigneeData {
    newAssigneeId: number;
    assigneeList: Account[];
  }
  
  export interface DialogDataMsg {
    contect: string;
  }
  
  export interface Responce {
    newAssigneeId: number;
    isChange: boolean;
  }