
import { IMerchants } from "@/types/merchant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MerchantState {
  merchant: IMerchants | null
}

const initialState: MerchantState = {
  merchant: null,
}

const merchantReducer = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    setMerchant: (state, action: PayloadAction<IMerchants>) => {
      state.merchant = action.payload
    },
    clearMerchant: (state) => {
      state.merchant = null
    },
  },
})

export const { setMerchant, clearMerchant } = merchantReducer.actions
export default merchantReducer.reducer
