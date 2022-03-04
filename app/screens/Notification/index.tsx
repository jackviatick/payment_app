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

  const renderSmallCard = (name: string, date: string) => {
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
        <View>
          <Text style={styles.price}>RM 72.00</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hideText} />
      <View style={styles.titleView}>
        <Text style={styles.title}>Notification</Text>
      </View>
      <Text style={styles.fontWeightBold}>Today</Text>
      {renderSmallCard('UCommune Transaction', '18, February, 2022')}

      <Text style={styles.fontWeightBold}>Yesterday</Text>
      {renderSmallCard('Keg Valley', '17, February, 2022')}
      {renderSmallCard('Keg Valley', '17, February, 2022')}
      {renderSmallCard('Keg Valley', '17, February, 2022')}
      {renderSmallCard('Keg Valley', '17, February, 2022')}
      {renderSmallCard('Keg Valley', '17, February, 2022')}
    </ScrollView>
  );
};

export default Notification;
