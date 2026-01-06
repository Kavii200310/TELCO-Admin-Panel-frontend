import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ title, value, icon: Icon, bgIconColor, iconColor }) => {
    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={`p-3 rounded-full ${bgIconColor || 'bg-gray-100'} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor || 'text-gray-600'}`} />
                </div>
            </CardContent>
        </Card>
    );
};

export default StatCard;