import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({ searchResult }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 51.509865,
    longtitude: -0.118092,
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
