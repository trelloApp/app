import { createSlice } from "@reduxjs/toolkit";
import { TodoPros } from "../../service/serviceInterface";
export type initialStatePros = {
  modalUpdateContent: boolean;
  dataModalupdate: TodoPros;
};
export type ActionPros = {
  type: string;
  payload: TodoPros;
};
export const initialState = {
  modalUpdateContent: false,
  dataModalupdate: {
    id: "",
    content: "",
    todo: "",
    createdAt: "",
    authorId: null,
    employeeId: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showModalUpdateContent(state, action: any) {
      return {
        ...state,
        modalUpdateContent: true,
        dataModalupdate: { ...state.dataModalupdate, ...action.payload },
      };
    },
    hideModalUpdateContent(state) {
      return {
        ...state,
        modalUpdateContent: false,
        dataModalupdate: {
          id: "",
          content: "",
          todo: "",
          createdAt: "",
          authorId: null,
          employeeId: null,
        },
      };
    },
  },
});
export const { showModalUpdateContent, hideModalUpdateContent } =
  authSlice.actions;
export default authSlice.reducer;
