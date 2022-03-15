import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from './styles';
import {stopModule, testNoti} from '../../services/NativeModule';
const Notification = () => {
  const stopSdk = async () => {
    await stopModule();
  };

  useEffect(() => {
    console.log('stop sdk');
    // stopSdk();
    testNoti();
  }, []);

  const renderSmallCard = (name: string, date: string, value: string) => {
    return (
      <View style={[styles.smallCard, styles.shadow]}>
        <View style={styles.centerSmallCard}>
          <View style={styles.smallLabel}>
            <Text style={styles.label}>E35</Text>
          </View>

          <View>
            <Text>
              <Text style={styles.mediumGreyText}>to:</Text>{' '}
              <Text style={styles.name}>{name}</Text>
            </Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={{position: 'absolute', alignSelf: 'center', right: 10}}>
          <Text style={styles.price}>{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, paddingBottom: 50}}>
        <Text style={styles.hideText} />
        <View style={styles.titleView}>
          <Text style={styles.title}>Notification</Text>
        </View>
        <Text style={styles.fontWeightBold}>Today</Text>
        {renderSmallCard(
          'UCommune Transaction Point',
          '19, March, 2022',
          'SGD 2.00',
        )}

        <Text style={styles.fontWeightBold}>Yesterday</Text>
        {renderSmallCard(
          'Woodlands Central Base',
          '18, March, 2022',
          'SGD 85.78',
        )}
        {renderSmallCard('Tuas Link Base Point', '18, March, 2022', 'SGD 29.99')}
        {renderSmallCard('SDC Gate 1', '18, March, 2022', 'SGD 9.99')}
        {renderSmallCard('SportHub Booth 2', '18, March, 2022', 'SGD 8.99')}
        {renderSmallCard('SportHub Booth 1', '18, March, 2022', 'SGD 5.99')}
      </View>
    </ScrollView>
  );
};

export default Notification;
