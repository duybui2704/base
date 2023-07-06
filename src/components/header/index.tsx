import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import IcBack from '../../assets/svg/common/ic_right.svg';
import Navigator from '@/routers/Navigator';
import {COLORS} from '@/theme';
import {Touchable} from '@/components/elements/touchable';
import {HeaderProps} from './types';
import {TYPE_FORMAT_HEADER_BAR} from '@/common/Constants';
import {styles} from './styles';

export const HeaderBar = ({
  onBackPressed,
  onGoBack,
  title,
  hasBack,
  noHeader,
  noStatusBar,
  isLight,
  imageBackground,
  exitApp,
}: HeaderProps) => {
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle(
        isFocused ? TYPE_FORMAT_HEADER_BAR.DARK_CONTENT : TYPE_FORMAT_HEADER_BAR.LIGHT_CONTENT,
        true,
      );
    }
  }, [isFocused]);

  const _onBackPressed = useCallback(() => {
    if (!exitApp) {
      if (hasBack && onBackPressed) {
        onBackPressed();
      } else if (onGoBack) {
        onGoBack();
      } else {
        Navigator.goBack();
      }
      return true;
    }
    return false;
  }, [exitApp, hasBack, onBackPressed, onGoBack]);

  const renderBack = useMemo(() => {
    return (
      <Touchable style={styles.goBack} onPress={_onBackPressed} size={40}>
        <IcBack width={27} height={27} />
      </Touchable>
    );
  }, [_onBackPressed]);

  const renderTitle = useMemo(() => {
    return (
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={!exitApp ? styles.titleCenter1 : styles.titleCenter}>
          {title}
        </Text>
      </View>
    );
  }, [exitApp, title]);

  return (
    <View style={styles.container}>
      {noStatusBar ? null : (
        <StatusBar
          animated
          translucent
          backgroundColor={COLORS.TRANSPARENT}
          barStyle={
            isLight ? TYPE_FORMAT_HEADER_BAR.LIGHT_CONTENT : TYPE_FORMAT_HEADER_BAR.DARK_CONTENT
          }
        />
      )}
      {!noHeader && !exitApp && (
        <View style={styles.headerContainer}>
          {renderTitle}
          {!exitApp && (hasBack ? renderBack : null)}
        </View>
      )}
    </View>
  );
};

export default HeaderBar;
