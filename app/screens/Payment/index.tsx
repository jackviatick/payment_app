import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {colors} from 'constant/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigators/AppStack';
import {styles} from './styles';
type PaymentScreenProps = NativeStackScreenProps<NavigatorParamList, 'Payment'>;

const Payment = ({navigation}: PaymentScreenProps) => {
  const [visible, setVisible] = useState(false);
  const interval = useRef(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // @ts-ignore
      interval.current = setInterval(() => {
        setVisible(true);
      }, 5000);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // @ts-ignore
    return () => clearInterval(interval.current);
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '500',
          color: colors.black,
          marginHorizontal: 20,
          marginTop: 30,
        }}>
        Payment
      </Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('assets/images/cart.gif')}
          style={{height: 250, width: 250, alignSelf: 'center'}}
        />
        <Text style={styles.title}>
          Move your phone near the gateway to complete your payment!
        </Text>
      </View>

      <Modal transparent visible={visible}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: colors.black,
            position: 'absolute',
          }}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 300,
              backgroundColor: colors.grey,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: colors.primary,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.black,
                textAlign: 'center',
                marginVertical: 10,
                alignSelf: 'center',
              }}>
              Payment success
            </Text>
            <Text style={{marginVertical: 20, fontSize: 16}}>
              Your payment is successfully deducted!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                height: 100,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginBottom: -20,
              }}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  width: '45%',
                  height: 50,
                  backgroundColor: colors.white,
                  borderRadius: 8,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: colors.primary}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('Home');
                  // @ts-ignore
                  clearInterval(interval.current);
                }}
                style={{
                  width: '45%',
                  height: 50,
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: colors.white}}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Payment;
