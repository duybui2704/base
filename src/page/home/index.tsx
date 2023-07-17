import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MyStylesHome} from './styles';
import {useAppStore} from '@/hooks';
import HeaderBar from '@/components/header';
import {Languages} from '@/locales/Languages';
import {View, TouchableOpacity, Text} from 'react-native';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import {EnhancedComponent, EnhancedComponent1} from '../hoc/HOCTest';
import {MyTextInput, Button} from 'my-component';
import {BUTTON_STYLES} from '@/components/elements/button/constants';
import {TextFieldActions} from '@/components/elements/textfield/types';

const Home = () => {
  const styles = MyStylesHome();
  const {common, apiServices} = useAppStore();
  const [data, setData] = useState<any>([]);
  const refInput = useRef<TextFieldActions>(null);
  const onPress = () => {
    console.log('onpress');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    const resInfoAcc = await apiServices.common.getApiTest();
    setData(resInfoAcc.data);
    console.log('Login', resInfoAcc.data);
  }, [apiServices.common]);

  const onGetValue = () => {
    const valueText = refInput?.current?.getValue();
    console.log('text ==', valueText);
  };
  return (
    <>
      <HeaderBar title={Languages.home.homeName} isLight={false} noStatusBar hasBack />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Navigator.navigateToDeepScreen([ScreenName.authStack, ScreenName.login])}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => common.setCount()}>
          <Text>UP</Text>
        </TouchableOpacity>
        <View style={{height: 200, width: '100%'}}>
          <EnhancedComponent name="John" additionalProp={data} onPress={onPress} />
        </View>
        <View style={{height: 200, width: '100%'}}>
          <EnhancedComponent1 name="John" additionalProp={data} onPress={onPress} />
        </View>
        <MyTextInput ref={refInput} />
        <Button
          label={Languages.auth.login}
          buttonStyle={BUTTON_STYLES.BLUE}
          onPress={onGetValue}
        />
      </View>
    </>
  );
};

export default Home;
