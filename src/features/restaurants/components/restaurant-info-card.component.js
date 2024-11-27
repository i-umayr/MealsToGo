import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Text } from "../../../components/typography/text.component";
import { Favourite } from "../../../components/favourites/favourite.component";
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  RatingContainer,
  Icon,
  Address,
  RightContainer,
  Row,
} from "./restaurant-info-card.styles";

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
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Row>
          <RatingContainer>
            {ratingArray.map((_, index) => (
              <SvgXml key={`star-${index}`} xml={star} width={20} height={20} />
            ))}
          </RatingContainer>
          <RightContainer>
            {isClosedTemporarily && (
              <Text variant="error">Closed Temporarily</Text>
            )}
            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}

            <Icon source={{ uri: icon }} />
          </RightContainer>
        </Row>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
