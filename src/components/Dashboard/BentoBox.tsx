"use client"

import { useMemo, useState } from "react"
import { utils, SlotItemMapArray } from "swapy"
import {
    SwapyItem,
    SwapyLayout,
    SwapySlot,
} from "@/components/ui/swapy"

import {
    ShoppingBag,
    IndianRupee,
    Users,
    Utensils,
    TrendingUp,
} from "lucide-react"


function GlassCard({
    children,
    gradient,
}: {
    children: React.ReactNode
    gradient: string
}) {
    return (
        <div
            className={`
        relative h-full w-full rounded-2xl p-6 text-white
        shadow-xl overflow-hidden
        ${gradient}
      `}
        >
            {/* glow */}
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition" />
            {children}
        </div>
    )
}

function OrdersCard() {
    return (
        <GlassCard gradient="bg-gradient-to-br from-indigo-600 to-indigo-500">
            <Header title="Orders" icon={<ShoppingBag />} />
            <Metric value="1,284" trend="+12% this week" />
        </GlassCard>
    )
}

function RevenueCard() {
    return (
        <GlassCard gradient="bg-gradient-to-br from-emerald-600 to-emerald-500">
            <Header title="Revenue" icon={<IndianRupee />} />
            <Metric value="₹82,450" trend="+18% this month" accent="yellow" />
        </GlassCard>
    )
}

function VisitorsCard() {
    return (
        <GlassCard gradient="bg-gradient-to-br from-sky-600 to-sky-500">
            <Header title="Visitors" icon={<Users />} />
            <Metric value="6,912" trend="QR scans" />
        </GlassCard>
    )
}

function MostOrderedCard() {
    return (
        <GlassCard gradient="bg-gradient-to-br from-purple-600 to-purple-500">
            <Header title="Most Ordered" icon={<Utensils />} />
            <div>
                <h2 className="text-2xl font-bold">Paneer Tikka</h2>
                <p className="mt-1 text-yellow-200 text-sm flex items-center gap-1">
                    <TrendingUp size={14} /> 312 orders
                </p>
            </div>
        </GlassCard>
    )
}

function Header({
    title,
    icon,
}: {
    title: string
    icon: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
        </div>
    )
}

function Metric({
    value,
    trend,
    accent = "green",
}: {
    value: string
    trend: string
    accent?: "green" | "yellow"
}) {
    return (
        <div>
            <h2 className="text-4xl font-extrabold tracking-tight">{value}</h2>
            <p
                className={`mt-1 text-sm ${accent === "yellow" ? "text-yellow-200" : "text-green-300"
                    }`}
            >
                {trend}
            </p>
        </div>
    )
}

type Item = {
    id: string
    widgets: React.ReactNode
}

const initialItems: Item[] = [
    { id: "orders", widgets: <OrdersCard /> },
    { id: "revenue", widgets: <RevenueCard /> },
    { id: "visitors", widgets: <VisitorsCard /> },
    { id: "most", widgets: <MostOrderedCard /> },
]

export default function BentoBox() {
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        utils.initSlotItemMap(initialItems, "id")
    )

    const slottedItems = useMemo(
        () => utils.toSlottedItems(initialItems, "id", slotItemMap),
        [slotItemMap]
    )

    return (
        <div className="w-full">
            <SwapyLayout
                id="dashboard"
                className="w-full"
                config={{ swapMode: "hover" }}
            >
                <div className="grid w-full grid-cols-12 gap-4 md:gap-6">
                    {slottedItems.map(({ slotId, itemId }) => {
                        const item = initialItems.find((i) => i.id === itemId)

                        return (
                            <SwapySlot
                                key={slotId}
                                id={slotId}
                                className="col-span-6 md:col-span-6 xl:col-span-3 h-48">
                                <SwapyItem
                                    id={itemId}
                                    className="w-full h-full cursor-grab active:cursor-grabbing"
                                >
                                    {item?.widgets}
                                </SwapyItem>
                            </SwapySlot>
                        )
                    })}
                </div>
            </SwapyLayout>
        </div>
    )
}
