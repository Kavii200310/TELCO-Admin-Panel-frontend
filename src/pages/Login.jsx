import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import AuthLayout from '@/components/auth/AuthLayout';
import FormInput from '@/components/ui/form-input';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting login...");
        // TODO: Add actual authentication logic here
        // For now, just navigate to admin dashboard
        navigate('/admin');
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Please enter your details to sign in."
            footerLink={
                <>
                    Don't have an account?{' '}
                    <Button variant="link" className="px-1 text-blue-600 font-semibold h-auto hover:text-blue-700">
                        Contact Support
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email Field with Icon */}
                <FormInput
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="admin@telecom.com"
                    icon={Mail}
                />

                {/* Password Field with Icon + Toggle */}
                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                />

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" className="border-gray-300 text-blue-600 focus:ring-blue-500 rounded" />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-normal text-gray-600 cursor-pointer select-none"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Button variant="link" className="px-0 font-semibold text-blue-600 h-auto text-sm hover:text-blue-700">
                        Forgot password?
                    </Button>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Sign in
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </form>
        </AuthLayout>
    );
};

export default Login;