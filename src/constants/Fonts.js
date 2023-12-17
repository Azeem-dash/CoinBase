import BaseStyles from './BaseStyles';
import {Platform} from 'react-native';

const Fonts = {
  bold24: {
    fontSize: 24,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  extraBold24: {
    fontSize: 24,
    fontFamily: 'Manrope-ExtraBold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  extraBold16: {
    fontSize: 16,
    fontFamily: 'Manrope-ExtraBold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  extraBold13: {
    fontSize: 13,
    fontFamily: 'Manrope-ExtraBold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  bold30: {
    fontSize: 30,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  bold40: {
    fontSize: 40,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  regular20: {
    fontSize: 20,
    fontFamily: 'Manrope-Regular',
  },
  bold18: {
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  semiBold18: {
    fontSize: 18,
    fontFamily: 'Manrope-SemiBold',
  },
  bold20: {
    fontSize: 20,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  medium16: {
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
  },
  semiBold16: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  bold16: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  regular15: {
    fontSize: 15,
    fontFamily: 'Manrope-Regular',
  },
  medium13: {
    fontSize: 13,
    fontFamily: 'Manrope-Medium',
  },
  medium12: {
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  medium14: {
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
  },
  medium15: {
    fontSize: 15,
    fontFamily: 'Manrope-Medium',
  },
  bold12: {
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  bold14: {
    fontSize: 14,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  bold15: {
    fontSize: 15,
    fontFamily: 'Manrope-Bold',
    fontWeight: Platform.OS === 'android' ? 'bold' : null,
  },
  semiBold14: {
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
  semiBold15: {
    fontSize: 15,
    fontFamily: 'Manrope-SemiBold',
  },
  regular14: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
  },
};
module.exports = Fonts;
