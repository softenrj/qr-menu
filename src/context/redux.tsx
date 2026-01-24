"use client"

import { IMerchants } from "@/model/merchants";
import { clearMerchant, setMerchant } from "@/store/reducer/merchant";
import { store } from "@/store/store";
import { ApiResponse } from "@/utils/api";
import { SESSION } from "@/utils/APIConstant";
import { getApi } from "@/utils/common";
import React from "react"
import { Provider } from "react-redux";

export const ReduxProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    React.useEffect(() => {
    const hydrate = async () => {
      try {
        const res = await getApi<ApiResponse<IMerchants>>({
          url: SESSION
        })

        if (!res?.success) {
          store.dispatch(clearMerchant())
          return
        }
        store.dispatch(setMerchant(res?.data as any))
      } catch {
        store.dispatch(clearMerchant())
      }
    }
      hydrate()
    },[])

    return (
        <Provider store={store}>{children}</Provider>
    )
}