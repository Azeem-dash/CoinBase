import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ViewStyles from '../styles/ViewStyles';
import {GRAY, WHITE, BLACK, RED} from '../constants/Colors';
import {TextInput} from 'react-native-gesture-handler';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import MarketDown from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function Seacrh({navigation}) {
  const [SearchData, setSearchData] = useState([]);
  const [SearchCoin, setSearchCoinn] = useState('');
  const [ShowError, setShowError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const OnSearchCoin = async e => {
    if (e != '') {
      // setTimeout(async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      setIsLoading(true);
      let URL = `https://api.coingecko.com/api/v3/search?query=${e}`;
      await axios({
        method: 'get',
        url: URL,
        cancelToken: source.token,
      })
        .then(res => {
          setIsLoading(false);
          console.log('RESPONSE ', e, ' ', res.data.coins?.length);
          if (res.data.coins?.length === 0) {
            setShowError('not found');
          } else {
            setShowError(null);
            // let letter = e.toLowerCase();
            // const newArray = res.data.coins.filter(e =>
            //   e.symbol.startsWith(e) ? e : null,
            // );
            // console.log("newArray ", newArray);
          }
          setSearchData(res.data.coins);
        })
        .catch(err => {
          console.log('ERR is here ', err);
          setIsLoading(false);
        });
      // }, 1000);
    } else {
      setSearchData([]);
      console.log('search box is empty');
    }
  };
  const renderItem = ({item}) => {
    return (
      <View style={[ViewStyles.FlatlistHomecontainer]}>
        <TouchableOpacity
        activeOpacity={0.1}
          onPress={() => navigation.navigate('CoinDetial', {id: item.id})}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 40, height: 40}}
              source={{
                uri: item.large,
              }}
            />
            <View>
              <Text style={ViewStyles.FlatlistHomename}>{item.name}</Text>
              <Text style={ViewStyles.FlatlistHomeSymbol}>{item.symbol}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={[
        ViewStyles.homeContainer,
        {backgroundColor: BLACK, justifyContent: 'flex-start'},
      ]}>
      <View
        style={{
          // position: 'absolute',
          // left: 15,
          width: '100%',
          top: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
        }}>
        <Back
          // style={{position: 'absolute', bottom: 50}}
          name={'chevron-back'}
          size={30}
          color={WHITE}
          onPress={() => {
            //     setIsSearchOpen(false);
            navigation.goBack();
          }}
          style={{
            right: 10,
          }}
        />
        <TextInput
          autoCorrect={false}
          onChangeText={e => {
            setSearchCoinn(e);
            OnSearchCoin(e);
          }}
          style={[ViewStyles.TextInputHome, {width: 330, color: WHITE}]}
          placeholder={'Try "something"'}
          placeholderTextColor={GRAY}
          keyboardAppearance={'dark'}
          value={SearchCoin}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator
          style={{
            top: 50,
            // width: 300,
            // bottom: 10,
          }}
          size={'large'}
          color={WHITE}
        />
      ) : ShowError ? (
        <Text
          style={{
            color: WHITE,
            textAlign: 'center',
            top: 50,
            // width: 300,
            // bottom: 10,
          }}>
          {SearchCoin ? `"${SearchCoin}"` : null}{' '}
          {SearchCoin ? ShowError : null}
        </Text>
      ) : (
        <FlatList
          style={{
            top: 50,
            width: 300,
            bottom: 10,
          }}
          ListEmptyComponent={<View />}
          contentContainerStyle={{paddingBottom: 130}}
          onScroll={() => {
            Keyboard.dismiss();
          }}
          data={SearchData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}
