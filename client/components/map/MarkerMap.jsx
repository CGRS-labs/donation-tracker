import React, { useEffect, useMemo, useState } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import Pin from './Pin';

// Mock data
// import geojson from '../../../data/geojson';
// import cities from '../../../data/cities.json';

export default function MapPage({ lat = 40, long = -100 }) {

  const [popupInfo, setPopupInfo] = useState(null);
  const [markerData, setMarkerData] = useState([]);

  useEffect(async () => {
    // get marker data on initial load. 
    const markers = await fetch('/api/chapters').then(res => res.json());
    setMarkerData(markers);
  }, []);


  const markers = useMemo(() => markerData.map((marker, index) => (
    <Marker
      key={index}
      longitude={marker.longitude}
      latitude={marker.latitude}
      anchor="bottom"
    >
      <Pin onClick={() => setPopupInfo(marker)} />
    </Marker>
  )));

  return <Map
    initialViewState={{
      longitude: long,
      latitude: lat,
      zoom: 4,
      bearing: 0,
      pitch: 50,
    }}
    style={{ width: '100%', height: '100vh' }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
  >
    <GeolocateControl position="top-left" />
    <FullscreenControl position="top-left" />
    <NavigationControl position="top-left" />
    <ScaleControl />
    {markers}
    {
      popupInfo && <Popup
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => setPopupInfo(null)}
      >
        <div id="popup-info">
          <b>Chapter:</b> {popupInfo.name}<br />
          <b>Phone:</b> {popupInfo.phone}<br />
          <b>Email:</b> {popupInfo.email}<br />
          <b>Address:</b> <br />
          {`${popupInfo.street}`}<br />
          {`${popupInfo.city}, ${popupInfo.state} ${popupInfo.zip}`}<br />
        </div>
      </Popup>
    }
  </Map>;

}


