import React from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Spacer } from "../../../components/spacer/spacer.component";

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.primary};
`;

const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.ui.primary};
`;

const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const RatingContainer = styled.View`
  flex-direction: row;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 3.3,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.round(rating)));
  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
        <Row>
          <RatingContainer>
            {ratingArray.map((_, index) => (
              <SvgXml key={`star-${index}`} xml={star} width={20} height={20} />
            ))}
          </RatingContainer>
          <LeftContainer>
            {isClosedTemporarily && (
              <Text varient="label" style={{ color: "red" }}>
                Closed Temporarily
              </Text>
            )}
            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}

            <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
          </LeftContainer>
        </Row>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
