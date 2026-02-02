"use client"
import { useAppDispatch } from '@/hook/redux';
import { setMerchant } from '@/store/reducer/merchant';
import { ApiResponse } from '@/utils/api';
import { MERCHANT_SIGNIN } from '@/utils/APIConstant';
import { postApi } from '@/utils/common';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { IMerchants } from '@/types/merchant';
import { IROLE } from '@/types/role';

function Singup({ onChange, role= IROLE.MERCHANT }: { onChange: () => void, role: IROLE }) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const res = await postApi<ApiResponse<IMerchants>>({
            url: MERCHANT_SIGNIN,
            values: {
                email: formData.get("email"),
                password: formData.get("password") || "",
            } as any
        })

        if (res) {
            if (!res.success) {
                toast.error(res.message || "Signin failed")
                return
            }
            dispatch(setMerchant(res.data))
            toast.success(` Welcome ${res.data.name} 🎉`)

            if (role === IROLE.MERCHANT) {
                router.replace("/service")
            }
        }
}
return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                Email address *
            </label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="you@restaurant.com"
                required
                className="h-11 rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
        </div>

        <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                Password *
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                className="h-11 rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
        </div>

        <button
            type="submit"
            className="mt-6 h-12 w-full rounded-lg bg-orange-600 text-sm font-semibold text-white shadow-md transition hover:bg-orange-500 active:scale-[0.98]"
        >
            Log {role === IROLE.MERCHANT && "Merchant"} Account
        </button>

        <p className="text-center text-xs text-zinc-500">
            create an account?{" "}
            <span onClick={onChange} className="cursor-pointer font-medium text-orange-600 hover:underline">
                Sign up
            </span>
        </p>
    </form>
)
}

export default Singup
