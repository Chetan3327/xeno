import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"

function Navbar() {
  return (
    <header className="fixed w-full flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-black">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-bold">
        MyLogo
      </Link>

      {/* Center: Navigation Menu */}
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-48 p-2 space-y-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/feature1" className="block px-2 py-1 hover:underline">
                      Feature 1
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/feature2" className="block px-2 py-1 hover:underline">
                      Feature 2
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}

      {/* Right: Sign In & Avatar */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        <Button variant="outline" asChild>
          <Link to="/login">Sign In</Link>
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Navbar