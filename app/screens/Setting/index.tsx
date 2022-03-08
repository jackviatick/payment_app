import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from 'constant/colors';

const Setting = () => {
  const layout = useWindowDimensions();
  const renderCard = (title: string, icon: string) => {
    return (
      <View
        style={{
          width: 0.42 * layout.width,
          height: 0.4 * layout.width,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: colors.white,
          margin: 10,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
          }}>
          <Ionicons name={icon} size={20} color={colors.white} />
        </View>
        <Text style={{marginTop: 20, color: colors.black}}>{title}</Text>
      </View>
    );
  };

  return (
    <View>
      <View>
        <Text style={{marginTop: 15, marginHorizontal: 15, color: '#a1a1a1'}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 15,
          }}>
          <Text style={styles.title}>Settings</Text>
          <View>
            <Ionicons name="people-circle" size={30} color={colors.primary} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {renderCard('My Information', 'information-sharp')}
          {renderCard('My Notice', 'mail-open-sharp')}
          {renderCard('My Contact Details', 'call-sharp')}
          {renderCard('My Credentials', 'lock-closed-sharp')}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'center',
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

export default Setting;
