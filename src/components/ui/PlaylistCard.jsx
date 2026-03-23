import { useContext } from "react";
import { CgPlayList } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ playlist }) {

    const navigate = useNavigate()
    const handleClick = (id) => {
        if (id) {
            navigate(`/playlists/${id}`);
        } else {
            console.warn("VideoCard ======> \n: videoId not found in video object", video);
        }
    }
    // console.log(playlist)
    return (
        <div className="w-full cursor-pointer group" onClick={() => handleClick(playlist?.id)}>
            {/* Stack  */}
            <div className="relative pt-3">

                <div className="absolute top-0.5 left-[8%] right-[8%] aspect-video bg-[rgb(165,194,212)] rounded-2xl border border-white opacity-60"></div>
                <div className="absolute top-1.5 left-[4%] right-[4%] aspect-video bg-[rgb(131,159,177)] rounded-xl border border-white"></div>

                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200">
                    <img
                        src={playlist?.snippet?.thumbnails?.high?.url}
                        alt="playlist"
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-1 rounded flex items-center gap-1 font-bold">
                        <CgPlayList className="text-sm" />
                        {playlist?.videoCount || "0"} videos
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">Play all</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-3 px-1">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {playlist?.snippet?.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                    View full playlist
                </p>
            </div>
        </div>
    );
}