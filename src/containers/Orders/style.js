import {StyleSheet, Dimensions} from 'react-native';
//import { Scale } from '../../CommonConfig';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';

const styles = StyleSheet.create({
  wrapperView: {
    width: 80,
    top: 80,
    // marginRight:Scale(80),
  },
  notifocationBtn: {
    //width:Dimension.width24,
    //height:Dimension.width24,
    marginTop: Dimension.padding15,
  },
  Unselectedtabcss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding6,
    borderRadius: 4,
    maxWidth: Dimension.width100,
    marginRight: Dimension.margin10,
    justifyContent: 'center',
  },
  selectedTabCss: {
    backgroundColor: Colors.FontColor,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding6,
    borderRadius: 4,
    maxWidth: Dimension.width100,
    marginRight: Dimension.margin10,
  },
  selectedTabTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    fontSize: Dimension.font12,
    color: Colors.WhiteColor,
  },
  UnselectedtabTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
  },
  inputField: {
    height: 65,
    borderWidth: 1,
    borderColor: Colors.ExtralightGrayText,
    flex: 1,
    borderRadius: Dimension.borderRadius6,
    paddingHorizontal: Dimension.padding30,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomRegularFont,
    fontSize: Dimension.font12,
  },
});

export default styles;
