import { useEffect } from 'react';
import { Audio } from 'expo-av';

const LibraryBg = () => {
    useEffect(() => {
        let soundObject = new Audio.Sound();

        const loadBackgroundMusic = async () => {
            try {
                await soundObject.loadAsync(require('../../assets/audio/library.mp3'), { isLooping: true });
                await soundObject.playAsync();
            } catch (error) {
                console.log('Error loading background music:', error);
            }
        };

        loadBackgroundMusic();

        return () => {
            soundObject.unloadAsync(); // Release audio resources when component unmounts
        };
    }, []);

    return null; // or a small invisible component if needed
};

export default LibraryBg;
