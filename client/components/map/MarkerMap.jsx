import React, { useMemo, useState, useEffect } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import Pin from './Pin';

export default function MarkerMap({ lat = 40, long = -100, markerData, setSelected, popupInfo }) {
  const [coords, setCoords] = useState([lat, long]);

  useEffect(() => {
    // get the user's current location on initial render
    navigator.geolocation.getCurrentPosition((position) => setCoords([position.coords.latitude, position.coords.longitude]));
  }, []);

  const markers = useMemo(() => markerData?.map((marker, index) => (
    marker.latitude && marker.longitude && <Marker
      key={index}
      longitude={marker.longitude}
      latitude={marker.latitude}
      anchor="bottom"
    >
      <Pin onClick={() => setSelected(marker)} />
    </Marker>
  )), [markerData]);

  return <Map
    initialViewState={{
      zoom: 4,
      bearing: 0,
      pitch: 0,
    }}
    latitude={coords[0]}
    longitude={coords[1]}
    onDrag={(e) => {
      setCoords([e.viewState.latitude, e.viewState.longitude]);
    }}
    style={{ width: '100%', height: '100%' }}
    mapStyle="mapbox://styles/mapbox/dark-v10"
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
        onClose={() => setSelected(null)}
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


