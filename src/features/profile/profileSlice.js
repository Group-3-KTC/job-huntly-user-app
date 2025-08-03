import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        normalizedProfile: null,
    },
    reducers: {
        setNormalizedProfile(state, action) {
            state.normalizedProfile = action.payload;
        },
        clearNormalizedProfile(state) {
            state.normalizedProfile = null;
        },
    },
});

export const { setNormalizedProfile, clearNormalizedProfile } =
    profileSlice.actions;
export default profileSlice.reducer;


export const selectNormalizedProfile = (state) => state.profile.normalizedProfile;
