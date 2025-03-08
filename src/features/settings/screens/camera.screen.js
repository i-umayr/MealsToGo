import React, { useState, useEffect, useRef, useContext } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Alert, Linking, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Camera = styled(CameraView)`
  flex: 1;
`;

const Button = styled(TouchableOpacity)`
  position: absolute;
  bottom: 50px;
  align-self: center;
  background-color: black;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  color: white;
  text-align: center;
`;

export const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasAskedPermission, setHasAskedPermission] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const cameraRef = useRef();

  const snap = async () => {
    console.log("Taking picture");
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      if (permission === null) return;
      if (!permission.granted && !hasAskedPermission) {
        setHasAskedPermission(true);
        Alert.alert(
          "Camera Permission",
          "We need your permission to use the camera",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                const result = await requestPermission();
                if (!result.granted && !result.canAskAgain) {
                  Alert.alert(
                    "Permission Required",
                    "Camera access is required to use this feature. Please enable it in the app settings.",
                    [
                      {
                        text: "Open Settings",
                        onPress: () => Linking.openSettings(),
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                    ]
                  );
                }
              },
            },
          ]
        );
      }
    };

    checkPermission();
  }, [permission, hasAskedPermission, requestPermission]);

  if (!permission?.granted) {
    return <Container />;
  }

  return (
    <Container>
      <Camera facing={"front"} ref={(camera) => (cameraRef.current = camera)} />
      <Button onPress={snap}>
        <ButtonText>Take Picture</ButtonText>
      </Button>
    </Container>
  );
};
