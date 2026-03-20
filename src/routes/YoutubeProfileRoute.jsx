import { Outlet } from 'react-router-dom'
import ChanelDetails from '../components/ChanelDetails'
import ChannelNavbar from '../components/ui/ChannelNavbar'
import { useContext, useEffect, useState } from 'react'
import { fetchChanelData } from '../services/fetchChanelData'
import { ProfileContext } from '../context/ProfileContext'

const YoutubeProfileRoute = () => {

    const { profileDetails } = useContext(ProfileContext)
    const [searchQuery, setSearchQuery] = useState('')

    const tabs = [
        { name: 'Home', path: '/' },
        { name: 'Playlists', path: '/playlists' }
    ]


    return (
        <>
            <ChanelDetails data={profileDetails?.data} />
            <ChannelNavbar tabs={tabs} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Outlet context={{ searchQuery }} />
        </>
    )
}

export default YoutubeProfileRoute