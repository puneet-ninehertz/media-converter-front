import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const videoToMp3 = "http://localhost:9800/api/video-to-mp3";

const YouTubeDownloader = () => {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileLink, setFileLink] = useState('');
    const [error, setError] = useState('');

    const handleDownload = async () => {
        setLoading(true);
        setFileLink('');
        setError('');

        try {
            const response = await axios.post(videoToMp3, { youtubeUrl });

            if (response.data.success) {
                setFileLink(response.data.link);
            } else {
                setError('Failed to process the video. Please try again later.');
            }
        } catch (err) {
            setError('An error occurred while processing the request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>YouTube to MP3 Converter</h1>
            <input
                type="text"
                placeholder="Paste YouTube URL here"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                style={{ padding: '10px', width: '60%' }}
            />
            <button
                onClick={handleDownload}
                disabled={loading || !youtubeUrl} // Disable button while loading or if URL is empty
                style={{
                    padding: '10px 20px',
                    marginLeft: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                }}
            >
                {loading ? 'Processing...' : 'Download'}
            </button>

            {loading && (
                <div style={{ marginTop: '20px' }}>
                    <ClipLoader color="#4A90E2" size={50} />
                    <p>Processing your request...</p>
                </div>
            )}

            {fileLink && (
                <div style={{ marginTop: '20px' }}>
                    <p>Download ready:</p>
                    <a href={fileLink} download>
                        Click here to download your MP3
                    </a>
                </div>
            )}

            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default YouTubeDownloader;
