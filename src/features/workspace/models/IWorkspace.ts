import { IProject } from "../../project";

export interface IWorkspace {
  id: string;
  name: string;
  projects: Array<IProject>
}