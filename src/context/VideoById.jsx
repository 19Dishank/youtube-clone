import { createContext, useEffect, useState } from "react";
import { fetchVideoById } from "../services/GetVideoById";

export const VideoByIdContext = createContext()

export const VideoByIdContextProvider = ({ children, videoId }) => {
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!videoId) return

        const getVideo = async () => {
            setLoading(true)
            setError(null)
            setVideo(null)

            try {
                const data = await fetchVideoById(videoId)
                setVideo(data)
            } catch (error) {
                console.error('Error fetching video:', error)
                setError(error.message || 'Failed to fetch video')
            } finally {
                setLoading(false)
            }
        }

        getVideo()
    }, [videoId])
    return (
        <VideoByIdContext.Provider value={{ video, loading, error }} >
            {children}
        </VideoByIdContext.Provider>
    )
}