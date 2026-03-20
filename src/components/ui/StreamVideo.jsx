import React, { useContext, useEffect, useState } from 'react';
import { ActionButtons, AdBanner, Comments, Description, Header, VideoPlayer, RecommendedSidebar } from './YoutubeStreamingUiCOmponents';
import { useNavigate } from 'react-router-dom';
import { fetchRelatedVideos } from '../../services/fetchRelatedVideo';
import { RecommendedVideoContext } from '../../context/RecomendedVideoContext';
import { ProfileContext } from '../../context/ProfileContext';
import { formatNumber } from '../../helper/helperfunctions';
import { CommentContextProvider } from '../../context/CommentsContext';


const StreamVideo = ({ params }) => {
    console.log("Comments component rendered with params:", params);
    const { recommendedVideos } = useContext(RecommendedVideoContext)
    const { profileDetails } = useContext(ProfileContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const url = "https://www.youtube.com/embed/6cXpjtc36XE?autoplay=1&mute=1&playsinline=1";
    const videoId = url.split("/embed/")[1].split("?")[0];
    // console.log(videoId)
    const getYoutubeTitle = async (videoId) => {
        try {
            const res = await fetch(
                `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
            );

            const data = await res.json();

            return data.title;
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchTitle = async () => {
            const title = await getYoutubeTitle(videoId);
            setTitle(title);
            // console.log(title);
        };

        fetchTitle();
    }, []);
    console.log(profileDetails)
    return (

        <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
            <Header navigate={navigate} />
            <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 p-0 sm:p-4 lg:p-6">
                {/* Left / Main Content Container */}
                <div className="lg:col-span-2">
                    <VideoPlayer url={url} />
                    <div className="px-4 sm:px-0 mt-4">
                        <h1 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                            {title || "Loading..."}
                        </h1>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-tr from-pink-500 to-orange-400 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-lg shadow-inner">
                                    <img src={profileDetails?.data.info.snippet.thumbnails.medium.url} alt="channel profile" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[15px] leading-tight text-gray-900">{profileDetails?.data.info.brandingSettings.channel.title}</h3>
                                    <p className="text-xs text-gray-500">{formatNumber(profileDetails?.data.info.statistics.subscriberCount)} subscribers</p>
                                </div>
                                <button className="ml-2 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full font-semibold text-sm transition-colors">
                                    Subscribe
                                </button>
                            </div>

                            <ActionButtons />
                        </div>

                        <AdBanner />
                        <Description />

                        <div className="hidden lg:block">
                            <CommentContextProvider>
                                <Comments />
                            </CommentContextProvider>
                        </div>
                    </div>
                </div>

                {/* Right / Sidebar Content Container */}
                <div className="lg:col-span-1 px-4 sm:px-0">
                    <div className="sticky top-20">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                            <button className="whitespace-nowrap bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">All</button>
                            <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200">Web Development</button>
                            <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200">UI Design</button>
                            <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200">React</button>
                        </div>

                        <RecommendedSidebar recommendedVideos={recommendedVideos} />
                    </div>
                </div>

                <div className="lg:hidden px-4 sm:px-0 w-full mb-10">

                    <CommentContextProvider>
                        <Comments />
                    </CommentContextProvider>
                </div>

            </div>
        </div>
    );
};

export default StreamVideo;