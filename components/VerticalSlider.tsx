import React, { ReactNode } from 'react';

interface VerticalSliderProps {
    children: ReactNode[];
    delayTime?: number;
    animationDuration?: number;
    height?: string;
    className?: string;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
    children,
    delayTime = 3000,
    animationDuration = 800,
    height = "auto",
    className = ''
}) => {
    if (!children.length) return null;

    const totalDuration = delayTime * children.length;

    return (
        <div
            className={`vertical-slider-css ${className}`}
            style={{ height }}
        >
            {children.map((child, index) => (
                <div
                    key={index}
                    className="slide"
                    style={{
                        animationDelay: `${index * delayTime}ms`,
                        animationDuration: `${totalDuration}ms`
                    }}
                >
                    {child}
                </div>
            ))}

            <style jsx>{`
                .vertical-slider-css {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    min-height: 50px;
                }
                
                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transform: translateY(100%);
                    animation: slideVertical ${totalDuration}ms infinite;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                
                @keyframes slideVertical {
                    /* For 3 slides: each slide is active for 33.33% of the time */
                    0% {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    
                    /* Slide in quickly */
                    5% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    /* Stay visible for most of the 33.33% duration */
                    28% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    /* Slide out */
                    33.33% {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    
                    /* Stay hidden for the remaining 66.67% */
                    100% {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                }
            `}</style>
        </div>
    );
};

export default React.memo(VerticalSlider);