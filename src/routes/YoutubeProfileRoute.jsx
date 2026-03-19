import { Outlet } from 'react-router-dom'
import ChanelDetails from '../components/ChanelDetails'
import ChannelNavbar from '../components/ui/ChannelNavbar'
import { useEffect, useState } from 'react'
import { fetchChanelData } from '../services/fetchChanelData'

const YoutubeProfileRoute = () => {

    const [profileDetails, setProfileDetails] = useState(null)

    const tabs = [
        { name: 'Home', path: '/' },
        { name: 'Playlists', path: '/playlists' }
    ]

    useEffect(() => {
        const getChannelData = async () => {
            const data = await fetchChanelData()
            setProfileDetails(data)
        }
        getChannelData()
    }, [])

    return (
        <>
            <ChanelDetails data={profileDetails?.data} />
            <ChannelNavbar tabs={tabs} />
            <Outlet />
        </>
    )
}

export default YoutubeProfileRoute