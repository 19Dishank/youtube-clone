import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center px-4 text-center">

            <div className="mb-8 flex flex-col items-center">
                <div className="relative">
                    <img
                        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
                        alt="YouTube Monkey"
                        className="w-40 h-40 object-contain mb-4"
                    />
                </div>
                <p className="text-gray-600 text-lg max-w-md">
                    This page isn't available. Sorry about that. <br />
                    Try searching for something else.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                    <Home size={18} />
                    Go to Home
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>


            <div className="mt-16 flex items-center gap-1 opacity-80">
                <div className="w-8 h-6 bg-red-600 rounded-md flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[7px] border-l-white border-b-4 border-b-transparent ml-0.5" />
                </div>
                <span className="font-bold text-xl tracking-tighter text-[#212121]">YouTube</span>
            </div>
        </div>
    );
};

export default NotFoundPage;