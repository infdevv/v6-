
function updateStyles(config) {
    if (config.backgroundColorMain) {
        document.documentElement.style.setProperty('--background-color-main', config.backgroundColorMain);
    }
    if (config.backgroundColorToolbar) {
        document.documentElement.style.setProperty('--background-color-toolbar', config.backgroundColorToolbar);
    }
    if (config.textColor) {
        document.documentElement.style.setProperty('--text-color', config.textColor);
    }
    if (config.gradientBackground) {
        document.body.style.background = config.gradientBackground;
    }

    const toolbar = document.querySelector('#toolbar');
    if (config.toolbarBorderColor) {
        toolbar.style.borderColor = config.toolbarBorderColor;
    }

    const navLinks = document.querySelectorAll('#nav-links h3');
    navLinks.forEach(link => {
        if (config.navLinkHoverShadow) {
            link.addEventListener('mouseover', () => {
                link.style.boxShadow = config.navLinkHoverShadow;
            });
            link.addEventListener('mouseout', () => {
                link.style.boxShadow = 'none';
            });
        }
    });

    const buttons = document.querySelectorAll('.main_button');
    buttons.forEach(button => {
        if (config.buttonBackgroundColor) {
            button.style.backgroundColor = config.buttonBackgroundColor;
        }
        if (config.buttonHoverColor) {
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = config.buttonHoverColor;
            });
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = config.buttonBackgroundColor;
            });
        }
    });
    const tabs = document.querySelector('#tabs');
    if (tabs) {
        if (config.backgroundColorToolbar) {
            tabs.style.backgroundColor = config.backgroundColorToolbar;
        }
        if (config.toolbarBorderColor) {
            tabs.style.borderBottom = `3px solid ${config.toolbarBorderColor}`;
        }
        if (config.navLinkHoverShadow) {
            tabs.style.boxShadow = config.navLinkHoverShadow;
        }
    }

    const tabElements = document.querySelectorAll('.tab');
    tabElements.forEach(tab => {
        if (config.buttonBackgroundColor) {
            tab.style.backgroundColor = config.buttonBackgroundColor;
        } else if (config.backgroundColorToolbar) {
            tab.style.backgroundColor = config.backgroundColorToolbar;
        }

        if (config.textColor) {
            tab.style.color = config.textColor;
        }

        if (config.buttonHoverColor) {
            tab.addEventListener('mouseover', () => {
                tab.style.backgroundColor = config.buttonHoverColor;
                tab.style.color = '#ffffff'; 
            });
            tab.addEventListener('mouseout', () => {
                tab.style.backgroundColor = config.buttonBackgroundColor || config.backgroundColorToolbar;
                tab.style.color = config.textColor;
            });
        }

        const closeBtn = tab.querySelector('p.close');
        if (closeBtn && config.textColor) {
            closeBtn.style.color = config.textColor;
        }
    });

    const createTabs = document.querySelectorAll('#create_tab, .create_tab');
    createTabs.forEach(createTab => {
        if (config.buttonBackgroundColor) {
            createTab.style.backgroundColor = config.buttonBackgroundColor;
        } else if (config.backgroundColorToolbar) {
            createTab.style.backgroundColor = config.backgroundColorToolbar;
        }

        if (config.textColor) {
            createTab.style.color = config.textColor;
        }

        if (config.buttonHoverColor) {
            createTab.addEventListener('mouseover', () => {
                createTab.style.backgroundColor = config.buttonHoverColor;
                createTab.style.color = '#ffffff';
            });
            createTab.addEventListener('mouseout', () => {
                createTab.style.backgroundColor = config.buttonBackgroundColor || config.backgroundColorToolbar;
                createTab.style.color = config.textColor;
            });
        }
    });
}




