import React, { useEffect, useState } from 'react';
import { formatNumber } from '../helper/helperfunctions';
import ChannelInfoModal from './ui/ChannelInfoModal';
import { JoinButton, SubscribeButton, VerifiedBadge } from './ui/Uicomponents';

const ChanelDetails = ({ data, isVerified }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bannerUrl = "https://yt3.googleusercontent.com/kemZJqQd_ZA3UUzyk5SaISkeWdY1zwcDTq0y2NQLBQEl6iHNWcJy3K-EMg2gE9W7bGNuIb9ahqI=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";
    useEffect(() => {
        document.title = `${data?.info?.snippet?.title || ` `}  - YouTube` || "YouTube Profile"
    }, [data])
    return (
        <div className="max-w-7xl mx-auto px-4 py-4 font-sans">
            {/* Banner */}
            <div
                className="w-full h-35 sm:h-45 md:h-55 rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat mb-6"
                style={{ backgroundImage: `url(${bannerUrl})` }}
            />

            {/* Content */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">

                {/*Profile */}
                <div className="relative shrink-0 flex justify-center md:block">
                    <img
                        src={data?.info?.snippet?.thumbnails?.medium?.url}
                        alt={data?.info?.snippet?.title}
                        className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-sm -mt-12 mx-auto md:mx-0 md:mt-0"
                    />
                </div>

                {/* Container */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl md:text-4xl font-bold text-black tracking-tight">
                            {data?.info?.snippet?.title}
                        </h1>
                        {isVerified && <VerifiedBadge />}
                    </div>


                    <div className="text-zinc-600 text-[14px] md:text-[15px] mt-1 font-normal">
                        <span className='text-slate-950 font-semibold'>{data?.info?.snippet?.customUrl} </span>
                        <span className="mx-1">·</span>
                        <span>{formatNumber(data?.info?.statistics?.subscriberCount)} subscribers</span>
                        <span className="mx-1">·</span>
                        <span>{formatNumber(data?.info?.statistics?.videoCount)} videos</span>
                    </div>

                    {/*desc with model popup */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 mt-1 text-[14px]">
                        <span className="text-slate-600 truncate max-w-50 md:max-w-65">
                            {data?.info?.snippet?.description}
                        </span>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-zinc-600 font-bold cursor-pointer hover:underline transition-all"
                        >
                            ...more
                        </button>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <SubscribeButton />
                        <JoinButton />
                    </div>
                </div>
            </div>
            {/* popup model */}
            <ChannelInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={data}
            />
        </div>
    );
};

export default ChanelDetails;