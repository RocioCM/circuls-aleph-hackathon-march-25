import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from '../Img';
import land from '@/public/assets/land.svg';
import styles from './Map.module.css';

/**
 * Renders a map from Google Maps API.
 * @param {string} linkMap - URL location.
 * @returns {JSX.Element}
 */
const Map = ({ linkMap }) => {
  const iframeRef = useRef(null);

  /** Returns the coordinates string from the linkMap. */
  const getCoordsString = () => {
    const regex = /([-.\d]+),([-.\d]+)/;
    const match = linkMap.match(regex);
    return match ? match[0] : null;
  };

  /** Returns true if the coordinates string is a valid lat,lng value. */
  const validCoords = () => {
    if (!linkMap) return false;

    const coordsStr = getCoordsString();
    if (!coordsStr) return false;

    const coords = coordsStr.split(',');

    return (
      coords.length >= 2 &&
      !isNaN(parseFloat(coords[0])) &&
      !isNaN(parseFloat(coords[1]))
    );
  };

  const API_KEY = 'AIzaSyAS6kT2zo2gcsTfGILwCAEzw3XkKdL8DJ4'; // Propi api key
  /// TODO: add permissions to API key and use this on constants file.

  useEffect(() => {
    if (iframeRef.current && validCoords()) {
      const coords = getCoordsString();
      const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&center=${coords}&zoom=17&q=${coords}`;

      // Accessing the iframe using ref
      iframeRef.current.src = mapUrl;
    }
  }, [linkMap]);

  return (
    <>
      {validCoords() ? (
        <iframe
          ref={iframeRef}
          className={styles.map}
          height="400"
          referrerPolicy="no-referrer-when-downgrade"
          src=""
          allowFullScreen
        ></iframe>
      ) : (
        <div className={styles.infoMapContainer}>
          <div className={styles.img}>
            <Img src={land} alt="Ubicación" />
          </div>
          <span className={styles.infoLink}>
            El mapa no se pudo cargar correctamente.
          </span>
        </div>
      )}
    </>
  );
};

Map.propTypes = {
  linkMap: PropTypes.string,
};

Map.defaultProps = {
  linkMap: null,
};

export default Map;
