import React from 'react';
import {View, Text, Dimensions, useWindowDimensions} from 'react-native';
import {styles} from './styles';
import Carousel from 'react-native-snap-carousel';
import {colors} from 'constant/colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Card = () => {
  const entries = [
    {id: 1, title: 'slide 1', color: colors.slide1},
    {id: 2, title: 'slide 2', color: colors.slide2},
    {id: 3, title: 'slide 3', color: colors.slide3},
    {id: 4, title: 'slide 3', color: colors.slide1},
    {id: 5, title: 'slide 3', color: colors.slide2},
  ];
  const {width} = Dimensions.get('window');
  // @ts-ignore
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={[styles.slide, {backgroundColor: item.color}]}>
        <View style={styles.row}>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
            VISA
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
            {'  * * * *  '}
          </Text>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
            6778
          </Text>
        </View>
        <View
          style={[
            styles.row,
            {paddingTop: 20, paddingBottom: 5, opacity: 0.6},
          ]}>
          <Text style={styles.text}>CARD HOLDER</Text>
          <Text style={styles.text}>EXPIRES</Text>
        </View>
        <View style={[styles.row, {paddingTop: 0}]}>
          <Text style={[styles.text, {fontWeight: '500'}]}>
            Lindsey Johnson
          </Text>
          <Text style={[styles.text, {fontWeight: '500'}]}>11/22</Text>
        </View>
      </View>
    );
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Card'},
    {key: 'second', title: 'Bank'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: colors.grey}}>
      <Text style={{marginTop: 15, fontWeight: 'bold'}}>
        Select credit card
      </Text>

      <Carousel
        // ref={c => {
        //   this._carousel = c;
        // }}
        loop
        layout={'default'}
        data={entries}
        renderItem={renderItem}
        sliderHeight={120}
        itemHeight={120}
        sliderWidth={width}
        itemWidth={width * 0.35}
      />

      <Text style={{marginTop: 15, fontWeight: 'bold'}}>Recipient</Text>

      <Carousel
        // ref={c => {
        //   this._carousel = c;
        // }}
        loop
        layout={'default'}
        data={entries}
        renderItem={renderItem}
        sliderHeight={120}
        itemHeight={120}
        sliderWidth={width}
        itemWidth={width * 0.35}
      />
    </View>
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
      <Text style={{marginTop: 15, marginHorizontal: 15, color: '#a1a1a1'}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 15,
        }}>
        <Text style={styles.title}>Send money</Text>
        <View>
          <Ionicons name="people-circle" size={30} color={colors.primary} />
        </View>
      </View>

      <View style={[styles.tabview, {height: layout.height * 0.8}]}>
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              renderLabel={({route, focused}) => (
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    margin: 2,
                    fontSize: 16,
                  }}>
                  {route.title}
                </Text>
              )}
              style={{backgroundColor: 'white'}}
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

export default Card;
