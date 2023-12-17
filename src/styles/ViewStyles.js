import {Platform, StyleSheet} from 'react-native';
import constants from '../constants';
import {
  BLUE,
  LIGHT_GRAY,
  WHITE,
  GRAY,
  DARK_BLACK,
  GREEN,
  RED,
  NIGHT,
  THEME_PURPLE,
  THEME_BLUE,
  BLACK,
  NOTIFICATION_LIGHT,
  INDIGO_DARK,
  DARK_GRAY,
  MUSTED,
  SKY_BLUE,
  LIGHT_YELLOW,
  LIGHT_WHITE,
} from '../constants/Colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const HEIGHT = constants.BaseStyle.DEVICE_HEIGHT / 100;
const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;
const isIOS = Platform.OS === 'ios';
const ViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NIGHT,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MUSTED,
    // marginTop:10
  },
  homeContainerInner: {
    // backgroundColor: LIGHT_WHITE,
    backgroundColor: BLACK,
    width: '100%',
    height: 550,
    top: 110,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 20,
  },
  homeLogoImg: {
    width: 40,
    height: 40,
  },
  TextInputHome:{
    width: '97%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    alignSelf: 'center',
    color: WHITE,
    borderColor:WHITE,
    marginBottom:5
  },
  FlatlistHomecontainer:{
    backgroundColor: MUSTED,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection:"row",
    
  },
  FlatlistHomename:{
      color: 'white',
      alignSelf: 'center',
      left: 10,
      fontSize: 18,
  },
  FlatlistHomeSymbol:{
    color: DARK_GRAY,
    fontWeight: '500',
    left: 10,
    fontSize: 15,
  },
  homeWalletBtn:{
    backgroundColor: LIGHT_YELLOW,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    // width: "100%",
    flexDirection:'column',
    justifyContent:'center',
    alignSelf:'center'
  },
  topTabBtn:{
    width: 300,
    fontSize: 15,
    marginBottom: 10,
    color: BLACK,
    borderWidth: 1,
    padding:8,
    borderRadius: 15,
    textAlign: 'center',
    overflow: 'hidden',
  }
});
export default ViewStyles;
