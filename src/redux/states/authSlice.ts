import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserProfile, LoginCredentials, loginUser, registerUser, RegisterUserData, User } from '../../api/auth';


interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const login = createAsyncThunk<User, LoginCredentials>(
  "/auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
      try {
          return await loginUser(credentials);
      } catch (err: any) {
          return rejectWithValue(err.response?.data?.message || "Error en el login");
      }
  }
);

export const register = createAsyncThunk<void, RegisterUserData>(
  "/auth/register",
  async (userData: RegisterUserData, { rejectWithValue }) => {
      try {
          await registerUser(userData);
      } catch (err: any) {
          return rejectWithValue(err.response?.data?.message || "Error al registrar");
      }
  }
);

export const fetchUserProfile = createAsyncThunk<User, void>(
  "/auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
      try {
          return await getUserProfile();
      } catch (err: any) {
          return rejectWithValue(err.response?.data?.message || "Error al obtener perfil");
      }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      logout(state) {
          state.user = null;
          state.isAuthenticated = false;
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(login.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
              state.isLoading = false;
              state.isAuthenticated = true;
              state.user = action.payload;
          })
          .addCase(login.rejected, (state, action: PayloadAction<any>) => {
              state.isLoading = false;
              state.error = action.payload;
          })
          .addCase(register.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(register.fulfilled, (state) => {
              state.isLoading = false;
          })
          .addCase(register.rejected, (state, action: PayloadAction<any>) => {
              state.isLoading = false;
              state.error = action.payload;
          })
          .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
              state.isAuthenticated = true;
              state.user = action.payload;
          });
  },
});

// Exportar acciones y reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;