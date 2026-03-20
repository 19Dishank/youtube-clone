import React, { useContext } from 'react'
import { PlayListVideoByIdContext } from '../context/PlayListDetailsContext'

const Test = () => {
    const { playlistVideo } = useContext(PlayListVideoByIdContext)
    console.log(playlistVideo)
    return (
        <div>Test</div>
    )
}

export default Test