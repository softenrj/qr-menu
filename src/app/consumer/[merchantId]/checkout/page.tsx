import React from 'react'
import CheckOut from "@/components/Checkout"

async function page({ params }: { params: Promise<{ merchantId: string }>}) {
  const param = await params;
  const merchantId = param.merchantId;
  return (
    <CheckOut merchantId={merchantId} />
  )
}

export default page