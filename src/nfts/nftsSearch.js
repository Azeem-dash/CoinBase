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
import {GRAY, WHITE, BLACK, RED, MUSTED, SUN_YELLOW} from '../constants/Colors';
import {TextInput} from 'react-native-gesture-handler';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import MarketDown from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default function Seacrh({navigation}) {
  const [SearchData, setSearchData] = useState([]);
  const [SearchNFTs, setSearchNFTsn] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ShowError, setShowError] = useState(null);
  const regex = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/,
  );
  const APIKEY = '061a687d-9daa-40c4-847b-ba35779a0fd0';

  const OnSearchNFTs = async () => {
    setIsLoading(true);
    let URL = `https://api.nftport.xyz/v0/search`;
    await axios({
      method: 'get',
      url: URL,
      params: {
        text: `${SearchNFTs}`,
        // page_size: 10,
        order_by: 'relevance',
      },
      headers: {
        Authorization: APIKEY,
      },
    })
      .then(res => {
        setIsLoading(false);

        console.log('RESPONSE', res.data?.search_results);
        setSearchData(res.data?.search_results);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('ERR is here ', err);
      });
  };

  const renderNftDataItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: WHITE,
          padding: 10,
          margin: 10,
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 10,
          borderWidth: 5,
          width: '100%',
          //   height:100
        }}>
        <Image
          source={{uri: item?.cached_file_url}}
          style={{
            // top: 10,
            //     margin: 10,
            height: 350,
            width: '100%',
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            margin: 10,
            //     padding: 10,
            bottom: 0,
            position: 'absolute',
            borderRadius: 10,
            backgroundColor: WHITE,
            color: BLACK,
            fontSize: 20,
            fontWeight: '500',
          }}>
          {item?.name}
        </Text>
      </View>
    );
  };

  return (
    //Finding NFTs by their name and/or description.
    // Quickly integrating NFT search to your application
    <View style={[ViewStyles.homeContainer, {backgroundColor: MUSTED}]}>
      <View
        style={{
          position: 'absolute',
          left: 15,
          top: 80,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <BackArrow
          style={{position: 'absolute', bottom: 50}}
          name={'arrow-back'}
          size={24}
          color={WHITE}
          onPress={() => {
            //     setIsSearchOpen(false);
            navigation.goBack();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            OnSearchNFTs();
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
              left: 250,
              bottom: 50,
              color: WHITE,
              position: 'absolute',
            }}>
            Search
          </Text>
        </TouchableOpacity>
        <TextInput
          autoCorrect={false}
          onChangeText={e => {
            setSearchNFTsn(e);
	    Keyboard.dismiss();
          }}
          style={[ViewStyles.TextInputHome, {width: 300, color: WHITE}]}
          placeholder={'Try "something"'}
          placeholderTextColor={GRAY}
          keyboardAppearance={'dark'}
          value={searchText}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={SUN_YELLOW} />
      ) : (
        <FlatList
          style={{
            top: 125,
            width: 300,
            bottom: 10,
          }}
          contentContainerStyle={{paddingBottom: 130}}
          onScroll={() => {
            Keyboard.dismiss();
          }}
          data={SearchData}
          renderItem={renderNftDataItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}
