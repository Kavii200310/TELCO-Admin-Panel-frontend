import React from 'react';
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">

            {/* Sidebar Area */}
            <div className="hidden border-r border-gray-100 bg-white md:block sticky top-0 h-screen z-30">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col h-screen overflow-hidden bg-gray-50/50">

                {/* Reusable Header */}
                <Header />

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}