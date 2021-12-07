import React, { useState, useRef } from 'react';
import hidasVideo from '../assets/hidas_heitto.mp4';
import anttiPuttaa from '../assets/antti_puttaa.mp4';
import kuva from '../assets/risbee.jpg';

// Lista toistettavista videoista
const mediaQueue = [
  hidasVideo,
  anttiPuttaa,

];

function BackgroundMedia() {
  const [mediaIndex, setMediaIndex] = useState(0);
  const videoRef = useRef();

  const handleEnded = () => {
    setMediaIndex((mediaIndex + 1));
    videoRef.current.load();
  };
  // Jos ei ole enää videoita näytettäväksi, näytetääb kuva
  if (mediaIndex >= mediaQueue.length) {
    return (
      <div className="tausta">
        <img src={kuva} className="media" alt="Tausta" />
      </div>
    );
  }
  return (
    <div className="tausta">
      <video ref={videoRef} autoPlay muted className="media" onEnded={handleEnded}>
        <source src={mediaQueue[mediaIndex]} type="video/mp4" />
      </video>
    </div>
  );
}

export default BackgroundMedia;
