"use client"

import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Plus, Trash2, Pencil, Check, LayoutGrid } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs as ShadTabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import MenuItemCard from "./MenuItemCard"
import MenuItemCardDefault from "./MenuCardDefault"
import { ApiResponse } from "@/utils/api"
import { deleteApi, getApi } from "@/utils/common"
import { MENUBUILDER_LISTS, REMOVE_ITEM, REMOVE_SECTION } from "@/utils/APIConstant"
import { IMenu } from "@/types/menu"

interface MenuSection {
  label: string
}

interface MenuItem {
  id: string
  section: string
  title: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
}

interface NewMenuItemInput {
  title: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
}

const MenuBuilderTabs = () => {
  const [sections, setSections] = useState<MenuSection[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [activeSection, setActiveSection] = useState("")

  const [editing, setEditing] = useState(false)
  const [addingSection, setAddingSection] = useState(false)
  const [sectionInput, setSectionInput] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getApi<ApiResponse<IMenu[]>>({
          url: MENUBUILDER_LISTS
        })

        if (res) {
          if (!res.success) return

          const mappedItems: MenuItem[] = res.data.map((item) => ({
            id: item._id.toString(),
            section: item.section,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            originalPrice: item.originalPrice,
            image: item.image,
          }))

          setItems(mappedItems)
        }
      } catch (err) {
        console.error("Failed to fetch menu", err)
        toast.error("Failed to load menu")
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  useEffect(() => {
    const uniqueSections = Array.from(
      new Set(items.map((i) => i.section))
    ).map((label) => ({ label }))

    setSections(uniqueSections)

    if (!activeSection && uniqueSections.length > 0) {
      setActiveSection(uniqueSections[0].label)
    }
  }, [items])

  const addSection = () => {
    if (!sectionInput.trim()) return
    setSections((p) => [...p, { label: sectionInput }])
    setActiveSection(sectionInput)
    setSectionInput("")
    setAddingSection(false)
  }

  const renameSection = () => {
    if (!sectionInput.trim()) return

    setSections((p) =>
      p.map((s) =>
        s.label === activeSection ? { label: sectionInput } : s
      )
    )

    setItems((p) =>
      p.map((i) =>
        i.section === activeSection
          ? { ...i, section: sectionInput }
          : i
      )
    )

    setActiveSection(sectionInput)
    setEditing(false)
  }

  const deleteSection = async () => {
    if (!activeSection) return

    try {
      toast.loading("Deleting section...", { id: "delete-section" })

      const res = await deleteApi<ApiResponse<IMenu>>({
        url: REMOVE_SECTION,
        param: { section: activeSection },
      })

      if (!res?.success) {
        throw new Error(res?.message)
      }

      setItems((p) => p.filter((i) => i.section !== activeSection))
      setSections((p) => p.filter((s) => s.label !== activeSection))

      const remaining = sections.filter(
        (s) => s.label !== activeSection
      )

      setActiveSection(remaining[0]?.label || "")

      toast.success("Section deleted", { id: "delete-section" })
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to delete section",
        { id: "delete-section" }
      )
    }
  }

  const addItem = (data: NewMenuItemInput) => {
    setItems((p) => [
      ...p,
      {
        id: uuidv4(),
        section: activeSection,
        ...data,
      },
    ])
  }

  const deleteItem = (id: string) => {
    setItems((p) => p.filter((i) => i.id !== id))
  }

  if (loading) {
    return (
      <Card className="h-[300px] flex items-center justify-center">
        Loading menu...
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      {/* LEFT – SECTIONS */}
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center gap-2">
          <LayoutGrid size={18} />
          <CardTitle className="text-base">Menu Sections</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ScrollArea className="h-[260px] pr-2">
            <ShadTabs
              value={activeSection}
              onValueChange={setActiveSection}
            >
              <TabsList className="flex flex-col items-stretch h-auto bg-transparent">
                {sections.map((s) => (
                  <TabsTrigger
                    key={s.label}
                    value={s.label}
                    className="justify-start"
                  >
                    {s.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ShadTabs>
          </ScrollArea>

          {addingSection ? (
            <div className="flex gap-2">
              <Input
                placeholder="Section name"
                value={sectionInput}
                onChange={(e) => setSectionInput(e.target.value)}
              />
              <Button size="icon" onClick={addSection}>
                <Check />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setAddingSection(true)}
            >
              <Plus size={16} className="mr-2" /> Add Section
            </Button>
          )}
        </CardContent>
      </Card>

      {/* RIGHT – ITEMS */}
      <div className="space-y-6">
        {!activeSection ? (
          <Card className="h-[300px] flex items-center justify-center text-muted-foreground">
            Select a section to begin
          </Card>
        ) : (
          <>
            <Card>
              <CardContent className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-6">
                <div>
                  {editing ? (
                    <Input
                      value={sectionInput}
                      onChange={(e) => setSectionInput(e.target.value)}
                      className="max-w-xs"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold">
                      {activeSection}
                    </h2>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Manage items in this section
                  </p>
                </div>

                <div className="flex gap-2">
                  {editing ? (
                    <Button size="icon" onClick={renameSection}>
                      <Check />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSectionInput(activeSection)
                        setEditing(true)
                      }}
                    >
                      <Pencil />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={deleteSection}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items
                .filter((i) => i.section === activeSection)
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    deleteCard={deleteItem}
                    quantity={item.quantity}
                  />
                ))}

              <MenuItemCardDefault
                section={activeSection}
                onDone={addItem}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MenuBuilderTabs
