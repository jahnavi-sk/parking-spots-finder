import React from 'react';
import './styles.css';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="video-embed-container">
      <iframe
        title="YouTube Video"
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/Iw_48YlMC48?autoplay=1&loop=1&playlist=Iw_48YlMC48&t=20&mute=1&playsinline=1&controls=0&showinfo=0&autohide=1&allowfullscreen=true&mode=transparent"}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="youtube-embed"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;