import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import {
  WHITE,
  BLACK,
  FILTER_MENU_FILLED,
  SNACK_BG,
  ICON_COLOR,
  ORANGE_DEEP,
  ORANGE,
  ORANGE_DARK,
  RED,
  LIGHT_YELLOW,
  SUN_YELLOW,
  MUSTED,
} from '../constants/Colors';
import TransfertIcon from 'react-native-vector-icons/Entypo';
import WithdrawIcon from 'react-native-vector-icons/Ionicons';
import MarketDown from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Swap from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/MaterialIcons';

import DropDownPicker from 'react-native-dropdown-picker';
import NoImage from '../assests/NoImage.png';
import Modal from 'react-native-modal';

import ViewStyles from '../styles/ViewStyles';
import Icon from '../components/Icons';
const APIKEY = '061a687d-9daa-40c4-847b-ba35779a0fd0';

export default function Home({navigation}) {
  const [NftData, setNftData] = useState([]);
  const [trendingNfts, setTrendingNfts] = useState([]);
  const [GetLastNfts, setGetLastNfts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [value, setValue] = useState('ethereum');
  const [items, setItems] = useState([
    {label: 'Ethereum', value: 'ethereum'},
    {label: 'Polygon', value: 'polygon'},
    {label: 'Rinkeby', value: 'rinkeby'},
  ]);

  const regex = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/,
  );
  // let trendingNfts = [];
  // let NftData = [];
  let resArr = [];
  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    setIsLoading(true);
    let URL = 'https://api.nftport.xyz/v0/nfts';
    await axios({
      method: 'get',
      url: URL,
      params: {
        chain: 'ethereum', // polygon , ethereum, rinkeby
        include: 'all',
        page_size: 50,
      },
      headers: {
        Authorization: APIKEY,
      },
    })
      .then(res => {
        setIsLoading(false);
        // console.log(res.data.nfts);
        setTrendingNfts(res.data.nfts.slice(0, 10));
        setNftData(res.data.nfts.slice(10, 20));
        setGetLastNfts(res.data.nfts.slice(20, 50));
      })
      .catch(err => {
        console.log('ERR is here ', err);
        setIsLoading(false);
      });
  };
  // console.log('trnding -> ', trendingNfts);
  // console.log('next -> ', NftData);
  // console.log('GetLastNfts -> ', GetLastNfts);

  const Header = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 40 : 0,
          left: 10,
        }}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Swap name={'swap'} size={24} color={WHITE} />
          <Text style={{color: WHITE, fontSize: 20, left: 10}}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Text>
          {/* <DropDownPicker
            style={{
              color: WHITE,
              fontSize: 20,
              left: 10,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}
        </TouchableOpacity>
        <Text style={{color: ORANGE_DARK, fontSize: 25}}>NFts</Text>
        <View>
          <Text style={{color: WHITE, ontWeight: '600', fontSize: 25}}>
            Trendings
          </Text>
        </View>

        <View style={{position: 'absolute', left: 330, top: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NftSearch');
            }}>
            <SearchIcon name={'search1'} size={24} color={WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Image
          source={
            regex.test(item?.file_url)
              ? {uri: item?.file_url}
              : require('../assests/NoImage.png')
          }
          style={{
            backgroundColor: WHITE,
            top: 20,
            margin: 10,
            height: 300,
            width: 300,
            borderRadius: 10,
          }}
        />
        <Text style={{color: WHITE, position: 'absolute', top: 390, left: 10}}>
          {item.metadata?.name}
        </Text>
      </View>
    );
  };
  const renderNftDataItem = ({item}) => {
    return (
      <View>
        <Image
          source={
            regex.test(item?.file_url)
              ? {uri: item?.file_url}
              : require('../assests/NoImage.png')
          }
          style={{
            backgroundColor: WHITE,
            // top: 10,
            margin: 10,
            height: 200,
            width: 200,
            borderRadius: 10,
          }}
        />
        <Text style={{color: WHITE, position: 'absolute', top: 390, left: 10}}>
          {item.metadata?.name}
        </Text>
      </View>
    );
  };
  const renderGetLastNftsItem = ({item}) => {
    return (
      <View>
        <Image
          source={
            regex.test(item?.file_url)
              ? {uri: item?.file_url}
              : require('../assests/NoImage.png')
          }
          style={{
            backgroundColor: WHITE,
            // top: 100,
            margin: 5,
            height: 350,
            width: 350,
            borderRadius: 10,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        />
        <Text style={{color: WHITE, position: 'absolute', top: 390, left: 10}}>
          {item.metadata?.name}
        </Text>
      </View>
    );
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={ViewStyles.homeContainer}>
      <StatusBar animated={true} />
      {isLoading ? (
        <ActivityIndicator size={'large'} color={SUN_YELLOW} />
      ) : (
        <>
          <ScrollView>
            <Header />
            <View style={{top: 100}}>
              <FlatList
                data={trendingNfts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
              />
              <View style={{margin: 10}}>
                <Text style={{color: ORANGE_DARK, fontSize: 25}}>NFts</Text>
                <View>
                  <Text style={{color: WHITE, ontWeight: '600', fontSize: 25}}>
                    Features
                  </Text>
                </View>
              </View>
              <FlatList
                data={NftData}
                renderItem={renderNftDataItem}
                keyExtractor={item => item.id}
                horizontal={true}
              />
              <FlatList
                data={GetLastNfts}
                renderItem={renderGetLastNftsItem}
                keyExtractor={item => item.id}
                // horizontal={true}
              />
            </View>
          </ScrollView>
        </>
      )}
      <Modal
        isVisible={isModalVisible}
        animationInTiming={500}
        // backdropOpacity={1}
        // avoidKeyboard={true}
        style={{
          top: '80%',
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
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={toggleModal} style={{right: '250%'}}>
              <Cancel name={'cancel'} size={24} color={WHITE} />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: WHITE}}>
              Select Your Network
            </Text>
            <View />
          </View>

          <View
            style={{
              right: 0,
              top: '4.5%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <FlatList
              data={items}
              horizontal={true}
              renderItem={item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // setSelectHour(item.item.value);
                      setValue(item.item.value);
                      GetData();
                      toggleModal();
                    }}
                    style={{
                      margin: 5,
                      borderWidth: 1,
                      width: 100,
                      padding: 5,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor:
                        item.item.value == value ? LIGHT_YELLOW : null,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: item.item.value == value ? BLACK : WHITE,
                        borderColor: WHITE,
                      }}>
                      {item.item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
