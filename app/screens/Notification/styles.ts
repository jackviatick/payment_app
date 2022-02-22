import {StyleSheet} from 'react-native';
import {colors} from 'constant/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    paddingHorizontal: 15,
  },
  tabview: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  slide: {
    height: 180,
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
  smallCard: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  centerSmallCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallLabel: {
    height: 30,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#e2c349',
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.black,
  },
  date: {
    fontSize: 16,
    lineHeight: 25,
    color: '#a1a1a1',
  },
  price: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.pink,
  },
  mediumGreyText: {
    color: colors.mediumGrey,
  },
  hideText: {
    marginTop: 15,
    marginHorizontal: 15,
    color: '#a1a1a1',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  fontWeightBold: {
    marginTop: 15,
    fontWeight: 'bold',
  },
});
