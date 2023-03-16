import { ITask } from './../../task/models/ITask';
export interface ISection {
  id: string;
  name: string;
  tasks: ITask[]
}