# Oregon Trail JavaScript - Web Deployment

This is a web-deployed version of the Oregon Trail JavaScript game originally designed for BBS systems.

## Quick Start

1. Install Node.js if you haven't already (https://nodejs.org/)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to Play

- The game runs in your browser with a terminal-style interface
- Type your responses and press Enter when prompted
- Follow the on-screen instructions to make your journey to Oregon

## Features

- Full Oregon Trail gameplay from the 1978 BASIC version
- High scores and "tombstones" saved locally in your browser
- Terminal-style interface with ANSI color support
- Shooting mini-game where typing speed matters

## Deployment to Production

To deploy to a production server:

1. Set the PORT environment variable:
   ```bash
   export PORT=8080  # or your desired port
   ```

2. Run the server:
   ```bash
   node server.js
   ```

For services like Heroku, Railway, or Render, just push this code and they will automatically run `npm start`.

## Notes

- The game saves high scores and death records in browser localStorage
- The original BBS server integration has been replaced with local storage
- All game logic remains unchanged from the original version 