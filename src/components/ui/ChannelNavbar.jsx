import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ChannelNavbar = ({ tabs }) => {

    const [isHidden, setIsHidden] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav className="w-full border-b border-zinc-200 bg-white sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-12">

                    <div className="flex items-center h-full overflow-x-auto no-scrollbar gap-2 md:gap-6">
                        {tabs.map((tab) => {

                            const isActive =
                                location.pathname === tab.path ||
                                (location.pathname === '/' && tab.path === '/')

                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => navigate(tab.path)}
                                    className={`relative h-full px-1 md:px-3 text-sm md:text-[15px] font-medium transition-colors whitespace-nowrap
                                    ${isActive ? 'text-black' : 'text-zinc-600 hover:text-black'}`}
                                >
                                    {tab.name}

                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                                    )}
                                </button>
                            )
                        })}

                        <button
                            className="p-2 hover:bg-zinc-100 rounded-full transition-colors ml-2"
                            onClick={() => setIsHidden(!isHidden)}
                        >
                            <Search className="w-5 h-5 text-zinc-600" strokeWidth={2} />
                        </button>

                        <input
                            type="text"
                            placeholder="Search"
                            className={`border-b-2 px-4 py-1 ml-2 transition-opacity duration-100 ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}

                        />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default ChannelNavbar