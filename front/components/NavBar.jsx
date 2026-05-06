"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, Star, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/users", label: "Users", icon: Users },
  { href: "/favorites", label: "Favorites", icon: Star },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
      <nav className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/events" className="flex items-center gap-2 group">
              <div className="flex items-center gap-1 transition-transform hover:scale-105">
                <span className="text-xl font-bold text-foreground tracking-tight">
                  Event
                </span>
                <span className="text-xl font-bold text-secondary tracking-tight">
                  Sync
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary ml-1 animate-pulse" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-foreground bg-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-foreground bg-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
