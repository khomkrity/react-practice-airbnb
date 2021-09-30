import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
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

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/omekrit/cku6zjqwk1wjr18r03c2ltdpu'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}></ReactMapGL>
  );
}

export default Map;
