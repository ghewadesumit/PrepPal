import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { PlayCircle, PauseCircle } from "lucide-react";
import { cloneDeep } from "lodash";

let focusMusicVideo = [
  {
    videoId: "mPZkdNFkNps", // Example YouTube video ID for focus musi
    videoName: "Sound of Rain",
  },
  {
    videoId: "HAzZH6wccew", // Example YouTube video ID for focus music
    videoName: "Sound of River",
  },
  {
    videoId: "OoSzt2Ga8Oc", // Example YouTube video ID for focus music
    videoName: "Sound of Kaizen",
  },
  {
    videoId: "8KrLtLr-Gy8", // Example YouTube video ID for focus music
    videoName: "Sound of Born Fire",
  },
];

const BackgroundMusic = () => {
  const [players, setPlayers] = useState({});
  const [playingStates, setPlayingStates] = useState({});

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0, // Changed to 0 so it doesn't autoplay on load
    },
  };

  useEffect(() => {
    return () => {
      setPlayers({});
      setPlayingStates({});
    };
  }, []);
  const onReady = (videoId, event) => {
    setPlayers((prev) => ({
      ...prev,
      [videoId]: event.target,
    }));
    event.target.setVolume(50);
  };

  const togglePlay = (videoId) => {
    if (!players[videoId]) {
      console.warn("Player not ready yet");
      return;
    }

    setPlayingStates((prev) => {
      const isCurrentlyPlaying = !prev[videoId];
      const copyPlayingStates = cloneDeep(prev);

      // Only interact with players that exist
      Object.keys(players).forEach((key) => {
        if (players[key]) {
          players[key].pauseVideo();
          copyPlayingStates[key] = false;
        }
      });

      if (isCurrentlyPlaying && players[videoId]) {
        players[videoId].playVideo();
      }

      return {
        ...copyPlayingStates,
        [videoId]: isCurrentlyPlaying,
      };
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {focusMusicVideo.map((videoItem) => {
        const isPlaying = playingStates[videoItem.videoId];
        return (
          <React.Fragment key={videoItem.videoId}>
            <button
              onClick={() => togglePlay(videoItem.videoId)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isPlaying
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-blue-500/25"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              }`}
            >
              <span className="text-sm">{videoItem.videoName}</span>
              {isPlaying ? (
                <PauseCircle className="h-5 w-5" />
              ) : (
                <PlayCircle className="h-5 w-5" />
              )}
            </button>
            <YouTube
              videoId={videoItem.videoId}
              opts={opts}
              onReady={(event) => onReady(videoItem.videoId, event)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BackgroundMusic;
