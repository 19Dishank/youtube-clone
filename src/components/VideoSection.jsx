import { useEffect, useState } from "react";
import VideoCard from "./ui/VideoCard";
import { fetchRelatedVideos } from "../services/fetchRelatedVideo";
import { useOutletContext } from "react-router-dom";

export default function VideoSection() {
    const [relatedVideos, setRelatedVideos] = useState(null)
    const context = useOutletContext()
    const searchQuery = context?.searchQuery || ''

    useEffect(() => {
        const getRelatedVideos = async () => {
            try {
                const data = await fetchRelatedVideos()
                setRelatedVideos(data)
            } catch (error) {
                console.log(error)
            }
        }
        getRelatedVideos()
    }, [])

    const filteredVideos = searchQuery
        ? relatedVideos?.data?.filter((videoWrapper) => {

            const video = videoWrapper?.items || {}
            const title = video?.snippet?.title?.toLowerCase() || ''
            const description = video?.snippet?.description?.toLowerCase() || ''
            const tags = video?.snippet?.tags?.join(' ')?.toLowerCase() || ''
            const query = searchQuery?.toLowerCase() || ""

            return title.includes(query) || description.includes(query) || tags.includes(query)
        })
        : relatedVideos?.data

    return (
        <div className="max-w-600 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {searchQuery ? `Search Results (${filteredVideos?.length || 0})` : "For you"}
            </h2>

            {filteredVideos?.length === 0 && searchQuery && (
                <p className="text-center text-gray-500">No videos found matching your search.</p>
            )}

            <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center">
                {filteredVideos?.map((video, index) => (
                    <VideoCard key={video.id || index} video={video} />
                ))}
            </div>
        </div>
    );
}