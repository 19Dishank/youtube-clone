import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProfileContextProvider } from './context/ProfileContext.jsx'
import { RelatedVIdeoContextProvider } from './context/RelatedVideoContext.jsx'
import { RecommendedVideoContextProvider } from './context/RecomendedVideoContext.jsx'
import { PlayListContextProvider } from './context/PlayListContext.jsx'

createRoot(document.getElementById('root')).render(

  <RelatedVIdeoContextProvider>
    <PlayListContextProvider>
      <RecommendedVideoContextProvider>
        <App />
      </RecommendedVideoContextProvider>
    </PlayListContextProvider>
  </RelatedVIdeoContextProvider>


)
