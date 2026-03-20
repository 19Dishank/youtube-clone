import { CgPlayList } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ playlist }) {
    const navigate = useNavigate()
    const handleClick = (id) => {
        if (id) {
            navigate(`playlists/${id}`);
        } else {
            console.warn("VideoCard ======> \n: videoId not found in video object", video);
        }
    }
    // console.log(playlist)
    return (
        // <div className="w-65 cursor-pointer" onClick={() => console.log(playlist)} >
        <div className="w-65 cursor-pointer" onClick={() => handleClick(playlist?.id)} >

            {/* Stack */}

            <div className="relative pt-3 group">
                <div className="absolute top-0.5 left-6 right-6 h-36.25 bg-[rgb(165,194,212)] rounded-2xl border border-white opacity-60"></div>
                <div className="absolute top-1.5 left-3 right-3 h-36.25 bg-[rgb(131,159,177)] rounded-xl border border-white"></div>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={playlist?.snippet?.thumbnails?.high?.url}
                        alt="playlist"
                        className="w-full h-36.25 object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-bold ">
                        <CgPlayList className="text-sm" />
                        {playlist?.videoCount || ""} videos
                    </div>

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            Play all
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-2">
                <h3 className="text-sm font-semibold leading-5 line-clamp-2">
                    {playlist?.snippet?.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                    View full playlist
                </p>
            </div>
        </div>
    );
}