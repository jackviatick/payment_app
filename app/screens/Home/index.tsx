import React from 'react';
import {
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {styles} from 'screens/Home/styles';
import Carousel from 'react-native-snap-carousel';
import {colors} from 'constant/colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            Lindsey Johnson
          </Text>
          <Text style={[styles.text, styles.normalFontWeight]}>11/22</Text>
        </View>
      </View>
    );
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Sent'},
    {key: 'second', title: 'Received'},
  ]);

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

  const FirstRoute = () => (
    <ScrollView style={styles.subTabContainer}>
      <View style={styles.subTabview}>
        <Text style={styles.smallText}>Search transaction</Text>
        <Ionicons color={'#ccc'} name="search-outline" size={15} />
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

  // const SecondRoute = () => (
  //   <View style={{flex: 1, backgroundColor: colors.grey}} />
  // );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: FirstRoute,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Your balance</Text>
      <View style={styles.balanceNumber}>
        <Text style={styles.title}>RM 926.21</Text>
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
    </View>
  );
};

export default Home;
