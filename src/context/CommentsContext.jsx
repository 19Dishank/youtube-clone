import { createContext, useEffect, useState } from "react";
import { fetchComments } from "../services/fetchComments";

export const CommentContext = createContext()

export const CommentContextProvider = ({ children }) => {
    const [comments, setComments] = useState(null)
    useEffect(() => {
        const getComments = async () => {
            try {
                const data = await fetchComments()
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
    }, [])
    return (
        <CommentContext.Provider value={{ comments }} >
            {children}
        </CommentContext.Provider>
    )
}