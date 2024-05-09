import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDoctorProfile = createAsyncThunk(
  'doctorProfile/fetchDoctorProfile',
  async (doctorId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const config = {
        headers: {
          'x-auth-token': token
        }
      };

      const response = await axios.get(`http://localhost:5000/api/auth/doctor/profile/${doctorId}`, config);
      return response.data.doctor;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState: {
    doctor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorProfileSlice.reducer;