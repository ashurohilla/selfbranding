import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  // We sanitize the videoId to prevent broken URLs
  const cleanId = videoId?.trim();

  return (
    <div className="my-10 w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${cleanId}?rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;