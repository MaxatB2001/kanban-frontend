import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SidebarSlice {
  isShown: boolean;
}

const initialState: SidebarSlice = {
  isShown: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsShown: (state, action: PayloadAction<boolean>) => {
      state.isShown = action.payload;
    },
  },
});

export default sidebarSlice.reducer;
