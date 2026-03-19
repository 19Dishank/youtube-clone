import { useEffect, useState } from "react";
import VideoCard from "./ui/VideoCard";
import { fetchRelatedVideos } from "../services/fetchRelatedVideo";


export default function VideoSection() {
    const [relatedVideos, setRelatedVideos] = useState(null)
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
    // console.log(relatedVideos)
    return (
        <div className="max-w-600 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                For you
            </h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {relatedVideos?.data?.map((video, index) => (
                    <VideoCard key={video.id || index} video={video} />
                ))}
            </div>
        </div>
    );
}