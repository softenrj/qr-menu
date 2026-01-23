import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBar from "@/components/SideBar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div
        className="flex min-h-screen w-full"
        style={{ paddingTop: "var(--navbar-height)" }}
      >
        <SideBar />

        <main className="flex-1 overflow-y-auto w-full">
          <div className="p-4 w-full">
            <SidebarTrigger />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
