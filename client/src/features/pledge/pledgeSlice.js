import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pledgeService from './pledgeService'

const initialState = {
    pledges: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createPledge = createAsyncThunk(
    'pledges/create',
    async (pledgeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await pledgeService.createPledge(pledgeData, token)
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const editPledge = createAsyncThunk(
    'pledges/edit',
    async (pledgeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await pledgeService.editPledge(pledgeData, token)
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getPledges = createAsyncThunk(
    'pledges/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await pledgeService.getPledges(token)
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deletePledge = createAsyncThunk(
    'pledges/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await pledgeService.deletePledge(id, token)
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const pledgeSlice = createSlice({
    name: 'pledge',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPledge.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPledge.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pledges.push(action.payload)
            })
            .addCase(createPledge.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editPledge.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editPledge.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = state.items
            })
            .addCase(editPledge.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPledges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPledges.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pledges = action.payload
            })
            .addCase(getPledges.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePledge.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePledge.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pledges = state.pledges.filter(
                    (pledge) => pledge._id !== action.payload.id
                )
            })
            .addCase(deletePledge.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = pledgeSlice.actions
export default pledgeSlice.reducer