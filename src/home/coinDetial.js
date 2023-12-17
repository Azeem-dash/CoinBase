import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ViewStyles from '../styles/ViewStyles';
import {GRAY, WHITE, BLACK, RED, GREEN, SUN_YELLOW} from '../constants/Colors';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import WacthList from 'react-native-vector-icons/AntDesign';
import Trusted from 'react-native-vector-icons/AntDesign';
import NotTrusted from 'react-native-vector-icons/AntDesign';
import {WebView} from 'react-native-webview';
import Back from 'react-native-vector-icons/Ionicons';
import MarketDown from 'react-native-vector-icons/Feather';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
// import {
//   Table,
//   TableWrapper,
//   Row,
//   Rows,
//   Col,
//   Cols,
//   Cell,
// } from 'react-native-table-component';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default function CoinDetial(props) {
  const {navigation, route} = props;
  const [CoinData, setCoinData] = useState();
  const [setTickerData, setSetTickerData] = useState();
  const [marketinfo, setMarketinfo] = useState();
  const [loading, setLoading] = useState(true);
  const [priceColor, setPriceColor] = useState();
  // console.log(route.params.id);
  const {width} = useWindowDimensions();
  const CoinId = route.params.id;
  const GetData = async () => {
    // console.log("Data-> ", props);
    let url = `https://api.coingecko.com/api/v3/coins/${CoinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
    await axios
      .get(url)
      .then(res => {
        // console.log('res-> ', res.data);
        setCoinData(res.data);
        setPriceColor(
          res.data.market_data?.current_price.usd == 0
            ? WHITE
            : res.data.market_data?.current_price.usd > 0
            ? GREEN
            : RED,
        );
        setLoading(false);
      })
      .catch(err => {
        console.log('ERRPR ', err);
        setLoading(false);
      });
    let url2 = `https://api.coingecko.com/api/v3/coins/${CoinId}/tickers?include_exchange_logo=true`;
    await axios
      .get(url2)
      .then(res => {
        // console.log('ticker data-> ', res.data.tickers);
        setSetTickerData(res.data.tickers);

        setLoading(false);
      })
      .catch(err => {
        console.log('ERRPR ', err);
        setLoading(false);
      });

      let url3=`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
      await axios
      .get(url3)
      .then(res => {
        var sortedKeys = Object.values(res.data).sort();
        console.log('Ricker main info-> ', sortedKeys[0]);

        setMarketinfo( sortedKeys[0]);

        setLoading(false);
      })
      .catch(err => {
        console.log('ERRPR ', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetData();
    // setInterval(() => {
    //   GetData();
    // }, 5000);
  }, []);
  const source = {
    html: `
  <p style="color:${WHITE};font-size:19px;font-weight: 300;">
   ${CoinData?.description.en}
  </p>`,
  };
  return (
    <View style={[ViewStyles.homeContainer]}>
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator size={'large'} color={WHITE} />
        ) : (
          <ScrollView>
            <View style={{marginBottom: 50, marginHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                  // width:'80%'
                }}>
                <Back
                  name={'chevron-back'}
                  size={30}
                  color={WHITE}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
                {/* <View />
             <WacthList
               name={'staro'}
               size={30}
               color={WHITE}
               onPress={() => {
                 navigation.goBack();
               }}
             /> */}
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // marginHorizontal: 50,
                  }}>
                  <Image
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{
                      uri: CoinData?.image?.large,
                    }}
                  />
                  <View style={{marginHorizontal: 5}}>
                    <Text
                      style={{color: WHITE, fontSize: 22, fontWeight: '600'}}>
                      {CoinData?.name}
                    </Text>
                    <Text
                      style={{color: GRAY, fontSize: 20, fontWeight: '400'}}>
                      {CoinData?.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection:'column'}}>
                <Text
                  style={{
                    // marginHorizontal: 50,
                    color: priceColor,
                    fontSize: 20,
                    textAlign: 'center',
                    // fontWeight: '500',
                  }}>
                  {marketinfo?.usd.toFixed(2) == 0 ? (
                    <View />
                  ) : marketinfo?.usd.toFixed(2) > 0 ? (
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
                  ${marketinfo?.usd.toFixed(2)}
                  
                </Text>
                <Text style={{fontSize:17, color:Math.sign(marketinfo?.usd_24h_change)==-1?RED:GREEN}}>{marketinfo?.usd_24h_change.toFixed(2)}%</Text>
                </View>
               

              </View>
              <View>
                <LineChart
                  withHorizontalLabels={false}
                  // withVerticalLabels={false}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  data={{
                    labels: ['7d'],
                    datasets: [
                      {
                        data: CoinData?.market_data.sparkline_7d.price,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width} // from react-native
                  height={220}
                  // yAxisLabel="$"
                  // yAxisSuffix="k"
                  // yAxisInterval={10} // optional, defaults to 1

                  chartConfig={{
                    color: () => priceColor,
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: '#08130D',
                    backgroundGradientToOpacity: 0.5,
                    // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 2, // optional, def
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}

                  // width={90}
                  // height={40}

                  // bezier
                  // style={{paddingRight: 0}}
                />
              </View>

              <View>
                <View style={styles.container}>
                  <Grid>
                    <Col size={50}>
                      <Row style={styles.cellh}>
                        <Text>1h</Text>
                      </Row>
                      <Row style={styles.cell}>
                        <Text
                          style={{
                            color:
                              Math.sign(
                                CoinData?.market_data
                                  .price_change_percentage_1h_in_currency.usd,
                              ) == -1
                                ? RED
                                : GREEN,
                          }}>
                          {Math.sign(
                            CoinData?.market_data
                              .price_change_percentage_1h_in_currency.usd,
                          ) == -1
                            ? null
                            : '+'}{' '}
                          {CoinData?.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                            2,
                          )}
                        </Text>
                      </Row>
                    </Col>
                    <Col size={25}>
                      <Row style={styles.cellh}>
                        <Text>24</Text>
                      </Row>
                      <Row style={styles.cell}>
                        <Text
                          style={{
                            color:
                              Math.sign(
                                CoinData?.market_data
                                  .price_change_percentage_24h,
                              ) == -1
                                ? RED
                                : GREEN,
                          }}>
                          {Math.sign(
                            CoinData?.market_data.price_change_percentage_24h,
                          ) == -1
                            ? null
                            : '+'}{' '}
                          {CoinData?.market_data.price_change_percentage_24h.toFixed(
                            2,
                          )}
                        </Text>
                      </Row>
                    </Col>
                    <Col size={25}>
                      <Row style={styles.cellh}>
                        <Text>7d</Text>
                      </Row>
                      <Row style={styles.cell}>
                        <Text
                          style={{
                            color:
                              Math.sign(
                                CoinData?.market_data
                                  .price_change_percentage_7d,
                              ) == -1
                                ? RED
                                : GREEN,
                          }}>
                          {Math.sign(
                            CoinData?.market_data.price_change_percentage_7d,
                          ) == -1
                            ? null
                            : '+'}{' '}
                          {CoinData?.market_data.price_change_percentage_7d.toFixed(
                            2,
                          )}
                        </Text>
                      </Row>
                    </Col>
                    <Col size={25}>
                      <Row style={styles.cellh}>
                        <Text>14d</Text>
                      </Row>
                      <Row style={styles.cell}>
                        <Text
                          style={{
                            color:
                              Math.sign(
                                CoinData?.market_data
                                  .price_change_percentage_14d,
                              ) == -1
                                ? RED
                                : GREEN,
                          }}>
                          {Math.sign(
                            CoinData?.market_data.price_change_percentage_14d,
                          ) == -1
                            ? null
                            : '+'}{' '}
                          {CoinData?.market_data.price_change_percentage_14d.toFixed(
                            2,
                          )}
                        </Text>
                      </Row>
                    </Col>
                    <Col size={25}>
                      <Row style={styles.cellh}>
                        <Text>30d</Text>
                      </Row>
                      <Row style={styles.cell}>
                        <Text
                          style={{
                            color:
                              Math.sign(
                                CoinData?.market_data
                                  .price_change_percentage_30d,
                              ) == -1
                                ? RED
                                : GREEN,
                          }}>
                          {Math.sign(
                            CoinData?.market_data.price_change_percentage_30d,
                          ) == -1
                            ? null
                            : '+'}{' '}
                          {CoinData?.market_data.price_change_percentage_30d.toFixed(
                            2,
                          )}
                        </Text>
                      </Row>
                    </Col>
                    <Col size={25}>
                      <Row style={styles.cellh}>
                        <Text>1y</Text>
                      </Row>
                      <Row style={styles.cell}>
                        <Text
                          style={{
                            color:
                              Math.sign(
                                CoinData?.market_data
                                  .price_change_percentage_1y,
                              ) == -1
                                ? RED
                                : GREEN,
                          }}>
                          {Math.sign(
                            CoinData?.market_data.price_change_percentage_1y,
                          ) == -1
                            ? null
                            : '+'}{' '}
                          {CoinData?.market_data.price_change_percentage_1y.toFixed(
                            2,
                          )}
                        </Text>
                      </Row>
                    </Col>
                  </Grid>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: WHITE,
                    fontSize: 25,
                    fontWeight: '400',
                    marginTop: 10,
                  }}>
                  {CoinData?.name} Price Statistics
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={styles.rowText}>{CoinData?.name} Price</Text>
                  <Text style={[styles.rowText, {color: WHITE}]}>
                    ${CoinData?.market_data?.current_price.usd}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    borderBottomColor: GRAY,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={styles.rowText}>24h Low / 24h High</Text>
                  <Text style={[styles.rowText, {color: WHITE}]}>
                    ${CoinData?.market_data?.high_24h.usd}/
                    {CoinData?.market_data?.low_24h.usd}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    borderBottomColor: GRAY,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={styles.rowText}>Trading Volume</Text>
                  <Text style={[styles.rowText, {color: WHITE}]}>
                    ${CoinData?.market_data?.total_volume.usd}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    borderBottomColor: GRAY,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={styles.rowText}>Market Cap Rank</Text>
                  <Text style={[styles.rowText, {color: WHITE}]}>
                    #{CoinData?.market_data?.market_cap_rank}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    borderBottomColor: GRAY,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={styles.rowText}>Market Cap</Text>
                  <Text style={[styles.rowText, {color: WHITE}]}>
                    ${CoinData?.market_data?.market_cap.usd}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    borderBottomColor: GRAY,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop:10
                  }}>
                  <Text style={styles.rowText}>Market Cap Rank</Text>
                  <Text style={[styles.rowText, {color: WHITE}]}>
                 #{CoinData?.market_data?.market_cap_rank}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    borderBottomColor: GRAY,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                /> */}
              </View>
              <View>
                <Text
                  style={{
                    color: WHITE,
                    fontSize: 25,
                    fontWeight: '400',
                    marginTop: 10,
                    // marginHorizontal: 10,
                  }}>
                  {CoinData.name} Market
                </Text>
                <FlatList
                  keyExtractor={(item, index) => item.key}
                  data={setTickerData}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={item => {
                    return (
                      <View>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(item.item.trade_url)}
                          activeOpacity={0.5}
                          style={ViewStyles.homeWalletBtn}>
                          <Image
                            source={{uri: item.item.market.logo}}
                            style={{
                              height: 50,
                              width: 50,
                              alignSelf: 'center',
                              borderRadius: 25,
                            }}
                          />
                          <Text
                            style={{
                              textAlign: 'center',
                              color: BLACK,
                              fontWeight: '600',
                              fontSize: 16,
                            }}>
                            {item.item.market.name}
                          </Text>
                          <Text style={{textAlign: 'justify', color: BLACK}}>
                            Price - {item.item.last.toFixed(2)}
                          </Text>
                          <Text style={{textAlign: 'justify', color: BLACK}}>
                            Pair - {item.item.base}/{item.item.target}
                          </Text>
                          <Text style={{textAlign: 'justify', color: BLACK}}>
                            Spread -{' '}
                            {item.item?.bid_ask_spread_percentage?.toFixed(2)}%
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{textAlign: 'justify', color: BLACK}}>
                              Trust Score -
                            </Text>
                            {item.item.trust_score == 'green' ? (
                              <Trusted
                                name={'checkcircle'}
                                size={15}
                                color={GREEN}
                                style={{marginHorizontal: 5}}
                              />
                            ) : (
                              <NotTrusted
                                name={'closecircle'}
                                size={15}
                                color={RED}
                                style={{marginHorizontal: 5}}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: WHITE,
                    fontSize: 25,
                    fontWeight: '400',
                    marginTop: 10,
                    // marginHorizontal: 10,
                  }}>
                  About {CoinData.name}
                </Text>
                {/* <Text>
                  {CoinData?.description.en}
                </Text> */}
                <RenderHtml contentWidth={width} source={source} />
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    // padding: 16,
    // paddingTop: 100,
    // backgroundColor: '#fff',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellh: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY,
  },
  rowText: {fontWeight: '400', color: GRAY, fontSize: 17},
});
