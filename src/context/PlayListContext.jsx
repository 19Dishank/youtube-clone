import { createContext, useEffect, useState } from "react";
import { fetchChanelData } from "../services/fetchChanelData";
import { fetchPlaylist } from "../services/fetchPlaylist";

export const PlayListContext = createContext()

export const PlayListContextProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState(null)
    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const data = await fetchPlaylist()
                setPlaylist(data)
            } catch (error) {
                console.log(error)
            }
        }
        getPlaylist()
    }, [])
    return (
        <PlayListContext.Provider value={{ playlist }} >
            {children}
        </PlayListContext.Provider>
    )
}