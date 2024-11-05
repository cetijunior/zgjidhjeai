import React, { useState, useEffect } from 'react';

const ShootingStars = () => {
    const [stars, setStars] = useState([]);
    const [staticStars, setStaticStars] = useState([]);

    useEffect(() => {
        // Create static stars (reduced density)
        const newStaticStars = Array.from({ length: 50 }, () => ({
            id: Math.random(),
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.7 + 0.3,
        }));
        setStaticStars(newStaticStars);

        // Create shooting stars (reduced frequency)
        const createStar = () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            const duration = Math.random() * 2 + 1;

            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const distance = Math.min(window.innerWidth, window.innerHeight) * 0.8;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;

            const star = {
                id: Date.now(),
                startX,
                startY,
                endX,
                endY,
                animationDuration: duration,
            };
            setStars(prevStars => [...prevStars, star]);
            setTimeout(() => {
                setStars(prevStars => prevStars.filter(s => s.id !== star.id));
            }, duration * 1000);
        };

        const interval = setInterval(createStar, 3000); // Reduced frequency to 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {staticStars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                    }}
                />
            ))}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${star.startX}px`,
                        top: `${star.startY}px`,
                        animation: `shootingStar${star.id} ${star.animationDuration}s linear`
                    }}
                />
            ))}
            <style jsx>{`
                ${stars.map(star => `
                    @keyframes shootingStar${star.id} {
                        0% { transform: translate(0, 0); opacity: 1; }
                        100% { transform: translate(${star.endX - star.startX}px, ${star.endY - star.startY}px); opacity: 0; }
                    }
                `).join('\n')}
            `}</style>
        </div>
    );
};

export default ShootingStars;