const themes = {
    // Mocha Theme
    Mocha: {
        backgroundColorMain: '#F3E5AB',
        backgroundColorToolbar: '#8B4513',
        textColor: '#4B2E83',
        gradientBackground: 'linear-gradient(to bottom, #A0522D, #F3E5AB)',
        toolbarBorderColor: '#A0522D',
        buttonBackgroundColor: '#D2691E',
    },

    // Ocean Breeze Theme
    OceanBreeze: {
        backgroundColorMain: '#A0D9FF',
        backgroundColorToolbar: '#004D73',
        textColor: '#FFFFFF',
        gradientBackground: 'linear-gradient(to bottom, #004D73, #A0D9FF)',
        toolbarBorderColor: '#003850',
        buttonBackgroundColor: '#007BA7',
    },

    // Neon Night Theme
    NeonNight: {
        backgroundColorMain: '#000000',
        backgroundColorToolbar: '#1F1F1F',
        textColor: '#00FF00',
        gradientBackground: 'linear-gradient(to bottom, #0D0D0D, #2E2E2E)',
        toolbarBorderColor: '#00FF00',
        buttonBackgroundColor: '#00FF00',    },

    // Vintage Rose Theme
    VintageRose: {
        backgroundColorMain: '#F9E4E4',
        backgroundColorToolbar: '#D0A6A6',
        textColor: '#6D3F3F',
        gradientBackground: 'linear-gradient(to bottom, #D0A6A6, #F9E4E4)',
        toolbarBorderColor: '#B94D6C',
        buttonBackgroundColor: '#B94D6C',
    },

    // Forest Green Theme
    ForestGreen: {
        backgroundColorMain: '#E8F5E9',
        backgroundColorToolbar: '#2E7D32',
        textColor: '#1B5E20',
        gradientBackground: 'linear-gradient(to bottom, #2E7D32, #E8F5E9)',
        toolbarBorderColor: '#1B5E20',
        buttonBackgroundColor: '#1B5E20',
    },

    // Twilight Purple Theme
    TwilightPurple: {
        backgroundColorMain: '#EDE7F6',
        backgroundColorToolbar: '#6A1B9A',
        textColor: '#AB47BC',
        gradientBackground: 'linear-gradient(to bottom, #6A1B9A, #EDE7F6)',
        toolbarBorderColor: '#AB47BC',
        buttonBackgroundColor: '#AB47BC',
    },

    // Sandy Beach Theme
    SandyBeach: {
        backgroundColorMain: '#FFF3E0',
        backgroundColorToolbar: '#FFAB91',
        textColor: '#BF360C',
        gradientBackground: 'linear-gradient(to bottom, #FFAB91, #FFF3E0)',
        toolbarBorderColor: '#BF360C',
        buttonBackgroundColor: '#BF360C',
    },

    // Arctic Chill Theme
    ArcticChill: {
        backgroundColorMain: '#E1F5FE',
        backgroundColorToolbar: '#0288D1',
        textColor: '#0277BD',
        gradientBackground: 'linear-gradient(to bottom, #0288D1, #E1F5FE)',
        toolbarBorderColor: '#0277BD',
        buttonBackgroundColor: '#0277BD',
    },

    // Sunset Orange Theme
    SunsetOrange: {
        backgroundColorMain: '#FFEBEE',
        backgroundColorToolbar: '#FF7043',
        textColor: '#BF360C',
        gradientBackground: 'linear-gradient(to bottom, #FF7043, #FFEBEE)',
        toolbarBorderColor: '#BF360C',
        buttonBackgroundColor: '#BF360C',
    },

    // Midnight Blue Theme
    MidnightBlue: {
        backgroundColorMain: '#001F3F',
        backgroundColorToolbar: '#003366',
        textColor: '#E0E0E0',
        gradientBackground: 'linear-gradient(to bottom, #003366, #001F3F)',
        toolbarBorderColor: '#003366',
        buttonBackgroundColor: '#003366',
    }
};

if (localStorage.getItem("theme") != null && localStorage.getItem("theme") != "nul" && window.location.href.includes("launch.html") == false) {
    updateStyles(themes[localStorage.getItem("theme")]);
}
