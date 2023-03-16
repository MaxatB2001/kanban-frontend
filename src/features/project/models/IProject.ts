import { ISection } from './../../section/models/ISection';
export interface IProject {
  id: string;
  name: string;
  sections: ISection[]
}