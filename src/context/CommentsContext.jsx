import { createContext, useEffect, useState } from "react";
import { fetchComments } from "../services/fetchComments";

export const CommentContext = createContext()

export const CommentContextProvider = ({ children, videoId }) => {
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!videoId) return

        const getComments = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchComments(videoId)
                setComments(data)
            } catch (error) {
                console.error('Error fetching comments:', error)
                setError(error.message || 'Failed to fetch comments')
            } finally {
                setLoading(false)
            }
        }
        getComments()
    }, [videoId])
    return (
        <CommentContext.Provider value={{ comments, loading, error }} >
            {children}
        </CommentContext.Provider>
    )
}