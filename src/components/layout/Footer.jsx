import React from 'react'

export function Footer() {
    return (
        <div>
            <footer className="bg-white border-t border-gray-100 mt-auto">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap justify-center gap-6 mb-2">
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact Us</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms & Conditions</a>
                    </div>
                    <p className="text-center text-gray-500 text-xs">
                        © 2025 Telco SL. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
