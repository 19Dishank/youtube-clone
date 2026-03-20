import { createContext, useEffect, useState } from "react";
import { fetchChanelData } from "../services/fetchChanelData";
import { fetchRecommendedVideos } from "../services/fetchRecomendedVideo";

export const RecommendedVideoContext = createContext()

export const RecommendedVideoContextProvider = ({ children }) => {
    const [recommendedVideos, setRecommendedVideos] = useState(null)
    useEffect(() => {
        const getChannelData = async () => {
            try {
                const data = await fetchRecommendedVideos(10)
                setRecommendedVideos(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        getChannelData()
    }, [])
    return (
        <RecommendedVideoContext.Provider value={{ recommendedVideos }} >
            {children}
        </RecommendedVideoContext.Provider>
    )
}