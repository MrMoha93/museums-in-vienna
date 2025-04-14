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
- Favorite badge count on star box. 
- Calculates distance from each museum to city center using the haversine formula.

### Distance calculation:
I needed to calculate the distance between two geographic points to display how far each museum is from the center of Vienna, meaning two pairs of latitude and longitude coordinates. Because the Earth is round, basic Pythagoras doesn't work well. Drawing a straight line between two lat/lon points gives incorrect results, especially over longer distances or near the poles. So I searched for a better way to calculate distance on a spherical surface, and found the Haversine formula. It's commonly used to calculate the distance between two points on a sphere, perfect for Earth. The formula accounts for the Earth's roundness and calculates how large the arc is between two points. It gives an angle in radians, which is then multiplied by the Earth's radius to get the distance in kilometers. When implementing it in JavaScript, I used Math.sin, Math.cos, Math.atan2, and Math.sqrt, because those are the math functions the formula is based on. I also converted degrees to radians since JavaScript's trig functions expect radians. The result is a stable solution that works globally, even if I'm currently only using it for museums in Vienna.


## Running Locally

You will need to put the Mapbox API token in .env file to run this locally. You can get a free token on https://www.mapbox.com/.

1. Clone the project:
   ```bash
   git clone https://github.com/MrMoha93/museums-in-vienna.git
   cd museums-in-vienna


2. Install dependencies: 
  ```bash
npm install
```

3. Start the development server: 

  ```bash
npm run dev
```

