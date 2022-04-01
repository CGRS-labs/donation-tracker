import React, { useMemo, useState } from 'react';
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
import cities from '../../../data/cities.json';

export default function MapPage({ lat = 40, long = -100 }) {

  // Fetch map data from database
  // need to store lat, longitude in database
  // can convert using https://developer.myptv.com/Documentation/Geocoding%20API/API%20Reference.htm
  // or mapbox geocode api
  // From elephantsql in prod
  // from json-server in dev

  const [popupInfo, setPopupInfo] = useState(null);

  const markers = useMemo(() => cities.map((city, index) => (
    <Marker
      key={index}
      longitude={city.longitude}
      latitude={city.latitude}
      anchor="bottom"
    >
      <Pin onClick={() => setPopupInfo(city)} />
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
          <b>Chapter:</b> {popupInfo.city}<br />
          <b>Address:</b> {popupInfo.city}<br />
          <b>Phone:</b> {popupInfo.city}<br />
          <b>Email:</b> {popupInfo.city}<br />
        </div>
      </Popup>
    }
  </Map>;

}


