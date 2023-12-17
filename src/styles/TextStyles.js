import {StyleSheet} from 'react-native';
import constants from '../constants';
import {
  BLUE,
  DARK_BLACK,
  DARK_RED,
  GRAY,
  GREEN,
  RED,
  WHITE,
  DARK_GRAY,
  DARK_YELLOW,
  THEME_RED,
} from '../constants/Colors';

const TextStyles = StyleSheet.create({
  textBold24: {
    ...constants.Fonts.bold24, //24 bold
  },
  textExtraBold24: {
    ...constants.Fonts.extraBold24, //24 bold
  },
  textExtraBold13: {
    ...constants.Fonts.extraBold13, //24 bold
  },
  textExtraBold16: {
    ...constants.Fonts.extraBold16, //24 bold
  },
  textBold18: {
    ...constants.Fonts.bold18, //18 bold
  },
  textBold30: {
    ...constants.Fonts.bold30, //24 bold
  },
  textBold40: {
    ...constants.Fonts.bold40, //24 bold
  },
  textRegular20: {
    ...constants.Fonts.regular20, //20 regular
  },
  textBold16: {
    color: BLUE,
    ...constants.Fonts.bold16, //16 bold
  },
  textSemiBold16: {
    color: DARK_BLACK,
    ...constants.Fonts.semiBold16, //16 semibold
  },
  textMedium16: {
    ...constants.Fonts.medium16, //16 medium
  },
  textRegular15: {
    ...constants.Fonts.regular15, // 15 regular
  },
  textMedium15: {
    color: GRAY,
    ...constants.Fonts.medium15, //15 medium
  },
  textBold12: {
    color: GRAY,
    ...constants.Fonts.bold12, //14 bold
  },
  textBold14: {
    color: GRAY,
    ...constants.Fonts.bold14, //14 bold
  },
  textBold15: {
    ...constants.Fonts.bold15, //14 bold
  },
  textSemiBold14: {
    ...constants.Fonts.semiBold14, //14 semibold
  },
  textMedium14: {
    ...constants.Fonts.medium14, //14 medium
  },
  textMedium13: {
    ...constants.Fonts.medium13, //14 medium
  },
  textMedium12: {
    ...constants.Fonts.medium12, //14 medium
  },
  textRegular14: {
    ...constants.Fonts.regular14, // 14 regular
  },
});
export default TextStyles;
