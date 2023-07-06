import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
export const MyStylesHome = () =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
      }),
    [],
  );
