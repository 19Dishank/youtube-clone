import React, { useContext, useEffect } from 'react';
import { ActionButtons, Comments, Description, Header, VideoPlayer, RecommendedSidebar, PlaylistSidebar } from './YoutubeStreamingUiCOmponents';
import { useNavigate, useParams } from 'react-router-dom';
import { RecommendedVideoContext } from '../../context/RecomendedVideoContext';
import { formatNumber } from '../../helper/helperfunctions';
import { CommentContextProvider } from '../../context/CommentsContext';
import { VideoByIdContext, VideoByIdContextProvider } from '../../context/VideoById';
import { StreamingSkeleton } from '../Skeletons';
import { PlayListVideoByIdContext } from '../../context/PlayListVideoByIdContext';


const StreamVideoContent = ({ url, videoId }) => {
    const { recommendedVideos } = useContext(RecommendedVideoContext)
    const navigate = useNavigate()
    const { video, loading } = useContext(VideoByIdContext)


    useEffect(() => {
        document.title = `${video?.video.items?.snippet?.title || ` `}  - YouTube` || "YouTube Video"
    }, [video])


    if (loading) {
        return (
            <StreamingSkeleton />
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
            <Header navigate={navigate} />
            <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 p-0 sm:p-4 lg:p-6">

                <div className="lg:col-span-2">
                    <VideoPlayer url={url} />
                    <div className="px-4 sm:px-0 mt-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-tr from-pink-500 to-orange-400 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-lg shadow-inner">
                                    <img src={video?.channel.info.thumbnails.medium.url} alt="channel profile" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[15px] leading-tight text-gray-900">{video?.channel.info.title}</h3>
                                    <p className="text-xs text-gray-500">{formatNumber(video?.channel.statistics.subscriberCount)} subscribers</p>
                                </div>
                                <button className="ml-2 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full font-semibold text-sm transition-colors">
                                    Subscribe
                                </button>
                            </div>

                            <ActionButtons details={video?.video} />
                        </div>

                        <Description details={video?.video} />

                        <div className="hidden lg:block">
                            <CommentContextProvider videoId={videoId} >
                                <Comments details={video?.video} />
                            </CommentContextProvider>
                        </div>
                    </div>
                </div>


                <div className="lg:col-span-1 px-4 sm:px-0">
                    <div className="sticky top-20">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                            <button className="whitespace-nowrap bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">All</button>
                            <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200">Web Development</button>
                            <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200">UI Design</button>
                            <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200">React</button>
                        </div>

                        <RecommendedSidebar recommendedVideos={recommendedVideos} videoId={videoId} />

                    </div>
                </div>

                <div className="lg:hidden px-4 sm:px-0 w-full mb-10">

                    <CommentContextProvider videoId={videoId} >
                        <Comments details={video?.video} />
                    </CommentContextProvider>
                </div>

            </div>
        </div>
    );
};

// Outer component that provides context
const StreamVideo = ({ params }) => {
    const { id } = useParams();
    const videoId = id || params?.id;

    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`

    return (
        <VideoByIdContextProvider videoId={videoId}>
            <StreamVideoContent url={url} videoId={videoId} />
        </VideoByIdContextProvider>
    );
};

export default StreamVideo;