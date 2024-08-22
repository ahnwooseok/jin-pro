import React, { useState, useRef, useEffect } from 'react';

const VideoComponent = ({ fields, addRecordToAirtable, setModalOpen2, randomInt, modalOpen, randomIntRendered}) => {
    const videoRef = useRef(null);
    const [isVideoEnded, setIsVideoEnded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const handleClick = (event) => {
            if (isVideoEnded) {
                event.stopPropagation();
                event.preventDefault();
                alert('Clicks are disabled as the video has ended.');
            } else {
                addRecordToAirtable(fields);
                setModalOpen2(true);
            }
        };

        if (video) {
            video.addEventListener('click', handleClick, true);
        }

        return () => {
            if (video) {
                video.removeEventListener('click', handleClick, true);
            }
        };
    }, [isVideoEnded, fields, addRecordToAirtable, setModalOpen2]);

    useEffect(() => {
        const video = videoRef.current;

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !modalOpen) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Adjust this threshold as needed
        });

        if (video) {
            observer.observe(video);
        }

        return () => {
            if (video) {
                observer.unobserve(video);
            }
        };
    }, [modalOpen]);

    const handleVideoEnd = () => {
        setIsVideoEnded(true);
    };


    return (
        randomIntRendered &&
        <div style={{ position: 'relative' }} onClick={()=>{if(isVideoEnded) addRecordToAirtable({...fields, "ad_name": `ad-${randomInt}-videoEnd`});}}>
            <video
                ref={videoRef}
                width="100%"
                onEnded={handleVideoEnd}
                playsInline
                webkit-playsinline
                controls={false} // Remove default controls
            >
                <source src={`/images/ad-${randomInt}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {isVideoEnded && (
                <div style={styles.overlay}>
                    Video has ended. Clicks are disabled.
                </div>
            )}
        </div>
    );
};

const styles = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2em',
    },
};

export default VideoComponent;
