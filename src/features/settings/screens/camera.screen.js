import React, { useState, useEffect, useRef, useContext } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  View,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
  Text,
} from "react-native";

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
    return <View />;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"front"}
        ref={(camera) => (cameraRef.current = camera)}
      ></CameraView>
      <TouchableOpacity style={styles.button} onPress={snap}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
