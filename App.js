import React, { useState } from 'react';
import { Alert, Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const App = () => {
  const [data, setData] = useState('Scan Something');
  const [isScannerActive, setScannerActive] = useState(false);

  const handleScanButtonPress = () => {
    setScannerActive(true);
  };

  const handleQRCodeRead = ({ data }) => {
    setData(data);
    setScannerActive(false);
    if (data) {
      Linking.openURL(data).catch(err => {
        console.error('Failed to open URL:', err);
        Alert.alert('Invalid QR code', 'The QR code does not contain a valid URL.');
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
        animated={true}
        backgroundColor="black"
      />
      {isScannerActive ? (
        <QRCodeScanner
          onRead={handleQRCodeRead}
          reactivate={true}
          reactivateTimeout={500}
          flashMode={RNCamera.Constants.FlashMode.on}
          customMarker={
            <View style={{borderWidth:2,borderColor:'white',borderRadius:5,padding:100}}/>
          }
          // cameraType={('front', 'back')}
          cameraTimeout={15000}
          showMarker={true}
          topContent={
            <View style={{ justifyContent: 'center', marginBottom: 25 }}>
              <Text style={{ fontSize: 25, textAlign: 'center', color: 'black', fontWeight: '600' }}>
                Scanning...
              </Text>
            </View>
          }
          bottomContent={
            <View style={{ justifyContent: 'center', backgroundColor: 'black', padding: 15, borderRadius: 40 }}>
              <TouchableOpacity onPress={() => setScannerActive(false)}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: 'white' }}>Stop Scanning</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 30, textAlign: 'center', color: 'black', fontWeight: '600', marginBottom: 20 }}>
            Dharmik patel
          </Text>
          <TouchableOpacity onPress={handleScanButtonPress} style={{ backgroundColor: 'black', padding: 15, borderRadius: 40,marginHorizontal:90 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: 'white',textAlign:'center' }}>QR Code Scanner</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default App;
