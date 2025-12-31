import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LayoutGrid } from 'lucide-react'; // Using as the logo icon

const AuthLayout = ({ title, subtitle, children, footerLink }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <Card className="w-full max-w-[450px] shadow-xl border-gray-100 bg-white rounded-2xl overflow-hidden">
                <CardHeader className="space-y-3 text-center pt-10 pb-6">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-2">
                        <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
                            <LayoutGrid className="h-7 w-7" />
                        </div>
                    </div>
                    {/* Headers */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                </CardHeader>

                <CardContent className="px-8 pb-10">
                    {children}

                    {/* Footer Section */}
                    {footerLink && (
                        <div className="mt-8 pt-6 border-t border-gray-50 text-center text-sm text-gray-500">
                            {footerLink}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthLayout;