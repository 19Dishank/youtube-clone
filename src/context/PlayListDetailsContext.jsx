import { createContext, useEffect, useState } from "react";
import { fetchVideoById } from "../services/GetVideoById";
import { fetchPlaylistDetails } from "../services/fetchPlaylistDetails";

export const PlayListVideoByIdContext = createContext()

export const PlayListVideoByIdContextProvider = ({ children, PlaylistId }) => {
    const [playlistVideo, setPlaylistVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!PlaylistId) return

        const getVideo = async () => {
            setLoading(true)
            setError(null)
            setPlaylistVideo(null)

            try {
                const data = await fetchPlaylistDetails(PlaylistId)
                console.log("Playlist Video Details ======> \n", data)
                setPlaylistVideo(data)
            } catch (error) {
                console.error('Error fetching playlist video:', error)
                setError(error.message || 'Failed to fetch playlist video')
            } finally {
                setLoading(false)
            }
        }

        getVideo()
    }, [PlaylistId])
    return (
        <PlayListVideoByIdContext.Provider value={{ playlistVideo, loading, error }} >
            {children}
        </PlayListVideoByIdContext.Provider>
    )
}