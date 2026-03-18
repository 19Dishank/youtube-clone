import React, { useEffect, useState } from 'react'
import ChanelDetails from '../components/ChanelDetails'
import { fetchChanelData } from '../services/fetchChanelData'
import ChannelNavbar from '../components/ui/ChannelNavbar'

const ProfilePage = () => {

    const [profileDetails, setProfileDetails] = useState(null)

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
    console.log(profileDetails)
    return (
        <>
            <ChanelDetails data={profileDetails?.data} />
            <ChannelNavbar />
        </>
    )
}

export default ProfilePage