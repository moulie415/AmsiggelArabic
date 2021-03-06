import React, {FunctionComponent, useState} from 'react';
import {SafeAreaView, Linking, Platform, Alert} from 'react-native';
import TabProps from '../types/TabProps';
import {Button} from 'react-native-paper';
import {Language} from '../types';
import globalStyles from '../styles/globalStyles';

const Contact: FunctionComponent<TabProps> = ({language}) => {
  const [loading, setLoading] = useState(false);
  const PHONE_NUMBER = '+212642596841';
  const openWhatsApp = async () => {
    setLoading(true);
    try {
      await Linking.openURL(`whatsapp://send?phone=${PHONE_NUMBER}`);
      setLoading(false);
    } catch (e) {
      try {
        if (Platform.OS === 'ios') {
          await Linking.openURL(
            'itms-apps://apps.apple.com/gb/app/whatsapp-messenger/id310633997',
          );
        } else {
          await Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.whatsapp',
          );
        }
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', margin: 20}}>
      <Button
        uppercase={false}
        loading={loading}
        icon="whatsapp"
        labelStyle={{ fontFamily: language === Language.BERBER ? globalStyles.arabic.fontFamily : undefined, fontSize: 20 }}
        onPress={openWhatsApp}
        mode="contained">
        {language === Language.BERBER ? 'ساول-اغ-د س-واتساب' : 'sawl-agh-d s-watsapp'}
      </Button>
      
    </SafeAreaView>
  );
};

export default Contact;
