
import { useRef, useState, useEffect, useCallback } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './index.css';

const SmartLocationInput = ({ apiKey, enAccion, value = '' }) => {
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(value);
  const [locationData, setLocationData] = useState({
    address: '',
    lat: '',
    lng: '',
  });

  const geocodeAddress = useCallback( (address) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const formatted = results[0].formatted_address;

        setLocationData({
          address: formatted,
          lat,
          lng,
        });
        enAccion({
          address: formatted,
          lat,
          lng,
        })
        setInputValue(formatted);
      } else {
        setLocationData({
          address: 'No se pudo geocodificar',
          lat: '',
          lng: '',
        });
      }
    });
  },[enAccion]);

  // Hacer geocoding si viene un valor por defecto
  useEffect(() => {
    if (value && window.google) {
      geocodeAddress(value);
    }
  }, [value, geocodeAddress]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    /* if (value === '') {
      setLocationData({
        address: '',
        lat: '',
        lng: '',
      })
      return false;
    } */
    setInputValue(value);

    const coordRegex = /^\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\s*$/;
    const match = value.match(coordRegex);

    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[3]);

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const formatted = results[0].formatted_address;
          setInputValue(formatted);
          setLocationData({
            address: formatted,
            lat,
            lng,
          });
          enAccion({
            address: formatted,
            lat,
            lng,
          })
        } else {
          setLocationData({
            address: '',
            lat: '',
            lng: '',
          })
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // evita que se envíe formulario
      geocodeAddress(inputValue);
    }
  };

  const handlePlaceSelected = (place) => {
    const address = place.formatted_address || place.name || '';
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();
    geocodeAddress(address);
    setInputValue(address);
    setLocationData({
      address,
      lat,
      lng,
    });
  };

  return (
    <div style={{ width: '100%', paddingTop: 10 }} data-testid="smart-location-input">
      <label style={{ width: '100%', textAlign: 'left' }}>
        Dirección
        <Autocomplete
          ref={autocompleteRef}
          apiKey={apiKey}
          onPlaceSelected={handlePlaceSelected}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe dirección o coordenadas"
          options={{
            types: ['geocode'],
            componentRestrictions: { country: 'mx' },
          }}
          style={{ width: '100%', padding: '8px', height: 35, border: 'solid 1px #d9d9d9', borderRadius: '4px', fontSize: 15, fontWeight: 'normal' }}

        />
      </label>
      {locationData.address && (
        <div style={{ marginTop: 12, textAlign: 'left' }}>
          {locationData.address}<br />
          <strong>Lat:</strong> {locationData.lat}<br />
          <strong>Lng:</strong> {locationData.lng}
        </div>
      )}
    </div>
  );
};

export default SmartLocationInput;
