import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setIsPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setIsActive(false) : setIsActive(true);
        });
      });

      player.connect();
    };
  }, []);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);

    if (player) {
      player.setVolume(newVolume / 100).catch((err) => {
        console.error("Failed to set volume", err);
      });
    }
  };

  if (!isActive) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            You are connected to Spotify. Please transfer your playback to this
            device.
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>
              <div className="btn-spotify-container">
                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.previousTrack();
                  }}
                >
                  <IoIosSkipBackward />
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay();
                  }}
                >
                  {isPaused ? <FaPlay /> : <FaPause />}
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack();
                  }}
                >
                  <IoIosSkipForward />
                </button>
                {/* Volume Slider */}
                <div className="volume-control">
                  {showVolume ? (
                    <button
                      className="btn-spotify volume-icon"
                      onClick={() => {
                        setShowVolume(false);
                        player.setVolume(0);
                      }}
                    >
                      <FaVolumeDown />
                    </button>
                  ) : (
                    <button
                      className="btn-spotify volume-icon"
                      onClick={() => {
                        setShowVolume(true);
                        player.setVolume(volume / 100);
                      }}
                    >
                      <FaVolumeMute />
                    </button>
                  )}
                  <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={showVolume ? volume : 0}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebPlayback;
