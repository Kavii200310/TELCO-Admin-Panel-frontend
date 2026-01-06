import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Smartphone, Clock, Settings, LogOut } from "lucide-react";

// Only "Operational" items here. Settings is moved to the bottom.
const mainNavItems = [
    { icon: LayoutGrid, label: "Overview", href: "/admin" },
    { icon: Smartphone, label: "Number Inventory", href: "/admin/inventory" }, // Changed icon to Smartphone
    { icon: Clock, label: "Order History", href: "/admin/orders" }, // Changed icon to Clock/History
];

export function Sidebar({ className }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // TODO: Add actual logout logic
        navigate('/login');
    };

    // Helper to determine active state classes
    const getNavClass = (href) => {
        const isActive = location.pathname === href;
        return cn(
            "w-full justify-start transition-colors mb-1",
            isActive
                ? "bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 hover:text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        );
    };

    return (
        <div className={cn("pb-12 flex flex-col h-full border-r border-gray-100 bg-white", className)}>
            <div className="space-y-4 py-4 flex-1">
                <div className="px-4 py-2">
                    {/* Logo Section */}
                    <h2 className="mb-8 text-xl font-bold tracking-tight flex items-center">
                        <span className="text-blue-600">TELECOM</span>
                        <span className="text-gray-900">ADMIN</span>
                    </h2>

                    {/* Main Navigation */}
                    <nav className="space-y-1">
                        {mainNavItems.map((item) => (
                            <Button
                                key={item.href}
                                variant="ghost" // We override styles via className
                                className={getNavClass(item.href)}
                                asChild
                            >
                                <Link to={item.href}>
                                    <item.icon className={cn("mr-3 h-5 w-5", location.pathname === item.href ? "text-blue-600" : "text-gray-400")} />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Bottom Section: Settings & Logout */}
            <div className="px-4 py-4 mt-auto border-t border-gray-100 space-y-1">
                <Button
                    variant="ghost"
                    className={getNavClass("/admin/settings")}
                    asChild
                >
                    <Link to="/admin/settings">
                        <Settings className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                    </Link>
                </Button>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );
}