import { PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "./models/IProject";
import { ISection } from "./../section/models/ISection";
import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../task/models/ITask";

interface ProjectSlice {
  currentProject: IProject | null;
}

const initialState: ProjectSlice = {
  currentProject: null,
};

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<IProject>) => {
      state.currentProject = action.payload;
    },
    updateProjectSections: (state, action: PayloadAction<ISection[]>) => {
      if (state.currentProject) {
        const newS = state.currentProject.sections.map((i) => {
          const isIn = action.payload.filter((sec) => i.id === sec.id);
          if (isIn.length > 0) return isIn[0];
          return i;
        }) as ISection[];
        state.currentProject.sections = newS;
      }
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      state.currentProject?.sections.forEach((section) => {
        if (section.id === action.payload.sectionId) {
          section.tasks.push(action.payload);
        }
      });
    },
    addSection: (state, action: PayloadAction<ISection>) => {
      state.currentProject?.sections.push(action.payload)
    }
  },
});

export default ProjectSlice.reducer;
