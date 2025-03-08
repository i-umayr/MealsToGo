import React, { useState, useEffect } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { View, StyleSheet, Alert, Linking } from "react-native";

export const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasAskedPermission, setHasAskedPermission] = useState(false);

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
      <CameraView style={styles.camera} facing={"front"}></CameraView>
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
});
