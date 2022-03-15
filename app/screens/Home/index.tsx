import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  useWindowDimensions,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {styles} from 'screens/Home/styles';
import Carousel from 'react-native-snap-carousel';
import {colors} from 'constant/colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  Button,
  FormControl,
  Input,
  Modal,
  KeyboardAvoidingView,
} from 'native-base';
import {initBmsCustomer} from 'services/NativeModule';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import DropdownAlert from 'react-native-dropdownalert';

const Home = () => {
  const entries = [
    {id: 1, title: 'slide 1', color: colors.slide1},
    {id: 2, title: 'slide 2', color: colors.slide2},
    {id: 2, title: 'slide 3', color: colors.slide3},
  ];
  const {width} = Dimensions.get('window');
  // @ts-ignore
  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={[styles.slide, styles.shadow, {backgroundColor: item.color}]}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.boldText]}>VISA</Text>
          <Text style={[styles.text, styles.boldText]}>...</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.boldText]}>
            {'* * * *    * * * *   * * * *'}
          </Text>
          <Text style={[styles.text, styles.boldText]}>6778</Text>
        </View>
        <View style={[styles.row, styles.narrowPadding]}>
          <Text style={styles.text}>CARD HOLDER</Text>
          <Text style={styles.text}>EXPIRES</Text>
        </View>
        <View style={[styles.row, styles.noPadding]}>
          <Text style={[styles.text, styles.normalFontWeight]}>
            Firzanah Nazmi
          </Text>
          <Text style={[styles.text, styles.normalFontWeight]}>11/22</Text>
        </View>
      </View>
    );
  };

  const getUserData = async () => {
    return await AsyncStorage.getItem('USER_DATA');
  };

  const runSDK = () => {
    getUserData().then(data => {
      console.log('user dta ', data);
      if (!data) {
        setShowModal(true);
      } else {
        let userData = data.split(',');
        let id = userData[0];
        let phone = userData[1];
        let email = userData[2];
        initBmsCustomer(id, phone, email);
      }
    });
  };

  useEffect(() => {
    console.log('RN init sdk');
    getUserData().then(data => {
      console.log('user dta ', data);
      if (!data) {
        setShowModal(true);
      } else {
        let userData = data.split(',');
        let id = userData[0];
        let phone = userData[1];
        let email = userData[2];
        initBmsCustomer(id, phone, email);
      }
    });
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Sent'},
    {key: 'second', title: 'Received'},
  ]);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [loading, setLoading] = useState(false);

  let dropdownRef = useRef<DropdownAlert>(null);

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

  const FirstRoute = () => (
    <ScrollView style={styles.subTabContainer}>
      <View style={styles.subTabview}>
        <Text style={styles.smallText}>Search transaction</Text>
        <Ionicons color={'#ccc'} name="search-outline" size={15} />
      </View>
      <Text style={styles.fontWeightBold}>Today</Text>
      {renderSmallCard(
        'UCommune Transaction Point',
        '19, March, 2022',
        'SGD 2.00',
      )}

      <Text style={styles.fontWeightBold}>Yesterday</Text>
      {renderSmallCard('Woodlands Central Base', '18, March, 2022', 'SGD 85.78')}
      {renderSmallCard('Tuas Link Base Point', '18, March, 2022', 'SGD 29.99')}
      {renderSmallCard('SDC Gate 1', '18, March, 2022', 'SGD 9.99')}
      {renderSmallCard('SportHub Booth 2', '18, March, 2022', 'SGD 8.99')}
      {renderSmallCard('SportHub Booth 1', '18, March, 2022', 'SGD 5.99')}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: FirstRoute,
  });

  const checkEmail = (emailString: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(emailString);
  };

  const onSubmit = async () => {
    if (
      !!username &&
      !!phone &&
      email &&
      !invalidUsername &&
      !invalidEmail &&
      !invalidPhone
    ) {
      setShowModal(false);
      const date = new Date();
      let currentMillis = date.getMilliseconds();
      const id = currentMillis.toString();
      initBmsCustomer(id, phone, email)
        .then(res => {
          console.log('init customer success', res);
          dropdownRef?.current?.alertWithType(
            'success',
            'Success',
            'Customer has been successfully created!',
          );

          const user = id + ',' + phone + ',' + email;
          AsyncStorage.setItem('USER_DATA', user);
        })
        .catch(err => {
          dropdownRef?.current?.alertWithType(
            'error',
            'Error',
            'Create customer has failed!',
          );
        });
      setLoading(false);
    } else {
      setInvalidPhone(true);
      setInvalidUsername(true);
      setInvalidEmail(true);
      setLoading(false);
    }

    Keyboard.dismiss();
  };

  const onBlurName = () => {
    if (!username) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  };

  const onBlurEmail = () => {
    if (!email || !checkEmail(email)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const onBlurPhone = () => {
    if (!phone) {
      setInvalidPhone(true);
    } else {
      setInvalidPhone(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.balance}>Your balance</Text>
      <View style={styles.balanceNumber}>
        <Text style={styles.title}>SGD486.44</Text>
        <View>
          <Ionicons name="people-circle" size={30} color={colors.primary} />
        </View>
      </View>
      <Carousel
        // ref={c => {
        //   this._carousel = c;
        // }}
        loop
        layout={'default'}
        data={entries}
        renderItem={renderItem}
        sliderHeight={200}
        itemHeight={200}
        sliderWidth={width}
        itemWidth={width * 0.8}
      />
      <View style={[styles.tabview, {height: layout.height * 0.5}]}>
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              renderLabel={({route, focused}) => (
                <Text
                  style={[
                    focused ? styles.blackText : styles.mediumGreyText,
                    styles.tabViewTitle,
                  ]}>
                  {route.title}
                </Text>
              )}
              style={styles.whiteBackground}
              indicatorStyle={{
                backgroundColor: colors.orange,
              }}
            />
          )}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
      <Modal isOpen={showModal} size="lg">
        <KeyboardAvoidingView behavior="padding">
          <Modal.Content backgroundColor="white" maxWidth="400px" paddingX="2">
            <Modal.Body>
              <Text
                mt="3"
                alignSelf="center"
                fontSize="18"
                fontWeight="500"
                color={colors.primary}>
                Information
              </Text>
              <Text marginBottom="3">
                Provide your information to continue!
              </Text>
              <FormControl>
                <Input
                  onBlur={onBlurName}
                  value={username}
                  onChangeText={value => setUsername(value)}
                  isInvalid={invalidUsername}
                  size="md"
                  placeholder="Full name"
                />
              </FormControl>
              <FormControl mt="4">
                <Input
                  onBlur={onBlurEmail}
                  value={email}
                  onChangeText={value => setEmail(value)}
                  isInvalid={invalidEmail}
                  keyboardType="email-address"
                  size="md"
                  placeholder="Email address"
                />
              </FormControl>
              <FormControl mt="4">
                <Input
                  onBlur={onBlurPhone}
                  value={phone}
                  onChangeText={value => setPhone(value)}
                  isInvalid={invalidPhone}
                  keyboardType="number-pad"
                  size="md"
                  placeholder="Phone number"
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer backgroundColor="white">
              <Button.Group space={2}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setLoading(true);
                    onSubmit();
                  }}>
                  <Text color={colors.white}>Save</Text>
                </TouchableOpacity>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
      <Loading isLoading={loading} />
      <DropdownAlert ref={dropdownRef} />
    </ScrollView>
  );
};

export default Home;
