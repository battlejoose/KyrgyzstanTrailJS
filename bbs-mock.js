// Mock BBS functions for web browser compatibility

// Global variables for web interface
let outputDiv;
let userInput;
let inputLine;
let currentInputCallback = null;
let inputHistory = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    outputDiv = document.getElementById('output');
    userInput = document.getElementById('user-input');
    inputLine = document.getElementById('input-line');
    
    // Initially hide input until needed
    hideInput();
    
    // Handle input
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && currentInputCallback) {
            const value = userInput.value;
            inputHistory.push(value);
            userInput.value = '';
            hideInput();
            const callback = currentInputCallback;
            currentInputCallback = null;
            callback(value);
        }
    });
});

// Mock console object
const console = {
    putmsg: function(text) {
        if (!outputDiv) return;
        
        // Convert ANSI codes to HTML
        let html = text
            // Basic colors
            .replace(/\x01n/g, '</span><span style="color: #aaa; font-weight: normal;">') // normal
            .replace(/\x01h/g, '<span style="font-weight: bold;">') // high intensity
            .replace(/\x01i/g, '<span style="text-decoration: blink;">') // blink
            .replace(/\x01r/g, '<span class="ansi-red">') // red
            .replace(/\x01g/g, '<span class="ansi-green">') // green
            .replace(/\x01y/g, '<span class="ansi-yellow">') // yellow
            .replace(/\x01b/g, '<span class="ansi-blue">') // blue
            .replace(/\x01m/g, '<span class="ansi-magenta">') // magenta
            .replace(/\x01c/g, '<span class="ansi-cyan">') // cyan
            .replace(/\x01w/g, '<span class="ansi-white">') // white
            .replace(/\x01k/g, '<span class="ansi-black">') // black
            // Alternative notation
            .replace(/\\1n/g, '</span><span style="color: #aaa; font-weight: normal;">')
            .replace(/\\1h/g, '<span style="font-weight: bold;">')
            .replace(/\\1i/g, '<span style="text-decoration: blink;">')
            .replace(/\\1r/g, '<span class="ansi-red">')
            .replace(/\\1g/g, '<span class="ansi-green">')
            .replace(/\\1y/g, '<span class="ansi-yellow">')
            .replace(/\\1b/g, '<span class="ansi-blue">')
            .replace(/\\1m/g, '<span class="ansi-magenta">')
            .replace(/\\1c/g, '<span class="ansi-cyan">')
            .replace(/\\1w/g, '<span class="ansi-white">')
            .replace(/\\1k/g, '<span class="ansi-black">')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n');
        
        // Wrap in span if needed
        if (html.indexOf('<span') === -1) {
            html = '<span>' + html + '</span>';
        }
        
        outputDiv.innerHTML += html;
        scrollToBottom();
    },
    
    crlf: function() {
        this.putmsg('\r\n');
    },
    
    clear: function() {
        if (!outputDiv) return;
        outputDiv.innerHTML = '';
    },
    
    pause: function() {
        this.putmsg('\n[Press Enter to continue...]\n');
        return new Promise(resolve => {
            showInput();
            currentInputCallback = () => {
                hideInput();
                resolve();
            };
        });
    },
    
    getstr: function(maxLength) {
        return new Promise(resolve => {
            showInput();
            currentInputCallback = (value) => {
                if (maxLength && value.length > maxLength) {
                    value = value.substring(0, maxLength);
                }
                this.putmsg(value + '\n');
                resolve(value);
            };
        });
    },
    
    getnum: function(maxLength) {
        return new Promise(resolve => {
            showInput();
            currentInputCallback = (value) => {
                const num = parseInt(value) || 0;
                this.putmsg(value + '\n');
                resolve(num);
            };
        });
    },
    
    beep: function() {
        // Try to play a beep sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silently ignore audio errors
        }
    },
    
    screen_rows: 25 // Standard terminal height
};

// Helper functions
function showInput() {
    if (inputLine) {
        inputLine.style.display = 'flex';
        userInput.focus();
    }
}

function hideInput() {
    if (inputLine) {
        inputLine.style.display = 'none';
    }
}

function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// Mock file operations
const File = function(filename) {
    this.filename = filename;
    this.data = {};
    
    this.open = function(mode, shareable) {
        // Mock opening file
        if (this.filename.includes('server.ini')) {
            // Default server configuration
            this.data = {
                host: 'localhost',
                port: 10088
            };
        }
        return true;
    };
    
    this.close = function() {
        return true;
    };
    
    this.iniGetValue = function(section, key, defaultValue) {
        return this.data[key] || defaultValue;
    };
};

// Mock file functions
function file_cfgname(root, filename) {
    return root + '/' + filename;
}

// Mock js object
const js = {
    exec_dir: '.'
};

// Mock system object
const system = {
    timer: Date.now() / 1000  // Unix timestamp in seconds
};

// Update timer regularly
setInterval(() => {
    system.timer = Date.now() / 1000;
}, 100);

// Mock load function
function load(library) {
    if (library === 'sbbsdefs.js') {
        // Mock BBS definitions
        window.SYSOP = 'Sysop';
    } else if (library === 'json-client.js') {
        // Will be loaded separately
    }
}

// Make console methods async-compatible
const originalPutmsg = console.putmsg;
const originalPause = console.pause;
const originalGetstr = console.getstr;
const originalGetnum = console.getnum;

// Wrap the oregontrail.js execution to handle async operations
window.addEventListener('load', async () => {
    // Override console methods to handle promises
    console.putmsg = function(text) {
        originalPutmsg.call(this, text);
    };
    
    console.pause = async function() {
        await originalPause.call(this);
    };
    
    console.getstr = async function(maxLength) {
        return await originalGetstr.call(this, maxLength);
    };
    
    console.getnum = async function(maxLength) {
        return await originalGetnum.call(this, maxLength);
    };
}); 