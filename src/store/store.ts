import { configureStore } from "@reduxjs/toolkit";
import merchantReducer from "@/store/reducer/merchant"
import CheckOutReducer from "@/store/reducer/checkout"

export const store = configureStore({
    reducer: {
        merchant: merchantReducer,
        checkOut: CheckOutReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store