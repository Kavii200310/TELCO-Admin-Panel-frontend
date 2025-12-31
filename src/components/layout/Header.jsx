import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // TODO: Add actual logout logic
        navigate('/login');
    };

    return (
        // Added justify-between to push Search (left) and Profile (right) apart
        <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6 lg:px-8">

            {/* Left Section: Mobile Menu & Search */}
            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Mobile Menu Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0 md:hidden -ml-2">
                            <Menu className="h-6 w-6 text-gray-600" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <Sidebar />
                    </SheetContent>
                </Sheet>

                {/* Global Search - Matches Screenshot style */}
                <div className="hidden md:block relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Global Search..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Right Section: Notification & Profile */}
            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 rounded-full">
                    <Bell className="h-5 w-5" />
                    {/* Red Dot Indicator */}
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-2 border-l border-gray-100">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-semibold text-gray-900 leading-none">Admin User</p>
                        <p className="text-xs text-gray-500 mt-1">Super Admin</p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-blue-100 hover:bg-blue-200 border border-blue-200">
                                <span className="text-sm font-bold text-blue-700">AD</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer" onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}