import React, { useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";

const MapComponent = ({ coordinates }) => {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(coordinates || [0, 0]), // Default center if no coordinates provided
        zoom: 13,
      }),
    });

    // Add marker for user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        const userMarker = new Feature({
          geometry: new Point(fromLonLat([longitude, latitude])),
        });
        userMarker.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png",
              scale: 0.1,
            }),
          })
        );
        map.addLayer(
          new VectorLayer({
            source: new VectorSource({
              features: [userMarker],
            }),
          })
        );
      },
      (error) => {
        console.error(error.message);
      }
    );

    // Add marker for specified coordinates
    if (coordinates) {
      const specifiedMarker = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
      });
      specifiedMarker.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png",
            scale: 0.1,
          }),
        })
      );
      map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: [specifiedMarker],
          }),
        })
      );
    }

    // Clean up on unmount
    return () => {
      map.setTarget(null);
    };
  }, [coordinates]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default MapComponent;
