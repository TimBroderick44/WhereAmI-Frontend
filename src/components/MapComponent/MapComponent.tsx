import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import axios from 'axios';
import style from './MapComponent.module.scss';
import { MapComponentProps } from '../../types';

const MapComponent: React.FC<MapComponentProps> = ({ suburb }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | undefined>();

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${suburb}+NSW+Australia&key=AIzaSyDqhTaYayiCuDzP5DzO7w0rhlSpIj-_2Fo`
        );

        if (response.data.status === 'OK') {
          const location = response.data.results[0]?.geometry.location;
          if (location) {
            setCenter(location);
          } else {
            console.error('No location found in Geocoding API response');
          }
        } else {
          console.error('Geocoding API error:', response.data.status, response.data.error_message);
        }
      } catch (error) {
        console.error('Error fetching geocode data:', error);
      }
    };

    fetchCoordinates();
  }, [suburb]);

  return (
    center ? (
      <GoogleMap
        mapContainerClassName={style.mapContainer}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    ) : (
      <p>Loading map...</p>
    )
  );
};

export default MapComponent;
