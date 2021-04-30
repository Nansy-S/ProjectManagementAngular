import { User } from './user'

export interface Task {
    taskId?: number;
    taskCode?: string;
    projectId?: number;
    priority?: string;
    currentStatus?: string;
    dueDate?: Date;
    estimationTime?: number;
    assignee?: number;
    description?: string;
    assigneeInfo: User;
}