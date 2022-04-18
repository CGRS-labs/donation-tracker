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
    let mounted = true;
    // get marker data on initial load.
    // const { chapters: markers } = await fetch('/api/chapters').then(res => res.json());
    // setMarkerData(markers);
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      'query': `{
        chapters{
          name
          id
          latitude
          longitude
          city
          state
          zip
          phone
          email
          street
        }
      }`,
    };
    const options = {
      'method': 'POST',
      'headers': headers,
      'body': JSON.stringify(graphqlQuery)
    };
    fetch('http://localhost:3000/graphql', options)
      .then(res => res.json())
      .then(data => setMarkerData(data.data.chapters))
      .catch(error => console.log(error));
    return () => mounted = false;
    
  }, []);

  useEffect(async () => {
    // This used to be a customized list of items per chapter
    // const { items } = await fetch('/api/items').then(res => res.json());
    // const itemList = items.filter(item => item.total_needed < item.total_received).map(item => item.name);
    // setChapterItems(itemList);

    const headers = {
      'content-type': 'application/json',
    };

    const graphqlQuery = {
      'query': `{
        items {
          name
          total_needed
          total_received
        }
      }`,
    };

    const options = {
      'method': 'POST',
      'headers': headers,
      'body': JSON.stringify(graphqlQuery)
    };

    fetch('http://localhost:3000/graphql', options)
      .then(res => res.json())
      .then(data => {
        const filteredItems = data.data.items.filter((item) => {
          return (item.total_needed - item.total_received) > 0;
        }).map(filteredItem => filteredItem = filteredItem.name);
        setChapterItems(filteredItems);
      })
      .catch(error => console.log(error));

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
