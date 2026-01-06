import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Smartphone, History, Settings, LogOut, ShieldCheck } from 'lucide-react';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // TODO: Add actual logout logic (clear tokens, session, etc.)
        navigate('/login');
    };

    const navItems = [
        { label: 'Overview', icon: LayoutGrid, path: '/admin' },
        { label: 'Number Inventory', icon: Smartphone, path: '/admin/inventory' },
        { label: 'Order History', icon: History, path: '/admin/orders' },
    ];

    return (
        <aside className="hidden border-r bg-white md:flex w-[280px] min-h-screen flex-col">
            <div className="flex h-[60px] items-center px-6 border-b">
                <a href="/admin" className="flex items-center gap-2 font-semibold">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                        </svg>
                    </div>
                    <span className="font-semibold text-lg">Telco Admin</span>
                </a>
            </div>

            <div className="flex-1 py-6 px-4">
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
                                }`
                            }
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t">
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/admin/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                            }`
                        }
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default AdminSidebar;
