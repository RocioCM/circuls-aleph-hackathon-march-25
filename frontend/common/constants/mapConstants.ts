export const DEFAULT_MAP_CENTER = {
  // Mendoza, Argentina
  lat: -32.883256365094795,
  lng: -68.89971913904145,
};

export const MAP_KEY = 'AIzaSyAS6kT2zo2gcsTfGILwCAEzw3XkKdL8DJ4';

export const MAP_PARAMS = {
  zoom: 15,
  mapTypeId: 'roadmap',
  gestureHandling: 'greedy',
  disableDefaultUI: true,
  styles: [
    {
      featureType: 'poi.attraction',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.government',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.place_of_worship',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.sports_complex',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.medical',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};

export default MAP_PARAMS;
