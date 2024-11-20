import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.ui.primary};
`;

export const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;
export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const RatingContainer = styled.View`
  flex-direction: row;
`;

export const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
