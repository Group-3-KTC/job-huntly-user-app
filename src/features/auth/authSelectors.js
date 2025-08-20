export const selectAccessToken = (state) => state?.auth?.accessToken || null;
export const selectRefreshToken = (state) => state?.auth?.refreshToken || null;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => !!state.auth.accessToken; // !! ép kiểu thành boolean
export const selectAuthHydrated = (state) => state.auth.hydrated;
export const selectAuthRole = (s) => s.auth.user?.role || null;
