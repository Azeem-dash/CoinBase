import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import {
  GREEN,
  WHITE,
  GRAY,
  DARK_GRAY,
  BLACK,
  MUSTED,
  FILTER_MENU_FILLED,
  SNACK_BG,
  ICON_COLOR,
  ORANGE_DEEP,
  ORANGE,
  ORANGE_DARK,
  RED,
  LIGHT_YELLOW,
  SUN_YELLOW,
} from '../constants/Colors';
import TransfertIcon from 'react-native-vector-icons/Entypo';
import WithdrawIcon from 'react-native-vector-icons/Ionicons';
import MarketDown from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Setting from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import Done from 'react-native-vector-icons/Ionicons';

import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import ViewStyles from '../styles/ViewStyles';
import Icon from '../components/Icons';
export default function Home({navigation}) {
  const [TopCrypto, setTopCrypto] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [updatedArray, setUpdatedArray] = useState(TopCrypto);
  const [ShowError, setShowError] = useState(null);
  const [activeFiled, setActiveFiled] = useState(1);
  const [DeviceHeight, setDeviceHeight] = useState(
    Dimensions.get('window').height,
  );
  const [selectHour, setSelectHour] = useState('7d');
  const [selectList, setSelectList] = useState(50);
  const [curreency, setCurreency] = useState('usd');
  const [isModalVisible, setModalVisible] = useState(false);
  const [TopSeven, setTopSeven] = useState();
  // const DismissKeyboard = ({children}) => (
  //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //     {children}
  //   </TouchableWithoutFeedback>
  // );
  useEffect(() => {
    factingData();
    GetTopSeven();
  }, []);
  let TimeArray = [
    {
      id: 1,
      text: 'last 1 hour',
      value: '1h',
    },
    {
      id: 2,
      text: 'last 24 hour',
      value: '24h',
    },
    {
      id: 3,
      text: 'last 7 days',
      value: '7d',
    },
    {
      id: 4,
      text: 'last 14 days',
      value: '14d',
    },
    {
      id: 5,
      text: 'last 30 days',
      value: '30d',
    },
    {
      id: 6,
      text: 'last 200 day',
      value: '200d',
    },
    {
      id: 7,
      text: 'last year',
      value: '1y',
    },
  ];
  const GetTopSeven = async () => {
    let URL = 'https://api.coingecko.com/api/v3/search/trending';
    await axios({
      method: 'get',
      url: URL,
    }).then(res => {
      // console.log(res.data.coins);
      setTopSeven(res.data.coins);
    });
  };
  const factingData = async () => {
    // console.log('selectHour ', selectHour);
    // console.log('curreency ', curreency.toLowerCase());
    let URL = 'https://api.coingecko.com/api/v3/coins/markets';
    await axios({
      method: 'get',
      url: URL,
      params: {
        vs_currency: curreency.toLowerCase(),
        order: 'market_cap_desc',
        per_page: selectList,
        page: '1',
        sparkline: true,
        price_change_percentage: selectHour,
      },
    })
      .then(res => {
        // console.log('RESPONSE', res.data);
        setTopCrypto(res.data);
        setUpdatedArray(res.data);
      })
      .catch(err => {
        console.log('ERR is here ', err);
      });

    //    axios.get('https://api.1inch.io/v4.0/1/tokens').then(response => {
    // // console.log(response.data);
    // // console.log(Object.keys(response.data.tokens));
    // const values = Object.values(response.data.tokens);

    // // values.forEach((item, index) => {
    // //   // console.log(item.name);
    // //   // console.log(index);
    // //   item.id = index;
    // // });
    // console.log(values);

    // });
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const WalletInfo = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 40 : 0,
          left: 10,
        }}>
        <Text style={{color: ORANGE_DARK, fontSize: 25}}>Crypto Tracker</Text>
        <View style={{position: 'absolute', right: 30, top: 10}}>
          <TouchableOpacity
            onPress={() => {
              // setIsSearchOpen(true);
              navigation.navigate('Seacrh');
            }}>
            <SearchIcon name={'search1'} size={24} color={WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: WHITE, fontWeight: '600', fontSize: 22}}>
            Trending
          </Text>
          <Text style={{color: GRAY, fontWeight: '300', fontSize: 14}}>
            Top-7 trending coins on CoinGecko as searched by users in the last
            24 hours (Ordered by most popular first)
          </Text>
        </View>
        <FlatList
          keyExtractor={item => item.item.market_cap_rank}
          data={TopSeven}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            // console.log(item.item.item.id);
            return (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CoinDetial', {id: item.item.item.id})
                  }
                  activeOpacity={1}
                  style={ViewStyles.homeWalletBtn}>
                  <Image
                    source={{uri: item.item.item.thumb}}
                    style={{height: 50, width: 50, alignSelf: 'center'}}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: BLACK,
                      fontWeight: '500',
                    }}>
                    {item.item.item.name} - {item.item.item.symbol}
                  </Text>
                  <Text style={{textAlign: 'center', color: BLACK}}>
                    Rank - {item.item.item.market_cap_rank}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const renderItem = ({item}) => {
    let priceColor =
      item.price_change_percentage_7d_in_currency == 0
        ? WHITE
        : item.price_change_percentage_7d_in_currency > 0
        ? GREEN
        : RED;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CoinDetial', {id: item.id})
        }
        activeOpacity={0.5}
        >
        <View style={ViewStyles.FlatlistHomecontainer}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 40, height: 40}}
              source={{
                uri: item.image,
              }}
            />
            <View>
              <Text style={ViewStyles.FlatlistHomename}>{item.name}</Text>
              <Text style={ViewStyles.FlatlistHomeSymbol}>
                {item.symbol?.toUpperCase()}
              </Text>
            </View>
          </View>
          <View
            style={{
              left: 20,
            }}>
            <LineChart
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              data={{
                datasets: [
                  {
                    data: item.sparkline_in_7d.price,
                  },
                ],
              }}
              width={90}
              height={40}
              chartConfig={{
                color: () => priceColor,
                backgroundGradientFrom: '#1E2923',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#08130D',
                backgroundGradientToOpacity: 0.5,
                // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, def
              }}
              bezier
              style={{paddingRight: 0}}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 20,
              flexDirection: 'row',
            }}>
            {item.price_change_percentage_7d_in_currency == 0 ? (
              <View />
            ) : item.price_change_percentage_7d_in_currency > 0 ? (
              <MarketDown
                size={20}
                color={priceColor}
                name={'arrow-up-right'}
              />
            ) : (
              <MarketDown
                size={20}
                color={priceColor}
                name={'arrow-down-right'}
              />
            )}

            <Text style={{color: priceColor}}>
              {item.current_price.toFixed(2)} {curreency.toLowerCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  //  const renderItem = ({item}) => {
  //   let priceColor =
  //     item.price_change_percentage_7d_in_currency == 0
  //       ? WHITE
  //       : item.price_change_percentage_7d_in_currency > 0
  //       ? GREEN
  //       : RED;
  //   return (
  //     <View style={ViewStyles.FlatlistHomecontainer}>
  //       <View style={{flexDirection: 'row'}}>
  //         <Image
  //           style={{width: 40, height: 40}}
  //           source={{
  //             uri: item.image,
  //           }}
  //         />
  //         <View>
  //           <Text style={ViewStyles.FlatlistHomename}>{item.name}</Text>
  //           <Text style={ViewStyles.FlatlistHomeSymbol}>
  //             {item.symbol?.toUpperCase()}
  //           </Text>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           position: 'absolute',
  //           right: 10,
  //           top: 20,
  //           flexDirection: 'row',
  //         }}>
  //         {item.price_change_percentage_7d_in_currency == 0 ? (
  //           <View />
  //         ) : item.price_change_percentage_7d_in_currency > 0 ? (
  //           <MarketDown size={20} color={priceColor} name={'arrow-up-right'} />
  //         ) : (
  //           <MarketDown
  //             size={20}
  //             color={priceColor}
  //             name={'arrow-down-right'}
  //           />
  //         )}

  //         <Text style={{color: priceColor}}>$ {item.current_price}</Text>
  //       </View>
  //     </View>
  //   );
  // };
  const onSearchText = async e => {
    let letter = e;
    const newArray = TopCrypto.filter(
      e => (e.name.startsWith(letter) ? e : null),
      // e.name.startsWith(e) ? e : null,
    );
    setUpdatedArray(newArray);
    if (!e) {
      setUpdatedArray(TopCrypto);
    }
    if (newArray.length === 0) {
      setShowError('Not Found');
    }
    // console.log(newArray.length);
  };

  return (
    <View style={ViewStyles.homeContainer}>
      <StatusBar
        animated={true}

        //  backgroundColor="#61dafb"
      />
      <WalletInfo />

      <View style={ViewStyles.homeContainerInner}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginHorizontal: 10,
            }}>
            <Text
              style={[
                ViewStyles.topTabBtn,
                {
                  backgroundColor: activeFiled == 1 ? LIGHT_YELLOW : WHITE,
                },
              ]}>
              {`Top ${selectList} CryptoCurrency in last ${selectHour} (${curreency.toUpperCase()})`}
            </Text>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                activeOpacity={1}
                onPress={() => {
                  toggleModal();
                  console.log('working ! =======>');
                }}>
                {/* <Text
                  style={[
                    ViewStyles.topTabBtn,
                    {
                      backgroundColor: activeFiled == 1 ? LIGHT_YELLOW : WHITE,
                    },
                  ]}>
                  Show modal
                </Text> */}
                <Setting name={'filter'} size={24} color={WHITE} />
              </TouchableOpacity>

              <Modal
                isVisible={isModalVisible}
                animationIn={'bounceInDown'}
                animationInTiming={500}
                // backdropOpacity={1}
                // avoidKeyboard={true}
                style={{
                  top: '50%',
                  width: '100%',
                  backgroundColor: MUSTED,
                  borderTopStartRadius: 40,
                  borderTopEndRadius: 40,
                  padding: 0,
                  margin: 0,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: '4%',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{marginRight: 50, margin: 5}}>
                      <Cancel name={'cancel'} size={24} color={WHITE} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: WHITE}}>
                      Filter your List
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        factingData();
                        toggleModal();
                      }}
                      style={{marginLeft: 50, margin: 5}}>
                      <Done
                        name={'md-checkmark-done-circle-sharp'}
                        size={24}
                        color={WHITE}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{right: 0, top: '4.5%'}}>
                    <Text style={{fontSize: 15, color: WHITE}}>
                      Select your time
                    </Text>

                    <FlatList
                      data={TimeArray}
                      renderItem={item => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectHour(item.item.value);
                            }}
                            style={{
                              margin: 5,
                              borderWidth: 1,
                              width: 100,
                              padding: 3,
                              borderRadius: 10,
                              backgroundColor:
                                item.item.value == selectHour
                                  ? LIGHT_YELLOW
                                  : null,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color:
                                  item.item.value == selectHour ? BLACK : WHITE,
                                borderColor: WHITE,
                              }}>
                              {item.item.text}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={item => item.id}
                    />
                  </View>
                  <View style={{top: '4%'}}>
                    <View style={{bottom: 250, left: 150}}>
                      <Text style={{color: WHITE}}>Enter number of list</Text>
                      <TextInput
                        value={selectList}
                        keyboardType={'number-pad'}
                        placeholder={'Number b/w 1~250'}
                        placeholderTextColor={GRAY}
                        onChangeText={e => {
                          const reg = /^[1-9][0-9]?$|^250$/;
                          if (e === '' || reg.test(e)) {
                            setSelectList(e);
                          }
                        }}
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,
                          width: 150,
                          height: 35,
                          margin: 5,
                          color: WHITE,
                        }}
                      />
                    </View>

                    <View style={{bottom: 250, left: 150}}>
                      <Text style={{color: WHITE}}>Enter Currency</Text>
                      <TextInput
                        placeholder={`usd, eur, jpy, etc`}
                        placeholderTextColor={GRAY}
                        autoCapitalize={true}
                        keyboardType={'ascii-capable'}
                        value={curreency}
                        onChangeText={e => {
                          const reg = /^[a-zA-Z]+$/g;
                          if (e === '' || reg.test(e)) {
                            setCurreency(e);
                          }
                        }}
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,
                          width: 150,
                          height: 35,
                          margin: 5,
                          color: WHITE,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View>
            <TextInput
              autoCorrect={false}
              onChangeText={e => {
                onSearchText(e);
                setSearchText(e);
              }}
              style={ViewStyles.TextInputHome}
              placeholder={'Try "ETH"'}
              placeholderTextColor={GRAY}
              keyboardAppearance={'dark'}
              value={searchText}
            />
          </View>
          <View>
            <FlatList
              style={{
                marginBottom: 180,
              }}
              onScroll={() => {
                Keyboard.dismiss();
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{top: 2}}>
                    {ShowError ? (
                      <Text style={{color: WHITE, textAlign: 'center'}}>
                        "{searchText}" {ShowError}
                      </Text>
                    ) : (
                      <ActivityIndicator size={'large'} color={WHITE} />
                    )}
                  </View>
                );
              }}
              data={updatedArray}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
