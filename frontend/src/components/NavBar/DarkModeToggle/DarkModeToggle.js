import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Read mode from local storage on component mount
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            if (JSON.parse(savedMode)) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        // Save mode to local storage whenever it changes
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        if (!darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    return (
        <div className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`}>
            <label className="switch">
                <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
                <span className="slider round"></span>
            </label>
            <span>Dark Mode</span>
        </div>
    );
};

export default DarkModeToggle;
