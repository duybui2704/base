import {Languages} from '@/locales/Languages';
import {COLORS} from '@/theme';
import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import styles from './styles';

const Loading = ({
  isOverview,
  isWhite,
  label,
}: {
  label?: string;
  isOverview?: boolean;
  isWhite?: boolean;
}) => {
  return (
    <>
      {isOverview && (
        <View style={styles.inline}>
          <ActivityIndicator size="large" color={isWhite ? COLORS.WHITE : COLORS.BLUE} />
          <Text style={styles.txt}>{Languages.common.loading}</Text>
        </View>
      )}
    </>
  );
};

export default Loading;
