import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            // Toggle between light and dark themes
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    }
})

export const {toggleTheme} = themeSlice.actions //themeReducer

export default themeSlice.reducer