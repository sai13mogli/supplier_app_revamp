import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

export default styles = StyleSheet.create({
  searchWrapper: {
    marginVertical: Dimension.margin12,
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
    marginTop: Dimension.margin14,
    backgroundColor: Colors.WhiteColor,
    padding: Dimension.padding10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Dimension.margin12,
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
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
  },
  inactiveTabText: {
    color: Colors.blackColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
  },
  questionContainer: {
    borderColor: Colors.tabLightViolet,
    marginBottom: Dimension.margin12,
    borderWidth: 0.8,
    padding: Dimension.padding10,
    borderRadius: Dimension.margin8,
  },
  liContainer: {
    flexDirection: 'row',
    padding: Dimension.padding4,
  },
  liDot: {
    width: 5,
    height: 5,
    marginTop: Dimension.margin10,
    marginRight: Dimension.margin8,
    backgroundColor: Colors.blackColor,
    borderRadius: 20,
  },
});
