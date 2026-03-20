import { createContext, useEffect, useState } from "react";
import { fetchVideos } from "../services/fetchVideo";

export const RelatedVIdeoContext = createContext()

export const RelatedVIdeoContextProvider = ({ children }) => {
    const [relatedVideos, setRelatedVideos] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getRelatedVideos = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchVideos(20)
                setRelatedVideos(data)
            } catch (error) {
                console.error('Error fetching related videos:', error)
                setError(error.message || 'Failed to fetch related videos')
            } finally {
                setLoading(false)
            }
        }
        getRelatedVideos()
    }, [])
    return (
        <RelatedVIdeoContext.Provider value={{ relatedVideos, loading, error }} >
            {children}
        </RelatedVIdeoContext.Provider>
    )
}