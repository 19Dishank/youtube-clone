import { useContext, useEffect, useState } from "react";
import PlaylistCard from "./ui/PlaylistCard";
import { useOutletContext } from "react-router-dom";
import { PlayListContext } from "../context/PlayListContext";

const Playlist = () => {

    const { playlist } = useContext(PlayListContext)

    const context = useOutletContext()
    const searchQuery = context?.searchQuery || ''

    // Filter playlists based on search query
    const filteredPlaylists = searchQuery
        ? playlist?.data?.filter((pl) => {
            const title = pl?.snippet?.title?.toLowerCase() || ''
            const description = pl?.snippet?.description?.toLowerCase() || ''
            const query = searchQuery.toLowerCase()
            return title.includes(query) || description.includes(query)
        })
        : playlist?.data
    // console.log(playlist)
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {searchQuery ? `Search Results (${filteredPlaylists?.length || 0})` : "Playlists"}
            </h2>

            {filteredPlaylists?.length === 0 && searchQuery && (
                <p className="text-center text-gray-500">No playlists found matching your search.</p>
            )}

            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 w-full px-4">
                {filteredPlaylists?.map((pl, i) => (
                    <PlaylistCard key={pl.id || i} playlist={pl} />
                ))}
            </div>
        </div>
    );
}

export default Playlist