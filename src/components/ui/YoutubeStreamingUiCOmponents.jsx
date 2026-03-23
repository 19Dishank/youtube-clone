import { useContext, useEffect, useState } from "react";
import { formatNumber, formatYtDuration, timeAgo } from "../../helper/helperfunctions";
import { CommentContext } from "../../context/CommentsContext";
import { VideoByIdContext } from "../../context/VideoById";
import { useNavigate } from "react-router-dom";
import { RecommendedVideoContext } from "../../context/RecomendedVideoContext";
import { X, Repeat, Shuffle, MoreVertical, Play } from 'lucide-react';

export const Icons = {
    Back: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    More: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>,
    ThumbsUp: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>,
    ThumbsDown: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>,
    Share: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
    Save: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>,
    Clip: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>,
    Repeat: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
        </svg>
    ),
    Shuffle: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4h5l7 16h4M4 20h5l2.5-6M15.5 10L20 4h-4" />
        </svg>
    ),
};

const COMMENTS = [
    { id: 1, user: "AliceWebDev", text: "This layout tutorial is exactly what I was looking for. The responsive grid explanation made it click for me!", time: "2 hours ago", likes: 45 },
    { id: 2, user: "JohnDoe99", text: "Could you make a follow-up video adding animations with Framer Motion?", time: "5 hours ago", likes: 12 },
    { id: 3, user: "DesignGuru", text: "Love the light mode palette you chose here. Very easy on the eyes.", time: "1 day ago", likes: 108 },
];

// components
export const Header = ({ navigate }) => (
    <header className="flex items-center px-4 h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-800"
            onClick={() => navigate(-1)}
        >
            <Icons.Back />
        </button>
    </header>
);

export const VideoPlayer = ({ url }) => {
    const { video } = useContext(VideoByIdContext)
    return (
        <div className="w-full">

            {/* Player */}
            <div className="w-full aspect-video bg-black sm:rounded-xl overflow-hidden relative group shadow-sm">
                <iframe
                    className="w-full h-full"
                    src={url}
                    title={video?.video.items?.snippet?.title || ""}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-3 px-3 sm:px-0 md:px-0 lg:px-0 text-gray-900 leading-snug">
                {video?.video.items?.snippet?.title || "Loading..."}
            </h1>

        </div>
    );
}

export const Comments = ({ details }) => {
    const [isHidden, setIsHidden] = useState(true)
    const { comments } = useContext(CommentContext)
    // console.log(comments)
    return (
        <div className="mt-6 text-gray-900">
            <h3 className="text-xl font-bold mb-4">{details?.items.statistics.commentCount || 0} Comments</h3>
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-600 shrink-0 flex items-center justify-center font-bold text-white">U</div>
                <div className="grow">
                    <input
                        onFocus={() => setIsHidden(false)}
                        onBlur={() => setIsHidden(true)}
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 outline-none pb-1 transition-colors text-gray-800"
                    />
                    {isHidden ||
                        <div className="flex justify-end gap-2 mt-2">
                            <button className="px-4 py-2 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors text-gray-600">Cancel</button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-full text-sm font-medium cursor-not-allowed">Comment</button>
                        </div>}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {comments?.length > 0 ? comments?.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 shrink-0 flex items-center justify-center font-bold text-sm text-blue-600 border border-blue-200">

                            <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="Profile" className="w-full h-full object-cover rounded-full text-[10px]" />


                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-[13px]">{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
                                <span className="text-gray-500 text-xs">{timeAgo(comment.snippet.topLevelComment.snippet.publishedAt)}</span>
                            </div>
                            <p className="text-sm mb-2 text-gray-800">{comment.snippet.topLevelComment.snippet.textOriginal}</p>
                            <div className="flex items-center gap-4 text-gray-500">
                                <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                                    <Icons.ThumbsUp /> <span className="text-xs">{comment.snippet.topLevelComment.snippet.likeCount}</span>
                                </button>
                                <button className="hover:text-gray-900 transition-colors">
                                    <Icons.ThumbsDown />
                                </button>
                                <button className="text-xs font-semibold hover:text-gray-900 transition-colors">Reply</button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    )
};

export const AdBanner = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl my-4 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
        <div className="flex items-center gap-4 mb-3 sm:mb-0">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                A
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">Acme Corp Cloud Hosting</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-1.5 py-0.5 border border-gray-300 rounded-md font-bold text-[10px] tracking-wide text-gray-700">SPONSORED</span>
                    <span>Deploy faster today.</span>
                </div>
            </div>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors">
            Sign Up
        </button>
    </div>
);

export const ActionButtons = ({ details }) => (
    <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
        <div className="flex bg-gray-100 rounded-full border border-gray-200">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-l-full transition-colors border-r border-gray-300 font-medium text-gray-800">
                <Icons.ThumbsUp /> <span>{details?.items.statistics.likeCount}</span>
            </button>
            <button className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-r-full transition-colors text-gray-800">
                <Icons.ThumbsDown />
            </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors font-medium text-gray-800">
            <Icons.Share /> <span className="hidden sm:inline">Share</span>
        </button>
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors font-medium text-gray-800">
            <Icons.Clip /> <span className="hidden lg:inline">Clip</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors font-medium hidden sm:flex text-gray-800">
            <Icons.Save /> <span>Save</span>
        </button>
        <button className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full transition-colors text-gray-800">
            <Icons.More />
        </button> */}
    </div>
);

export const Description = ({ details }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div
            className="bg-gray-100 rounded-xl p-4 mt-4  hover:bg-gray-200/70 transition-colors text-gray-800"

        >
            <div className="font-semibold mb-2 text-gray-900 text-sm">
                {formatNumber(details?.items?.statistics?.viewCount)} views
                &nbsp;•&nbsp;
                {timeAgo(details?.items?.snippet?.publishedAt)}
            </div>
            <p className={`text-sm leading-relaxed whitespace-pre-wrap ${expanded ? "" : "line-clamp-1"}`} >
                {details?.items?.snippet?.description}
            </p>
            <div
                className="w-fit cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                {!expanded && (
                    <span className="ml-1 font-semibold text-gray-900">
                        ...more
                    </span>
                )}
                {expanded && (
                    <span className="block mt-2 text-sm font-semibold text-gray-900">
                        Show less
                    </span>
                )}
            </div>

        </div>
    );
};

export const RecommendedSidebar = ({ recommendedVideos, videoId }) => {
    const { setVideoIdFromComp } = useContext(RecommendedVideoContext);

    useEffect(() => {
        if (videoId) {
            setVideoIdFromComp(videoId);
        }
    }, [videoId]);

    const navigate = useNavigate()
    const handleClick = (id) => {
        if (id) {
            navigate(`/watch/${id}`);
        } else {
            console.warn("Recommended sideBar  ====> \n: videoId not found in video object", recommendedVideos);
        }
    }
    return (
        <div className="flex flex-col gap-3">
            {recommendedVideos?.map(video => (
                <div key={video?.items?.id} className="flex gap-2 group cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded-xl transition-colors"
                    onClick={() => handleClick(video?.items?.id)}
                >
                    <div className="relative w-40 shrink-0 rounded-lg overflow-hidden aspect-video shadow-sm">
                        <img src={video?.items?.snippet?.thumbnails?.high?.url}
                            alt={video?.items?.snippet?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                            {formatYtDuration(video?.items?.contentDetails?.duration)}
                        </span>
                    </div>
                    <div className="grow pr-4">
                        <h4 className="text-sm font-semibold line-clamp-2 leading-tight mb-1 text-gray-900  transition-colors">
                            {video?.items?.snippet?.title}
                        </h4>
                        <p className="text-xs text-gray-500">{video?.items?.snippet?.channelTitle}</p>
                        <p className="text-xs text-gray-500">{formatNumber(video?.items?.statistics?.viewCount)} • {timeAgo(video?.items?.snippet?.publishedAt)}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1 h-fit hover:bg-gray-200 rounded-full transition-all text-gray-600">
                        <Icons.More />
                    </button>
                </div>
            ))}
        </div>

    )
};


export const videos = [
    {
        id: 'v1',
        title: 'Lets build a SAAS starter template with Clerk and NextJS',
        channelName: 'Hitesh Choudhary',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
        duration: '11:36'
    },
    {
        id: 'v2',
        title: 'Event Driven Architecture | A guide on Clerk Webhooks',
        channelName: 'Hitesh Choudhary',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
        duration: '12:38'
    },
    // ... more videos
];
export const PlaylistSidebar = ({ playlistTitle, author, videos, currentVideoId }) => {
    return (
        <div className="w-full max-w-[400px] border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col h-[500px]">
            {/* Header Section */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                    <div className="pr-4">
                        <h2 className="font-bold text-lg leading-tight line-clamp-1">
                            {playlistTitle}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {author} - <span className="text-xs font-medium">1/8</span>
                        </p>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Playlist Controls */}
                <div className="flex items-center gap-4 mt-2">
                    <button className="text-gray-600 hover:text-black transition-colors">
                        <Repeat size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-black transition-colors">
                        <Shuffle size={18} />
                    </button>
                    <div className="ml-auto">
                        <button className="p-1 hover:bg-gray-200 rounded-full">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Video List Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {videos.map((video, index) => {
                    const isActive = video.id === currentVideoId;
                    return (
                        <div
                            key={video.id}
                            className={`flex gap-3 p-2 cursor-pointer transition-colors ${isActive ? 'bg-blue-50/80 hover:bg-blue-100/80' : 'hover:bg-gray-100'
                                }`}
                        >
                            {/* Index or Play Icon */}
                            <div className="w-4 flex items-center justify-center shrink-0">
                                {isActive ? (
                                    <Play size={10} fill="black" className="ml-1" />
                                ) : (
                                    <span className="text-[11px] text-gray-500">{index + 1}</span>
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div className="relative w-24 h-14 shrink-0">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-start">
                                <h4 className={`text-sm font-semibold line-clamp-2 leading-snug ${isActive ? 'text-black' : 'text-gray-900'
                                    }`}>
                                    {video.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 mt-1">{video.channelName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

