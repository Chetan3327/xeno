import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserContext } from "@/providers/user-context"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Logout from "./auth/logout"
import { ModeToggle } from "./mode-toggle"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu"

function Navbar() {
  const {user, logout} = useContext(UserContext);
  console.log("user", user)
  
  return (
    <header className="fixed w-full flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-black">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-bold">
        <img src="https://cdn.prod.website-files.com/620353a026ae70e21288308a/6536204e44d00a50cb63e6a4_Vector.svg" alt="logo" />
      </Link>

      {/* Center: Navigation Menu */}
      {user && (<NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/create-campaign">Create Campaign</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/campaigns">Campaigns</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>)}

      {/* Right: Sign In & Avatar */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        {user ? (
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={user?.picture} alt="User Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Logout />
          </div>
        ) : (
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

export default Navbar