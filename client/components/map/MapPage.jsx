import React, { useEffect, useState } from 'react';

import MarkerMap from './MarkerMap';
import MapPanel from './MapPanel';

export default function MapPage() {
  // ask for users current location
  const [coords, setCoords] = useState([undefined, undefined]);
  const [chapter, setChapter] = useState();
  const [chapterItems, setChapterItems] = useState([]);

  // Mock data
  // import geojson from '../../../data/geojson';
  // import cities from '../../../data/cities.json';
  const [markerData, setMarkerData] = useState([]);

  useEffect(async () => {
    // get marker data on initial load.
    const { chapters: markers } = await fetch('/api/chapters').then(res => res.json());
    setMarkerData(markers);
  }, []);

  useEffect(async () => {
    // This used to be a customized list of items per chapter
    const { items } = await fetch('/api/items').then(res => res.json());
    const itemList = items.filter(item => item.total_needed < item.total_received).map(item => item.name);
    setChapterItems(itemList);

  }, []);

  return (
    <div id='map-container'>
      {<MapPanel
        itemList={chapterItems}
        chapter={chapter}
      />}
      <MarkerMap
        lat={coords[0]}
        long={coords[1]}
        markerData={markerData}
        setSelected={(chapter) => {
          setChapter(chapter);
          // setChapterItems([]);
        }}
        popupInfo={chapter}
      />
    </div>
  );
}
