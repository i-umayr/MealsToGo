import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { MapCallout } from "../components/map-callout.component";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";

import { Marker, Callout } from "react-native-maps";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, restaurants]);

  const renderPins = () =>
    restaurants.map((restaurant) => (
      <Marker
        key={restaurant.name}
        title={restaurant.name}
        coordinate={{
          latitude: restaurant.geometry.location.lat,
          longitude: restaurant.geometry.location.lng,
        }}
      >
        <Callout
          onPress={() =>
            navigation.navigate("Restaurants", {
              screen: "RestaurantDetail",
              params: { restaurant },
            })
          }
        >
          <MapCallout restaurant={restaurant} />
        </Callout>
      </Marker>
    ));

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {renderPins()}
      </Map>
    </>
  );
};
