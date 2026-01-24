import { ICart, ICartItem } from "@/model/cart";
import { IMenu } from "@/types/menu"
import { ApiResponse } from "@/utils/api";
import { GET_CART, POST_ITEM_CART } from "@/utils/APIConstant";
import { getApi, postApi } from "@/utils/common";
import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"

export interface CheckOutItems extends IMenu {
  itemCount: number
}

export const syncCartWithDB = createAsyncThunk(
  "checkout/syncCart",
  async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
    const response = await postApi<ApiResponse<ICart>>({
      url: POST_ITEM_CART,
      values: { itemId, quantity }
    });
    if (response?.success) {
      return response?.data;
    }
    return null;
  }
);

export const syncCartToCheckOut = createAsyncThunk(
  "checkout/cart",
  async ({ dispatch }: { dispatch: Dispatch }) => {
    const response = await getApi<ApiResponse<CheckOutItems[]>>({
      url: GET_CART
    });
    if (response?.success) {
      dispatch(setCheckout(response?.data));
      return response?.data;
    }
    return null;
  }
)

const initialState: CheckOutItems[] = [];

const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCheckOutItem: (state, action: PayloadAction<IMenu>) => {
      const item = state.find(i => i._id === action.payload._id)

      if (item) {
        item.itemCount += 1
      } else {
        state.push({
          ...action.payload,
          itemCount: 1,
        })
      }
    },

    removeCheckItem: (state, action: PayloadAction<string>) => {
      return state.filter(item => String(item._id) !== action.payload)
    },

    incrementCheckOutItem: (state, action: PayloadAction<string>) => {
      const item = state.find(i => String(i._id) === action.payload)
      if (item) {
        item.itemCount += 1
      }
    },

    decrementCheckOutItem: (state, action: PayloadAction<string>) => {
      const item = state.find(i => String(i._id) === action.payload)
      if (!item) return

      if (item.itemCount > 1) {
        item.itemCount -= 1
      } else {
        return state.filter(i => String(i._id) !== action.payload)
      }
    },

    updateCheckOutQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.find(i => String(i._id) === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },

    clearCheckout: () => {
      return []
    },

    setCheckout: (_state, action: PayloadAction<CheckOutItems[]>) => {
      return action.payload
    },
  },
})

export const { addCheckOutItem, removeCheckItem, incrementCheckOutItem, decrementCheckOutItem, updateCheckOutQuantity, clearCheckout, setCheckout } = checkOutSlice.actions

export default checkOutSlice.reducer
