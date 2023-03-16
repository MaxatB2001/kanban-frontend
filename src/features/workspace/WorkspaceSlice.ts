import { PayloadAction } from "@reduxjs/toolkit";
import { IWorkspace } from "./models/IWorkspace";
import { createSlice } from "@reduxjs/toolkit";

interface WorkspaceState {
  workspaces: Array<IWorkspace>;
}

const initialState: WorkspaceState = {
  workspaces: [],
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<Array<IWorkspace>>) => {
      state.workspaces = action.payload;
    },
  },
});

export default workspaceSlice.reducer;
