import { createContext, useEffect, useState } from "react";
import { fetchRelatedVideos } from "../services/fetchRelatedVideo";

export const RelatedVIdeoContext = createContext()

export const RelatedVIdeoContextProvider = ({ children }) => {
    const [relatedVideos, setRelatedVideos] = useState(null)
    useEffect(() => {
        const getRelatedVideos = async () => {
            try {
                const data = await fetchRelatedVideos(20)
                setRelatedVideos(data)
            } catch (error) {
                console.log(error)
            }
        }
        getRelatedVideos()
    }, [])
    return (
        <RelatedVIdeoContext.Provider value={{ relatedVideos }} >
            {children}
        </RelatedVIdeoContext.Provider>
    )
}