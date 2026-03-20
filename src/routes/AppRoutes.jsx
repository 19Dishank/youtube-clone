import { Route, Routes } from 'react-router-dom'
import YoutubeProfileRoute from './YoutubeProfileRoute'
import ScrollToTop from '../components/ui/ScrollToTop'
import { lazy, Suspense } from 'react'
import { StreamingSkeleton, VideoGridSkeleton } from '../components/Skeletons'
import { PlayListContextProvider } from '../context/PlayListContext'
import { ProfileContextProvider } from '../context/ProfileContext'
import NotFoundPage from '../components/NotFoundPage'


const VideoSection = lazy(() => import('../components/VideoSection'))
const Playlist = lazy(() => import('../components/Playlist'))
const StreamVideo = lazy(() => import('../components/ui/StreamVideo'))

const AppRoutes = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={
                    <ProfileContextProvider>
                        <YoutubeProfileRoute />
                    </ProfileContextProvider>
                }>
                    <Route index element={<Suspense fallback={<VideoGridSkeleton />}>
                        <VideoSection />
                    </Suspense>}
                    />
                    <Route path="playlists" element={<Suspense fallback={<VideoGridSkeleton />}>
                        <Playlist />
                    </Suspense>}
                    />
                </Route>
                <Route path="/watch/:id" element={<Suspense fallback={<StreamingSkeleton />}>
                    <ScrollToTop />
                    <StreamVideo />
                </Suspense>}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default AppRoutes