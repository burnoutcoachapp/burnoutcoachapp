import React from 'react';

const Video: React.FC = () => {
  return (
    <iframe
      style={{ borderWidth: 0 }}
      src="https://player.vimeo.com/video/569812014"
      width="640"
      height="360"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default Video;
