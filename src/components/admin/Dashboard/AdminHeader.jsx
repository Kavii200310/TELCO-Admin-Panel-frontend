import React from 'react';
import { Search, Bell } from 'lucide-react';

const AdminHeader = () => {
    return (
        <header className="flex h-[60px] items-center gap-4 bg-white px-6 border-b">
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="search"
                            placeholder="Global Search..."
                            className="w-full bg-gray-50 appearance-none rounded-lg pl-8 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-2 pl-4 border-l">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-gray-900">Admin User</span>
                        <span className="text-xs text-gray-500">Super Admin</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                        AD
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
