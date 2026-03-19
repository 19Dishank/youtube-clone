import React, { useEffect, useState } from 'react'
import ChanelDetails from '../components/ChanelDetails'
import { fetchChanelData } from '../services/fetchChanelData'
import ChannelNavbar from '../components/ui/ChannelNavbar'
import VideoSection from '../components/VideoSection'
import Playlist from '../components/Playlist'

const ProfilePage = () => {

    const [profileDetails, setProfileDetails] = useState(null)
    const [activeTab, setActiveTab] = useState('Home');
    const tabs = [
        'Home',
        'Playlists',
    ];

    const switchTab = () => {
        switch (activeTab) {
            case 'Home':
                return <VideoSection />
            case 'Playlists':
                return <Playlist />
            default:
                return <VideoSection />
        }
    }
    useEffect(() => {
        const getChannelData = async () => {
            try {
                const data = await fetchChanelData()
                setProfileDetails(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChannelData()
    }, [])
    // console.log(profileDetails)
    return (
        <>
            <ChanelDetails data={profileDetails?.data} />
            <ChannelNavbar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {switchTab()}
        </>
    )
}

export default ProfilePage