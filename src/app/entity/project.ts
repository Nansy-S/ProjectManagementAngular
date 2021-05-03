import { ProjectAction } from './project-action'

export interface Project {
    projectId?: number;
    projectCode: string;
    summary: string;
    dueDate: Date;
    currentStatus?: string;
}