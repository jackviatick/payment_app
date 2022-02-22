import {StyleSheet} from 'react-native';
import {colors} from 'constant/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  tabview: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  slide: {
    height: 120,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  text: {
    color: colors.white,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 10,
  },
  shadow: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
