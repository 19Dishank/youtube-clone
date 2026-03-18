import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ChannelNavbar = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const tabs = [
        'Home',
        'Playlists',
    ];

    return (
        <nav className="w-full border-b border-zinc-200 bg-white sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-12">

                    {/* Tabs */}
                    <div className="flex items-center h-full overflow-x-auto no-scrollbar gap-2 md:gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                relative h-full px-1 md:px-3 text-sm md:text-[15px] font-medium transition-colors whitespace-nowrap
                                ${activeTab === tab ? 'text-black' : 'text-zinc-600 hover:text-black'}`}
                            >
                                {tab}
                                {/* Active Link */}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                                )}
                            </button>
                        ))}

                        {/* Search */}
                        <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors ml-2">
                            <Search className="w-5 h-5 text-zinc-600" strokeWidth={2} />
                        </button>

                    </div>

                </div>
            </div>

            <style jsx>{`
                    .no-scrollbar::-webkit-scrollbar {
                    display: none;
                    }
                    .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    }
            `}</style>
        </nav>
    );
};

export default ChannelNavbar;