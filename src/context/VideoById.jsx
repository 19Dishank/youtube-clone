import { createContext, useEffect, useState } from "react";
import { fetchVideoById } from "../services/GetVideoById";

export const VideoByIdContext = createContext()

export const VideoByIdContextProvider = ({ children, videoId }) => {
    const [video, setVideo] = useState(null)

    useEffect(() => {
        const getVideo = async () => {
            try {
                const data = await fetchVideoById(videoId)
                setVideo(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (videoId) getVideo()
    }, [videoId])

    return (
        <VideoByIdContext.Provider value={{ video }}>
            {children}
        </VideoByIdContext.Provider>
    )
}