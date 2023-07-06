import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {MyStylesHome} from './styles';
import Navigator from '@/routers/Navigator';
import ScreenName from '@/common/screenNames';
import {useAppStore} from '@/hooks';
import HeaderBar from '@/components/header';
import {Languages} from '@/locales/Languages';

const Home = () => {
  const styles = MyStylesHome();
  const {common} = useAppStore();
  return (
    <View>
      <HeaderBar title={Languages.home.homeName} isLight={false} noStatusBar hasBack />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Navigator.navigateToDeepScreen([ScreenName.authStack, ScreenName.login])}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => common.setCount()}>
          <Text>UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
