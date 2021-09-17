import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken, track}) {
    return (
        <div>
            <SpotifyPlayer
                token={accessToken}
                // showSaveIcon
                magnifySliderOnHover
                // updateSavedStatus
                uris={track.uri ? [track.uri] : []}
            />
        </div>
    )
}
