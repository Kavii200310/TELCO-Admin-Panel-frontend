import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AuthLayout = ({ children, title, subtitle, footerLink }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Telco Admin</h1>
                    <p className="text-gray-500">e-SIM Management Portal</p>
                </div>

                {/* Auth Card */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                        {subtitle && (
                            <CardDescription className="text-center text-gray-600">
                                {subtitle}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent className="pb-6">
                        {children}
                    </CardContent>
                    {footerLink && (
                        <CardFooter className="flex justify-center border-t bg-gray-50/50 py-4">
                            <p className="text-sm text-gray-600 text-center">
                                {footerLink}
                            </p>
                        </CardFooter>
                    )}
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 Telco Admin. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
