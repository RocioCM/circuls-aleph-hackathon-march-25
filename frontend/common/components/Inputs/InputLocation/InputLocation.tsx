import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

import { Loader } from '@googlemaps/js-api-loader';
import { toast } from 'react-toastify';
import mapParams, {
  DEFAULT_MAP_CENTER,
  MAP_KEY,
} from '@/common/constants/mapConstants';
import { FormHandleChange } from '@/common/hooks/useForm/types';
import cn from '@/common/utils/classNames';

interface Props {
  center?: { lat: number; lng: number };
  name: string;
  value: { lat: number; lng: number } | null;
  handleChange: FormHandleChange;
  className?: string;
  searchInputElementId?: string;
  onSearchAddressSelected?: (address: string) => void;
}

const loader = new Loader({
  apiKey: MAP_KEY,
  version: 'weekly',
});

const InputLocation: React.FC<Props> = ({
  center = DEFAULT_MAP_CENTER,
  name,
  value,
  handleChange,
  className = '',
  searchInputElementId = '',
  onSearchAddressSelected = () => {},
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const pinnedMarker = useRef<any>(null);
  const suggestionsMarkers = useRef<any[]>([]);

  const parseValue = (value: Props['value']) => {
    if (!value) return null;
    const { lat, lng } = value;
    return { lat: Number(lat), lng: Number(lng) };
  };

  const clearSuggestions = () => {
    suggestionsMarkers.current.forEach((marker) => marker.setMap(null));
    suggestionsMarkers.current = [];
  };

  const handleMapClick = (e: any) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (lat && lng) {
      handleChange(name, { lat, lng });
      // Pan to the new location but upper the pin to center the address on the upper screen
      map.current?.panTo({
        lat: lat - 0.0007,
        lng: lng,
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat, lng } },
        (results: { formatted_address: any }[], status: string) => {
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;
            const input = document.getElementById(
              searchInputElementId
            ) as HTMLInputElement;
            if (input) {
              input.value = address;
            }
            onSearchAddressSelected(address);
          } else {
            toast.error('No se pudo obtener la dirección.');
          }
        }
      );
      clearSuggestions();
    }
  };

  const initSearchBar = async () => {
    if (!searchInputElementId || !map.current) return;
    const input = document.getElementById(
      searchInputElementId
    ) as HTMLInputElement;
    if (!input) return;

    const googleMapsLibrary = await loader.importLibrary('places');
    const searchBox = new googleMapsLibrary.SearchBox(input);
    map.current?.addListener('bounds_changed', () => {
      searchBox.setBounds(map.current?.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      clearSuggestions();
      const place = places[0];

      map.current?.panTo({
        lat: place.geometry?.location!.lat(),
        lng: place.geometry?.location!.lng(),
      });

      onSearchAddressSelected(`${place.formatted_address}`);
      handleMapClick({ latLng: place.geometry?.location });
    });
  };

  const updatePinnedMarker = () => {
    if (!map.current) return;
    const location = parseValue(value);

    if (!location) {
      pinnedMarker.current?.setMap(null);
      return;
    }

    const newMarker = new window.google.maps.Marker({
      position: location,
      map: map.current,
    });
    // Pan to the new location but upper the pin to center the address on the upper screen
    map.current?.panTo({
      lat: location.lat - 0.001,
      lng: location.lng,
    });

    newMarker.addListener('click', () => handleChange(name, null));

    if (pinnedMarker.current) {
      pinnedMarker.current.setMap(null);
    }
    pinnedMarker.current = newMarker;
  };

  const initMap = async () => {
    try {
      const googleMapsLibrary = await loader.importLibrary('maps');
      const newMap = new googleMapsLibrary.Map(mapElement.current, {
        ...mapParams,
        center,
      });
      map.current = newMap;
      newMap.addListener('click', handleMapClick);
      updatePinnedMarker();
      initSearchBar();
    } catch (e) {
      toast.error('Error al cargar el mapa.');
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    updatePinnedMarker();
  }, [value]);

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <div
        ref={mapElement}
        className="absolute top-0 left-0 w-full h-[calc(100%+1rem)]" // Add 1rem to hide Maps Footer Logo
      ></div>
    </div>
  );
};

export default InputLocation;
