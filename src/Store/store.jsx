import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
