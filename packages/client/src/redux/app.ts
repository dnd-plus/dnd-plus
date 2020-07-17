import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const app = createSlice({
  name: "app",
  initialState: 0,
  reducers: {
    increment(state, { payload: { by = 1 } }: PayloadAction<{ by: number }>) {
      return state + by;
    },
    decrement(state, { payload: { by = 1 } }: PayloadAction<{ by: number }>) {
      return state - by;
    },
    set(state, { payload: { value } }: PayloadAction<{ value: number }>) {
      return value;
    },
  },
});

// type AppActions = {
//   [T in keyof typeof app.actions]: ReturnType<typeof app.actions[T]> & { type: T }
// }[keyof typeof app.actions]
