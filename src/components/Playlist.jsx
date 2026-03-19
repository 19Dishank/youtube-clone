import { useEffect, useState } from "react";
import { fetchPlaylist } from "../services/fetchPlaylist";
import PlaylistCard from "./ui/PlaylistCard";


const Playlist = () => {
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
        <div className="p-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-6">
                {playlist?.data?.map((pl, i) => (
                    <PlaylistCard key={i} playlist={pl} />
                ))}
            </div>
        </div>
    );
}

export default Playlist