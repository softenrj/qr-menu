import React from 'react'
import MenuInterface from "@/components/MenuInterface"

async function page({params}: {params: Promise<{merchantId: string}>}) {
    const param = await params;
    const merchantId = param.merchantId;
  return (
    <MenuInterface merchantId={merchantId} />
  )
}

export default page