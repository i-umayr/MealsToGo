import React from "react";

import { Text } from "react-native";
import styled from "styled-components";

const Image = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const CompactRestaurantInfo = ({ restaurant }) => {
  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numberOfLines={2}>
        {restaurant.name}
      </Text>
    </Item>
  );
};
