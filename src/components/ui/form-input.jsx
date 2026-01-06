import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const FormInput = ({ 
    id, 
    label, 
    type = "text", 
    placeholder, 
    icon: Icon, 
    className,
    ...props 
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={cn("space-y-2", className)}>
            {label && <Label htmlFor={id} className="text-gray-700 font-medium">{label}</Label>}
            
            <div className="relative">
                {/* Left Icon (if provided) */}
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <Icon className="h-5 w-5" />
                    </div>
                )}

                <Input
                    id={id}
                    type={inputType}
                    placeholder={placeholder}
                    className={cn(
                        "bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all",
                        Icon ? "pl-10" : "pl-3", // Add padding if icon exists
                        isPassword ? "pr-10" : "pr-3" // Add padding for eye toggle
                    )}
                    {...props}
                />

                {/* Password Toggle Button */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormInput;