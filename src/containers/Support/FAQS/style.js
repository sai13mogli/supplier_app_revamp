import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

export default styles = StyleSheet.create({
  searchWrapper: {
    marginHorizontal: Dimension.margin12,
    marginBottom: Dimension.margin12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 4,
    backgroundColor: Colors.grayShade1,
    paddingHorizontal: Dimension.padding10,
    // paddingVertical: Dimension.padding10,
  },

  SearchInputCss: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    width: '80%',
    fontFamily: Dimension.CustomRegularFont,
  },
  seacrhIcon: {
    position: 'absolute',
    // top: Dimension.padding12,
    right: Dimension.padding10,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
  },
  container: {
    // flex: 1,
    marginTop: Dimension.margin25,
    backgroundColor: Colors.WhiteColor,
    padding: Dimension.padding10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Dimension.margin12,
  },
  activeTab: {
    padding: Dimension.padding12,
    marginRight: Dimension.margin12,
    borderRadius: Dimension.margin8,
    backgroundColor: Colors.blackColor,
  },
  inactiveTab: {
    padding: Dimension.padding12,
    marginRight: Dimension.margin12,
    borderRadius: Dimension.margin8,
    backgroundColor: Colors.tabLightViolet,
  },
  activeTabText: {
    color: '#fff',
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  inactiveTabText: {
    color: Colors.blackColor,
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  headingTxt: {
    color: Colors.FontColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomBoldFont,
  },
  questionContainer: {
    borderColor: Colors.BoxBorderColor,
    marginBottom: Dimension.margin15,
    borderWidth: 1,
    padding: Dimension.padding10,
    borderRadius: Dimension.margin10,
  },
  questionTxt: {
    color: Colors.FontColor,
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  liContainer: {
    flexDirection: 'row',
    padding: Dimension.padding4,
  },
  liDot: {
    width: Dimension.width6,
    height: Dimension.height6,
    marginTop: Dimension.margin10,
    marginRight: Dimension.margin5,
    backgroundColor: Colors.blackColor,
    borderRadius: 6,
  },
  ansTxt: {
    color: Colors.FontColor,
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomRegularFont,
  },
  EmptyChatWrap: {
    backgroundColor: Colors.grayShade3,
    padding: Dimension.padding20,
    marginHorizontal: Dimension.margin10,
    borderRadius: 10,
    alignItems: 'center',
  },
  EmptyBoldTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginVertical: Dimension.margin20,
  },
  EmptyLightTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
