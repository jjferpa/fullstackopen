import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice ({
    name: 'notification',
    initialState,
    reducers:{

        setNotification(state, action) {
            return action.payload;
          }
        
    }
})

let activeNotification = null;

export const createNotification = (message, delay = 10) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (activeNotification) {
      clearTimeout(activeNotification);
    }

    activeNotification = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer