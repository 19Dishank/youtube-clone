import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PlayListVideoByIdContext, PlayListVideoByIdContextProvider } from '../context/PlayListVideoByIdContext'
import { Header, Comments, Icons, RecommendedSidebar } from './ui/YoutubeStreamingUiCOmponents'
import { CommentContextProvider } from '../context/CommentsContext'
import { StreamingSkeleton } from './Skeletons'
import { formatNumber, timeAgo } from '../helper/helperfunctions'
import { fetchVideoById } from '../services/GetVideoById'
import { Play, Repeat, Shuffle } from 'lucide-react'
import { IoPlay } from 'react-icons/io5'
import { RecommendedVideoContext } from '../context/RecomendedVideoContext'
import { SubscribeButton } from './ui/Uicomponents'

const PlaylistStreamContent = () => {
    const { playlistVideo, loading } = useContext(PlayListVideoByIdContext)
    const [selectedVideoId, setSelectedVideoId] = useState(null)
    const [currentVideoDetails, setCurrentVideoDetails] = useState([])
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const navigate = useNavigate()
    const { channel } = playlistVideo || {}
    const { video } = currentVideoDetails || {}
    const videos = playlistVideo?.playlistItems || []
    const playlistInfo = playlistVideo?.info || {}
    const { recommendedVideos } = useContext(RecommendedVideoContext)
    useEffect(() => {
        if (!selectedVideoId && videos.length > 0) {
            setSelectedVideoId(videos[0]?.snippet?.resourceId?.videoId)
        }
    }, [videos, selectedVideoId])

    useEffect(() => {
        const videoDetails = async () => {
            if (selectedVideoId) {
                const res = await fetchVideoById(selectedVideoId)
                setCurrentVideoDetails(res)
            }
        }
        videoDetails()
    }, [selectedVideoId])



    const currentVideo = videos.find(
        v => v?.snippet?.resourceId?.videoId === selectedVideoId
    ) || videos[0]

    const videoUrl = selectedVideoId
        ? `https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`
        : ""
    useEffect(() => {
        document.title = `${currentVideo?.snippet?.title || ` `}  - YouTube` || "YouTube Video"
    }, [currentVideo])
    // console.log(videos)
    // console.log(playlistVideo)
    if (loading) return <StreamingSkeleton />
    return (
        <div className="min-h-screen bg-white text-[#0f0f0f] font-roboto">
            <Header navigate={navigate} />


            <main className="max-w-437.5 mx-auto flex flex-col lg:flex-row gap-0 lg:gap-6 lg:px-6 xl:px-10">


                <div className="flex-1 min-w-0">

                    <div className="w-full aspect-video bg-black sm:rounded-2xl overflow-hidden shadow-sm lg:mt-6">
                        {videoUrl && (
                            <iframe
                                className="w-full h-full"
                                src={videoUrl}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>

                    <div className="px-4 md:px-0 mt-4">
                        <h1 className="text-lg md:text-xl font-bold leading-7 line-clamp-2">
                            {currentVideo?.snippet?.title}
                        </h1>

                        <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 shrink-0 rounded-full bg-slate-200 overflow-hidden">
                                    <img src={channel?.info?.thumbnails?.medium?.url} alt="avatar" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-[16px] leading-tight truncate">
                                        {channel?.info?.title}
                                    </span>
                                    <span className="text-[12px] text-[#606060]">
                                        {formatNumber(channel?.statistics?.subscriberCount)} subscribers
                                    </span>
                                </div>
                                <SubscribeButton />
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                                <div className="flex items-center bg-[#f2f2f2] rounded-full shrink-0">
                                    <button className="flex items-center gap-2 px-4 py-2 border-r border-gray-300 font-medium text-sm hover:bg-[#e5e5e5] rounded-l-full">
                                        <Icons.ThumbsUp /> {formatNumber(video?.items?.statistics.likeCount)}
                                    </button>
                                    <button className="px-4 py-2 font-medium text-sm hover:bg-[#e5e5e5] rounded-r-full">
                                        <Icons.ThumbsDown />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 bg-[#f2f2f2] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e5e5e5] shrink-0">
                                    <Icons.Share /> Share
                                </button>
                                <button className="bg-[#f2f2f2] w-10 h-10 shrink-0 flex items-center justify-center rounded-full hover:bg-[#e5e5e5]">
                                    <Icons.More />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-[#f2f2f2] rounded-xl hover:bg-[#e5e5e5] transition-colors cursor-pointer"
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                            <div className="flex gap-2 text-sm font-bold mb-1">
                                <span>{formatNumber(video?.items?.statistics.viewCount)} views</span>
                                <span>{timeAgo(video?.items?.snippet.publishedAt)}</span>
                            </div>
                            <p className={`text-sm whitespace-pre-wrap leading-relaxed ${!isDescriptionExpanded && 'line-clamp-2'}`}>
                                {video?.items?.snippet?.description || "No description."}
                            </p>
                            <span className="mt-1 text-sm font-bold block">
                                {isDescriptionExpanded ? "Show less" : "...more"}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Comments */}
                    <div className="hidden lg:block mt-6">
                        <CommentContextProvider videoId={selectedVideoId}>
                            <Comments details={{ items: { statistics: { commentCount: video?.items.statistics.commentCount } } }} />
                        </CommentContextProvider>
                    </div>
                </div>

                <aside className="w-full lg:w-87.5 xl:w-100 shrink-0 lg:mt-6 mt-5">

                    <div className="border border-[#e5e5e5] lg:rounded-xl overflow-hidden flex flex-col max-h-125 lg:max-h-150 bg-white">
                        <div className="p-4 bg-white border-b">
                            <h3 className="text-base font-bold line-clamp-1">{playlistVideo?.playlist.snippet.title}</h3>
                            <p className="text-xs text-[#606060] mt-1">
                                {channel?.info?.title} - {videos.indexOf(currentVideo) + 1}/{videos.length}
                            </p>
                            <div className="flex gap-4 mt-3">
                                <button className="hover:text-gray-600"><Repeat size={18} /></button>
                                <button className="hover:text-gray-600"><Shuffle size={18} /></button>
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            {videos.map((video, index) => {
                                const videoId = video?.snippet?.resourceId?.videoId;
                                const isPlaying = videoId === selectedVideoId;
                                return (
                                    <div
                                        key={videoId}
                                        onClick={() => setSelectedVideoId(videoId)}
                                        className={`flex gap-2 p-2 cursor-pointer transition-colors ${isPlaying ? 'bg-[#dddddd]' : 'hover:bg-[#f9f9f9]'}`}
                                    >
                                        <div className="flex items-center justify-center w-6 shrink-0 text-[11px]">
                                            {isPlaying ? <IoPlay size={12} className="text-gray-700" /> : index + 1}
                                        </div>
                                        <div className="relative w-24 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-200">
                                            <img src={video?.snippet?.thumbnails?.medium?.url} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h4 className={`text-[13px] font-medium leading-tight line-clamp-2 `}>
                                                {video?.snippet?.title}
                                            </h4>
                                            <p className="text-[11px] text-[#606060] mt-1 truncate">
                                                {video?.snippet?.videoOwnerChannelTitle}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter Chips & Recommendations */}
                    <div className="mt-5 px-4 lg:px-0">
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
                            {["All", "Web Dev", "UI Design", "React"].map((chip) => (
                                <button key={chip} className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-transparent active:bg-black active:text-white">
                                    {chip}
                                </button>
                            ))}
                        </div>
                        <RecommendedSidebar videoId={video?.items.id} recommendedVideos={recommendedVideos} />
                    </div>

                    {/* Mobile Comments */}
                    <div className="lg:hidden mt-8 px-4 mb-10 border-t pt-6">
                        <CommentContextProvider videoId={selectedVideoId}>
                            <Comments details={{ items: { statistics: { commentCount: video?.items.statistics.commentCount } } }} />
                        </CommentContextProvider>
                    </div>
                </aside>
            </main>
        </div>
    )
}

const StreamPlaylist = () => {
    const { id } = useParams()
    return (
        <PlayListVideoByIdContextProvider PlaylistId={id}>
            <PlaylistStreamContent playlistId={id} />
        </PlayListVideoByIdContextProvider>
    )
}

export default StreamPlaylist