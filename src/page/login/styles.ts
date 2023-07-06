import {Configs} from '@/common/Configs';
import {COLORS} from '@/theme';
import {SCREEN_WIDTH} from '@/utils/DimensionUtils';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    width: SCREEN_WIDTH * 0.85,
    marginBottom: Configs.FontSize.size5,
  },
  labelStyle: {
    textAlign: 'left',
    marginBottom: Configs.FontSize.size8,
  },
  button: {
    width: SCREEN_WIDTH * 0.85,
    height: Configs.FontSize.size40,
  },
});

export default styles;
