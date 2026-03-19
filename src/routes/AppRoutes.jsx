import { Route, Routes } from 'react-router-dom'
import YoutubeProfileRoute from './YoutubeProfileRoute'
import VideoSection from '../components/VideoSection'
import Playlist from '../components/Playlist'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<YoutubeProfileRoute />}>
                <Route index element={<VideoSection />} />
                <Route path="playlists" element={<Playlist />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes