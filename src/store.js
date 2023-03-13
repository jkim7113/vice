import { configureStore, createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {data : null},
    reducers: {
        update:(state, action) => {
            state.data = action.payload;
        },
        empty:(state) => {
            state.data = null;
        }
    },
});

export const itemSlice = createSlice({
    name: "itemSlice",
    initialState: {data : null},
    reducers: {
        update:(state, action) => {
            state.data = action.payload;
        },
        empty:(state) => {
            state.data = null;
        }
    },
});


export const store = configureStore({
    reducer:{
        category: categorySlice.reducer,
        item: itemSlice.reducer,
    }
});