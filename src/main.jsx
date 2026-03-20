import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProfileContextProvider } from './context/ProfileContext.jsx'
import { RelatedVIdeoContextProvider } from './context/RelatedVideoContext.jsx'
import { PlayListContextProvider } from './context/PlayListContext.jsx'
import { RecommendedVideoContextProvider } from './context/RecomendedVideoContext.jsx'
import { VideoByIdContextProvider } from './context/VideoById.jsx'

createRoot(document.getElementById('root')).render(
  <ProfileContextProvider>
    <RelatedVIdeoContextProvider>
      <PlayListContextProvider>
        <RecommendedVideoContextProvider>
          <VideoByIdContextProvider>
            <App />
          </VideoByIdContextProvider>
        </RecommendedVideoContextProvider>
      </PlayListContextProvider>
    </RelatedVIdeoContextProvider>
  </ProfileContextProvider>

)
