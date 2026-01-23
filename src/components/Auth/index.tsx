"use client"
import React from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import SignIn from "./SignIn"
import Singup from "./Singup"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ApiResponse } from "@/utils/api"
import { useAppDispatch } from "@/hook/redux"
import { setMerchant } from "@/store/reducer/merchant"
import { getApi } from "@/utils/common"
import { SESSION } from "@/utils/APIConstant"
import { IROLE } from "@/types/role"
import { IMerchants } from "@/types/merchant"

function AuthDialog({
  open,
  onClose,
  redirect = true,
  role = IROLE.MERCHANT
}: {
  open: boolean
  onClose: () => void
  redirect: boolean
  role: IROLE
}) {
  const [panel, setPanel] = React.useState(false)
  const [checking, setChecking] = React.useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch();

  const handleChange = () => setPanel((p) => !p)

  React.useEffect(() => {
    if (!open) return

    const checkSession = async () => {
      setChecking(true)

      try {
        const res = await getApi<ApiResponse<IMerchants>>({
          url: SESSION
        })

        if (res?.success) {
          console.log(res.data)
          toast.success(`Welcome back ${res.data.name} 👋`)
          dispatch(setMerchant(res.data))
          onClose()
          redirect && router.replace("/service")
        }
      } catch {
        // silent fail
      } finally {
        setChecking(false)
      }
    }

    checkSession()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-[#F8F5F0] px-6 py-8">
        {checking ? (
          <p className="text-center text-sm text-zinc-500">
            Checking session...
          </p>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-zinc-900">
                {role === IROLE.MERCHANT ? `${open ? "Create your merchant" : "Login"} account` : `${open ? "Create your" : "Login"} account`}
              </h2>
            </div>

            {panel ? (
              <SignIn role={role} onChange={handleChange} />
            ) : (
              <Singup role={role} onChange={handleChange} />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
