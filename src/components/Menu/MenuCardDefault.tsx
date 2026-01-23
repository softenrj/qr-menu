"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Check, ImagePlus } from "lucide-react"
import { useAppSelector } from "@/hook/redux"
import { ApiResponse } from "@/utils/api"
import { IMenu } from "@/model/menu"
import toast from "react-hot-toast"
import { useDropzone } from "react-dropzone"
import { postApi } from "@/utils/common"
import { ADD_MENU_ITEM } from "@/utils/APIConstant"

interface NewMenuItemInput {
  image: string
  title: string
  price: number
  originalPrice?: number
  quantity: number;
}

interface MenuCardDefaultProps {
  onDone: (data: NewMenuItemInput) => void
  section: string
}

const MenuCardDefault: React.FC<MenuCardDefaultProps> = ({ onDone, section }) => {
  const user = useAppSelector(state => state.merchant).merchant;

  const DEFAULT_IMAGE =
    "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768743883/images_qcf1fn.jpg"

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(DEFAULT_IMAGE)

  const [title, setTitle] = useState<string>("Name of your food")
  const [price, setPrice] = useState<number>(449)
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(699)
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<number>(0)

  const [editing, setEditing] = useState({
    title: false,
    price: false,
    originalPrice: false,
    quantity: false
  })

  const MAX_SIZE = 12 * 1024 * 1024

  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0]

      if (error.code === "file-too-large") {
        toast.error("Image must be smaller than 12MB")
      } else if (error.code === "file-invalid-type") {
        toast.error("Only image files are allowed")
      } else {
        toast.error("Invalid file")
      }
      return
    }

    const file = acceptedFiles[0]
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }


  const handleAddItem = async () => {
    if (!imageFile) {
      toast.error("Please select an image")
      return
    }

    try {
      toast.loading("Uploading menu item...", { id: "upload" })
      setUploading(true);

      const formData = new FormData()
      formData.append("image", imageFile)
      formData.append("title", title)
      formData.append("price", String(price))
      formData.append("originalPrice", String(originalPrice))
      formData.append("section", section)
      formData.append("quantity", String(quantity));

      const res = await postApi<ApiResponse<IMenu>>({
        url: ADD_MENU_ITEM,
        values: formData
      })

      setUploading(false);

      if (!res?.success) {
        throw new Error(res?.message || "Upload failed")
      }

      toast.success("Menu added successfully", { id: "upload" })
      onDone(res.data)
      reset()
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: "upload" })
    }
  }


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: MAX_SIZE,
  })

  const reset = () => {
    setImageFile(null)
    setImagePreview(DEFAULT_IMAGE)
    setTitle("Name of your food")
    setPrice(449)
    setOriginalPrice(699)
  }

  return (
    <div className="group relative m-5 w-56 md:w-72 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition">

      {/* IMAGE */}
      <div
        {...getRootProps()}
        className={`relative mx-3 mt-3 h-40 md:h-64 overflow-hidden rounded-xl cursor-pointer
    ${isDragActive ? "ring-2 ring-indigo-500" : ""}`}
      >
        <input {...getInputProps()} />

        <Image
          src={imagePreview}
          alt="Menu item"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium">
            <ImagePlus size={16} />
            {isDragActive ? "Drop image here" : "Upload image"}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 space-y-3">

        {editing.title ? (
          <input
            autoFocus
            defaultValue={title}
            onBlur={(e) => {
              setTitle(e.target.value || title)
              setEditing((p) => ({ ...p, title: false }))
            }}
            className="w-full rounded-md border px-2 py-1 text-sm font-semibold"
          />
        ) : (
          <h3
            onClick={() => setEditing((p) => ({ ...p, title: true }))}
            className="cursor-pointer text-sm font-semibold text-gray-900 hover:underline"
          >
            {title}
          </h3>
        )}

        {editing.quantity ? (
          <input
            autoFocus
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            onBlur={() => setEditing((p) => ({ ...p, quantity: false }))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditing((p) => ({ ...p, quantity: false }))
              }
            }}
            className="w-full rounded-md border px-2 py-1 text-sm font-semibold"
          />
        ) : (
          <p
            className="cursor-pointer text-xs text-gray-500"
            onClick={() => setEditing((p) => ({ ...p, quantity: true }))}
          >
            1 pc • {quantity} g
          </p>
        )}

        <div className="flex items-center gap-3">
          {editing.price ? (
            <input
              autoFocus
              type="number"
              defaultValue={price}
              onBlur={(e) => {
                setPrice(Number(e.target.value))
                setEditing((p) => ({ ...p, price: false }))
              }}
              className="w-20 rounded-md border px-2 py-1 text-sm font-bold"
            />
          ) : (
            <span
              onClick={() => setEditing((p) => ({ ...p, price: true }))}
              className="cursor-pointer text-lg font-bold text-gray-900"
            >
              ₹{price}
            </span>
          )}

          {originalPrice &&
            (editing.originalPrice ? (
              <input
                autoFocus
                type="number"
                defaultValue={originalPrice}
                onBlur={(e) => {
                  setOriginalPrice(Number(e.target.value))
                  setEditing((p) => ({ ...p, originalPrice: false }))
                }}
                className="w-20 rounded-md border px-2 py-1 text-xs"
              />
            ) : (
              <span
                onClick={() =>
                  setEditing((p) => ({ ...p, originalPrice: true }))
                }
                className="cursor-pointer text-xs text-gray-500 line-through"
              >
                ₹{originalPrice}
              </span>
            ))}
        </div>

        <button
          onClick={handleAddItem}
          disabled={uploading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-medium text-white shadow hover:shadow-lg hover:scale-[1.02] transition"
        >
          <Check size={16} /> Add item
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-indigo-500/30 transition" />
    </div>
  )
}

export default MenuCardDefault
