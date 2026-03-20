import { createContext, useEffect, useState } from "react";
import { fetchChanelData } from "../services/fetchChanelData";
import { fetchRecommendedVideos } from "../services/fetchRecomendedVideo";

export const RecommendedVideoContext = createContext()

export const RecommendedVideoContextProvider = ({ children }) => {
    const [recommendedVideos, setRecommendedVideos] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [videoIdFromComp, setVideoIdFromComp] = useState(null)
    useEffect(() => {
        if (!videoIdFromComp) return;

        const getChannelData = async () => {
            setLoading(true);
            setError(null);
            setRecommendedVideos(null);

            try {
                const data = await fetchRecommendedVideos(10, 1, videoIdFromComp);
                setRecommendedVideos(data?.data);
            } catch (error) {
                console.error('Error fetching recommended videos:', error);
                setError(error.message || 'Failed to fetch recommended videos');
            } finally {
                setLoading(false);
            }
        };

        getChannelData();
    }, [videoIdFromComp]);
    return (
        <RecommendedVideoContext.Provider value={{ recommendedVideos, loading, error, videoIdFromComp, setVideoIdFromComp }} >
            {children}
        </RecommendedVideoContext.Provider>
    )
}