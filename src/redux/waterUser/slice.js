import { createSlice } from "@reduxjs/toolkit";
import { logOutUser } from "../authUser/operations.js";
import { userWaterDay, addWaterUser, deleteWater } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const watersSlice = createSlice({
  name: "water",
  initialState: {
    todayWater: [],
    monthWater: [],
    idForEditDeleteWater: "",
    isLoading: false,
    error: null,
  },

  reducers: {
    setIdForEditDeleteWater: (state, action) => {
      state.idForEditDeleteWater = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userWaterDay.pending, handlePending)
      .addCase(userWaterDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todayWater = action.payload;
      })
      .addCase(userWaterDay.rejected, handleRejected)

      .addCase(addWaterUser.pending, handlePending)
      .addCase(addWaterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todayWater = action.payload.dayWaterUser;
        // state.todayWater.push(action.payload.dayWaterUser);
      })

      .addCase(addWaterUser.rejected, handleRejected)

      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // const index = state.items.findIndex(
        //   (task) => task.id === action.payload.id
        // );
        // state.items.splice(index, 1);
        state.todayWater = action.payload.dayWaterUser;
      })
      .addCase(deleteWater.rejected, handleRejected)

      .addCase(logOutUser.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { setIdForEditDeleteWater } = watersSlice.actions;

export const waterReducer = watersSlice.reducer;
