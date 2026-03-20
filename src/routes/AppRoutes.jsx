import { Route, Routes } from 'react-router-dom'
import YoutubeProfileRoute from './YoutubeProfileRoute'
import VideoSection from '../components/VideoSection'
import Playlist from '../components/Playlist'
import StreamVideo from '../components/ui/StreamVideo'
import ScrollToTop from '../components/ui/ScrollToTop'
import { RecommendedVideoContextProvider } from '../context/RecomendedVideoContext'

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<YoutubeProfileRoute />}>
                    <Route index element={<VideoSection />} />
                    <Route path="playlists" element={<Playlist />} />
                </Route>

                <Route path="/watch/:id" element={<StreamVideo />} />

            </Routes>
        </>
    )
}

export default AppRoutes