import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import StateStatus from "../../utils/status";

import { getCoinsList, getCategories } from "./service";

const initialState = {
	status: {
		coinsList: StateStatus.idle,
		categoriesList: StateStatus.idle,
	},
	list: [],
	categories: [],
	errorMsg: null,
};

export const coinsList = createAsyncThunk(
	"crypto/coinsList",
	async (params) => {
		if (params.category === "") delete params.category;
		params.price_change_percentage = "1h,24h,7d";
		return await getCoinsList(params);
	},
);

export const categoriesList = createAsyncThunk(
	"crypto/categoriesList",
	async () => {
		return await getCategories();
	},
);

export const crypto = createSlice({
	name: "crypto",
	initialState,
	extraReducers: {
		[coinsList.pending]: (state) => {
			state.status.coinsList = StateStatus.loading;
		},
		[coinsList.fulfilled]: (state, action) => {
			state.status.coinsList = StateStatus.succeeded;
			state.list = action.payload.data;
		},
		[coinsList.rejected]: (state, action) => {
			state.status.coinsList = StateStatus.failed;
			state.errorMsg = action.error.message;
		},
		[categoriesList.pending]: (state) => {
			state.status.categoriesList = StateStatus.loading;
		},
		[categoriesList.fulfilled]: (state, action) => {
			state.status.categoriesList = StateStatus.succeeded;
			let categories = [{ label: "", value: "" }];
			action.payload.data.forEach((element) => {
				categories.push({
					label: element.name,
					value: element.category_id,
				});
			});
			state.categories = categories;
		},
		[categoriesList.rejected]: (state, action) => {
			state.status.categoriesList = StateStatus.failed;
			state.errorMsg = action.error.message;
		},
	},
});

export const selectCrypto = (state) => state.crypto;
