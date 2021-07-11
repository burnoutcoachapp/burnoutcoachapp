import React from 'react';

const Video: React.FC = () => {
    return (
        <iframe
            style={{
                borderWidth: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
            }}
            src="https://player.vimeo.com/video/571266893"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
        />
    );
};

export default Video;
