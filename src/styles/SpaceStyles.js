import {StyleSheet} from 'react-native';
import constants from '../constants';

const HEIGHT = constants.BaseStyle.DEVICE_HEIGHT / 100;
const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;

const SpaceStyles = StyleSheet.create({
  alignSpaceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
    // backgroundColor: 'red',
  },
  alignSpaceCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SnackView: {
    width: WIDTH * 100,
    alignContent: 'center',
    alignSelf: 'center',
    overflow: 'visible',
    position: 'absolute',
    bottom: 100,
    right: 0,
    zIndex: 1,
  },
  DepositErrorStyle: {
    textAlign: 'center',
  },
  marginLeft20: {
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageStyleInTokenS: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },

  columnView: {
    flexDirection: 'column',
  },
  leftMargin: {
    marginLeft: WIDTH * 4,
  },
  flex1: {
    flex: 1,
  },
  left2: {
    marginLeft: WIDTH * 2,
  },
  left1: {
    marginLeft: WIDTH,
  },
  left3: {
    marginLeft: WIDTH * 3,
  },
  left5: {
    marginLeft: WIDTH * 5,
  },
  spaceHorizontal: {
    marginHorizontal: 20,
  },
  spaceRight: {
    paddingRight: 20,
  },
  spaceLeft: {
    paddingLeft: 20,
  },
  vertical1: {
    marginVertical: HEIGHT,
  },
  spaceVertical: {
    marginVertical: HEIGHT * 2,
  },
  bottom1: {
    marginBottom: HEIGHT,
  },
  bottom2: {
    marginBottom: HEIGHT * 2,
  },
  bottom3: {
    marginBottom: HEIGHT * 3,
  },
  bottom4: {
    marginBottom: HEIGHT * 4,
  },
  bottom5: {
    marginBottom: HEIGHT * 5,
  },
  bottom9: {
    marginBottom: HEIGHT * 9,
  },
  bottom13: {
    marginBottom: HEIGHT * 13,
  },
  top1: {
    marginTop: HEIGHT,
  },
  top2: {
    marginTop: HEIGHT * 2,
  },
  top3: {
    marginTop: HEIGHT * 3,
  },
  top4: {
    marginTop: HEIGHT * 4,
  },
  top5: {
    marginTop: HEIGHT * 5,
  },
  top6: {
    marginTop: HEIGHT * 6,
  },
  right1: {
    marginRight: WIDTH,
  },
  right2: {
    marginRight: WIDTH * 2,
  },
  right3: {
    marginRight: WIDTH * 3,
  },
  right5: {
    marginRight: WIDTH * 5,
  },
  top9: {
    marginTop: HEIGHT * 9,
  },
  top20: {
    marginTop: HEIGHT * 20,
  },
  paddingTop2: {
    paddingTop: HEIGHT * 2,
  },
  width45: {
    width: WIDTH * 45,
  },
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
export default SpaceStyles;
