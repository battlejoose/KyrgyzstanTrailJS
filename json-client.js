// Mock JSON Client for web browser using localStorage

const JSONClient = function(host, port) {
    this.host = host;
    this.port = port;
    
    // Initialize localStorage if needed
    if (!localStorage.getItem('TRAIL')) {
        localStorage.setItem('TRAIL', JSON.stringify({}));
    }
    
    this.read = function(database, key, lock) {
        try {
            const db = JSON.parse(localStorage.getItem(database) || '{}');
            return db[key] || undefined;
        } catch (e) {
            console.putmsg('Error reading from storage: ' + e.message + '\n');
            return undefined;
        }
    };
    
    this.write = function(database, key, value, lock) {
        try {
            const db = JSON.parse(localStorage.getItem(database) || '{}');
            db[key] = value;
            localStorage.setItem(database, JSON.stringify(db));
            return true;
        } catch (e) {
            console.putmsg('Error writing to storage: ' + e.message + '\n');
            return false;
        }
    };
    
    this.cycle = function() {
        // No-op for mock implementation
        return true;
    };
    
    this.disconnect = function() {
        // No-op for mock implementation
        return true;
    };
};

// Add some sample data for demonstration
(function initializeSampleData() {
    const sampleScores = [
        {
            name: "Pioneer Pete",
            bbs: "LocalHost BBS",
            score: 2150,
            date: "2024-01-15"
        },
        {
            name: "Trail Blazer",
            bbs: "Web Browser",
            score: 1980,
            date: "2024-01-10"
        }
    ];
    
    const sampleGraves = [
        {
            name: "Unlucky Joe",
            bbs: "LocalHost BBS",
            score: 450,
            cause: "died of dysentery",
            engraving: "Should have bought more supplies",
            date: "2024-01-14"
        },
        {
            name: "Reckless Rick",
            bbs: "Web Browser",
            score: 780,
            cause: "drowned while fording the river",
            engraving: "The water looked shallow enough...",
            date: "2024-01-12"
        },
        {
            name: "Hungry Hannah",
            bbs: "LocalHost BBS",
            score: 1200,
            cause: "starved to death",
            engraving: "Forgot to hunt",
            date: "2024-01-08"
        }
    ];
    
    // Only initialize if no data exists
    const db = JSON.parse(localStorage.getItem('TRAIL') || '{}');
    if (!db['TRAIL.SCORES']) {
        db['TRAIL.SCORES'] = sampleScores;
    }
    if (!db['TRAIL.GRAVES']) {
        db['TRAIL.GRAVES'] = sampleGraves;
    }
    localStorage.setItem('TRAIL', JSON.stringify(db));
})(); 