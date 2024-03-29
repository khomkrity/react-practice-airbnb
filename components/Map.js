import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({ searchResult }) {
  const coordinates = searchResult.map(result => {
    return {
      latitude: result.lat,
      longitude: result.long,
    };
  });

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
  });
  const [selectedLocation, setSelectedLocation] = useState({});

  const renderMarker = searchResult.map(result => {
    return (
      <div key={result.long}>
        <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10}>
          <p
            role='img'
            aria-label='push-pin'
            className='cursor-pointer text-2xl animate-bounce'
            onClick={() => setSelectedLocation(result)}>
            📌
          </p>
        </Marker>
        {selectedLocation.long === result.long ? (
          <Popup
            latitude={result.lat}
            longitude={result.long}
            closeOnClick={true}
            onClose={() => setSelectedLocation({})}>
            {result.title}
          </Popup>
        ) : (
          false
        )}
      </div>
    );
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/omekrit/cku6zjqwk1wjr18r03c2ltdpu'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}>
      {renderMarker}
    </ReactMapGL>
  );
}

export default Map;
