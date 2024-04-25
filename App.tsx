import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCameraView, setShowCameraView] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
      showCameraView ? <View style={styles.container}>
      <CameraView style={styles.camera} facing={'back'} />
      <Button onPress={() => setShowCameraView(false)} title={'Hide Camera'} />
    </View> : <View style={{flex: 1, justifyContent: 'center'}}><Button onPress={() => setShowCameraView(true)} title={'Show Camera'} /></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
});