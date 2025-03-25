## Features

- Interactive map centered on **Vienna, Austria** where I use predefined coordinates.
- Museum data fetched from the Overpass API (OpenStreetMap).  
- Clustering of nearby museums using Supercluster.  
- Custom map markers and popup with detailed information. 
- Escape key functionality to close popups using a custom hook for improved user experience. 
- Search bar with dropdown and auto navigation to selected museum location.
- Can mark/unmark museums as favorites (stored in localStorage).
- Only show favorite museums with a single click on a star icon. Click again to show all museums.
- Toast notification if no museums are saved as favorites.

## Running Locally

You will need to put the Mapbox API token in .env file to run this locally. You can get a free token on https://www.mapbox.com/.

1. Clone the project:
   ```bash
   git clone https://github.com/MrMoha93/museums-in-vienna.git
   cd museums-in-vienna

2. Install dependencies: npm install

3. Start the development server: npm run dev


