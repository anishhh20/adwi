// --- MAIN CAROUSEL COMPONENT ---

import React, { useState, useEffect } from 'react';

// --- SERVICE CONTENT COMPONENTS ---

const serviceStyles = {
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        transition: 'background-color 0.5s ease',
    },
    screenshotImage: {
        width: "auto",
        height: '100%',
        objectFit: 'contain', // FIX 2: Correctly set to 'contain' to show the full image
        objectPosition: 'center', // FIX 3: Centered the image completely (center top is now just center)
        borderRadius: '2px',
    },
    screenshotContainer: { // Assuming there's a container directly holding the image
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white', // Ensure the background behind the image is white
    },
    heading: {
        fontSize: '2em',
        marginBottom: '10px',
    },
    text: {
        fontSize: '1.2em',
        maxWidth: '80%',
    }
};

const SoftwareDevelopmentScreen = ({ imageSrc }) => (
    <div style={serviceStyles.content}>
        <img
            src={imageSrc}
            alt="GABALCORE Software Development Interface"
            style={serviceStyles.screenshotImage}
        />
    </div>
);

const RecruitmentStaffingScreen = ({ imageSrc }) => (
    <div style={serviceStyles.content}>
        <img
            src={imageSrc}
            alt="Recruitment & Staffing"
            style={serviceStyles.screenshotImage}
        />
    </div>
);
const AnimationScreen = ({ imageSrc }) => (
    <div style={serviceStyles.content}>
        <img
            src={imageSrc}
            alt="2D/3D Animation"
            style={serviceStyles.screenshotImage}
        />
    </div>
);
const CSRAactivitiesScreen = ({ imageSrc }) => (
    <div style={serviceStyles.content}>
        <img
            src={imageSrc}
            alt="CSR Activities"
            style={serviceStyles.screenshotImage}
        />
    </div>
);

// --- MAIN CAROUSEL COMPONENT ---

const DesktopCarousel = ({ }) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const screens = [
        { name: 'Software Development', component: <SoftwareDevelopmentScreen imageSrc={"/software.png"} /> },
        { name: 'Recruitment & Staffing', component: <RecruitmentStaffingScreen imageSrc={"/Recruitment.png"} /> },
        { name: '2D/3D Animation', component: <AnimationScreen imageSrc={"/Animation.png"} /> },
        { name: 'CSR Activities', component: <CSRAactivitiesScreen imageSrc={"/CSR.png"} /> },
    ];

    const nextScreen = () => setCurrentScreen((prev) => (prev + 1) % screens.length);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(nextScreen, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleShutdown = () => {
        alert("System Shutting Down... (Simulated)");
        console.log("Shutdown initiated.");
        // In a real app, you might stop the carousel interval here
    };

    const ServiceDot = ({ index, name }) => {
        const [isHovered, setIsHovered] = useState(false);
        const style = index === currentScreen ? styles.activeDot : styles.inactiveDot;

        return (
            <div
                key={index}
                style={{
                    ...style,
                    ...(isHovered ? styles.dotHover : {}),
                }}
                onClick={() => setCurrentScreen(index)}
                title={name}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            ></div>
        );
    };

    return (
        <div style={styles.responsiveWrapper}>
            <div style={styles.monitorStructure}>
                <div style={styles.screenBezel}>
                    {/* UPDATED: Webcam/Camera Dot is now correctly inside the top bezel */}
                    <div style={styles.cameraDot}></div>
                    <div style={styles.screenContent}>
                        {screens[currentScreen].component}
                        {/* Reflection Overlay */}
                        <div style={styles.screenReflection}></div>
                    </div>
                </div>
            </div>

            {/* Stand Neck and Base (Crucial for Realism) */}
            <div style={styles.standNeck}>
                {/* Dots are now integrated vertically on the stand neck */}
                <div style={styles.standDotsContainer}>
                    {screens.map((screen, index) => (
                        <ServiceDot key={index} index={index} name={screen.name} />
                    ))}
                </div>
            </div>
            <div style={styles.standBaseWrapper}>
                <div style={styles.standBase}>
                    {/* NEW: Shutdown Button */}
                    <button onClick={handleShutdown} style={styles.shutdownButton}>
                        &#9881;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DesktopCarousel;

// --- STYLES ---

const styles = {
    responsiveWrapper: {
        width: '95%',
        maxWidth: '700px',
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    monitorStructure: {
        width: '90%',
        // background: 'linear-gradient(to right, #e8e8e8, #f5f5f5, #e8e8e8)',
        borderRadius: '20px',
        // boxShadow: '0 15px 45px rgba(0,0,0,0.5)',
        padding: '0.8%',
        position: 'relative',
        zIndex: 2,
    },
    screenBezel: {
        width: '100%',
        aspectRatio: '16 / 10',
        backgroundColor: 'black',
        borderRadius: '15px',
        boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.95)',
        overflow: 'hidden',
        position: 'relative',
        padding: '10px',
    },
    screenContent: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white', // <--- FIX 4: Changed from 'black' to 'white' to match the image background
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative',
    },
    screenReflection: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.0) 40%)',
        zIndex: 10,
    },
    cameraDot: {
        position: 'absolute',
        top: '3px', // Moved up into the bezel area (padding of screenBezel is 10px)
        left: '50%',
        transform: 'translateX(-50%)',
        width: '5px',
        height: '5px',
        backgroundColor: '#444',
        borderRadius: '50%',
        zIndex: 5, // z-index within screenBezel
    },
    standNeck: {
        width: '15%',
        minWidth: '100px',
        height: '80px',
        background: 'linear-gradient(to top, #c0c0c0, #e0e0e0)',
        borderRadius: '0 0 10px 10px',
        margin: '0 auto',
        marginTop: '-10px',
        boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '10px',
        position: 'relative',
    },
    standBaseWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 3,
    },
    standBase: {
        width: '50%',
        maxWidth: '350px',
        height: '15px',
        background: 'linear-gradient(to top, #c0c0c0, #e0e0e0)',
        borderRadius: '10px 10px 5px 5px',
        marginTop: '0px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid #aaa',
        position: 'relative', // Added for button positioning
    },
    // NEW: Shutdown Button Style
    shutdownButton: {
        position: 'absolute',
        top: '0px', // Positioned on the right side of the base
        bottom: '5px',
        backgroundColor: 'transparent',
        color: '#777',
        border: 'none',
        fontSize: '0.8em',
        cursor: 'pointer',
        outline: 'none',
        transition: 'color 0.2s',
        padding: '0 5px',
        '&:hover': {
            color: '#e74c3c', // Subtle red on hover
        }
    },
    standDotsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        position: 'absolute',
        top: '50px',
    },
    inactiveDot: {
        width: '6px',
        height: '6px',
        backgroundColor: '#999',
        borderRadius: '50%',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    activeDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#2ecc71',
        borderRadius: '50%',
        boxShadow: '0 0 5px #2ecc71, inset 0 1px 2px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    // NEW: Hover effect style
    dotHover: {
        transform: 'scale(1.3)', // Slight scale up on hover
        backgroundColor: '#555', // Change color slightly for inactive dots
        boxShadow: '0 0 8px rgba(0, 122, 255, 0.7)', // Glow for a high-tech feel
    }
};
