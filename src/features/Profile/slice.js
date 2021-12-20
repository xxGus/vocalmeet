import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import StateStatus from "../../utils/status";

import { getProfile as profile } from "./service";

const initialState = {
	status: {
		getProfile: StateStatus.idle,
	},
	infos: {},
    errorMsg: null
};

export const getProfile = createAsyncThunk("profile/getProfile", () => {
	return profile();
});

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: {
        [getProfile.pending]: (state) => {
			state.status.getProfile = StateStatus.loading;
		},
		[getProfile.fulfilled]: (state, action) => {
			state.status.getProfile = StateStatus.succeeded;
			state.infos = action.payload;
		},
		[getProfile.rejected]: (state, action) => {
			state.status.getProfile = StateStatus.failed;
			state.errorMsg = action.error.message;
		},
    }
});

export const selectProfile = (state) => state.profile