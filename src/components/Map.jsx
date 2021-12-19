import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

import data from "../data/data.json";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import haversine from "haversine-distance";

export default function Map() {
  const [markers, setMarkers] = useState(data);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [distance, setDistance] = useState(0);
  const [canCalculate, setCanCalulate] = useState(false);

  let activeMarker = 0;
  const [value, onChange] = useState([
    new Date("2021-01-01"),
    new Date("2022-01-01"),
  ]);

  const buttonHandler = () => {
    activeMarker = 0;
    filteredMarkers.map((it) => {
      if (it.show) {
        activeMarker++;
      }
      return activeMarker;
    });
    if (activeMarker === 2) {
      setCanCalulate(true);
    } else {
      setCanCalulate(false);
    }
  };

  const distanceCalc = () => {
    let haversinePoints = filteredMarkers.filter((el) => el.show === true);
    let haversine1 = {
      lat: haversinePoints[0].lat,
      lng: haversinePoints[0].lng,
    };
    let haversine2 = {
      lat: haversinePoints[1].lat,
      lng: haversinePoints[1].lng,
    };

    console.log(haversine(haversine1, haversine2));
    setDistance(haversine(haversine1, haversine2));
  };

  useEffect(() => {
    data.forEach((place) => {
      place.show = false; //
    });
    setMarkers(data);
  }, []);

  useEffect(() => {
    buttonHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMarkers, distance]); 

  useEffect(() => {
    let StartDate = value[0];
    let EndDate = value[1];

    let filteredMarkers = markers.filter(
      (el) =>
        new Date(el.date_created) >= StartDate &&
        new Date(el.date_created) < EndDate
    );
    setFilteredMarkers(filteredMarkers);
    console.log("Filterd", filteredMarkers);
    console.log("All", markers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChildClickCallback = (key) => {
    setDistance(0);

    setFilteredMarkers(
      filteredMarkers.map((item) => {
        if (item.id === Number(key)) {
          return {
            ...item,
            show: !item.show,
          };
        }
        return item;
      })
    );
  };

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyB9YawiKpSUTmtloikHqfiDyj1bXohG7PI",
          language: "en",
          region: "US",
        }}
        defaultCenter={{ lat: 58.2608, lng: 26.53234 }}
        defaultZoom={10}
        onChildClick={onChildClickCallback}
      >
        {filteredMarkers.map((point) => {
          return (
            <Marker
              key={point.id}
              lat={point.lat}
              lng={point.lng}
              text={point.id}
              show={point.show}
            />
          );
        })}
      </GoogleMapReact>
      <div className="py-6 px-6">
        <DateRangePicker format="y-MM-dd" onChange={onChange} value={value} />
      </div>
      <h1 className="text-blue-700 text-xl font-sans pb-1 ">
        Choose 2 points to calculate distance:
      </h1>
      {canCalculate && (
        <div>
          <button
            onClick={distanceCalc}
            className="px-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Calculate Distance
          </button>
          <p className="text-gray-700 text-lg font-serif pb-1 ">
            {distance.toPrecision(5)} meters
          </p>
        </div>
      )}
    </div>
  );
}
