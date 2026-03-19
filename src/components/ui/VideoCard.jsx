import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { formatNumber, formatYtDuration, timeAgo } from '../../helper/helperfunctions'

const VideoCard = ({ video }) => {
    return (
        <div className="w-80 cursor-pointer">

            <div className="relative rounded-xl overflow-hidden group">
                <img
                    src={video?.items?.snippet?.thumbnails?.high?.url}
                    alt="video"
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* time */}
                <span className="absolute bottom-2 right-2 font-semibold bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                    {formatYtDuration(video?.items?.contentDetails?.duration)}
                </span>
            </div>


            <div className="flex justify-between mt-2">
                <div>
                    <h3 className="text-sm font-semibold line-clamp-2">
                        {video?.items?.snippet?.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {formatNumber(video?.items?.statistics?.viewCount)} views • {timeAgo(video?.items?.snippet?.publishedAt)}
                    </p>
                </div>

                <HiOutlineDotsVertical className="text-xl text-gray-600" />
            </div>
        </div>
    )
}

export default VideoCard