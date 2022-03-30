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
  emptyTxt:{
    fontFamily: Dimension.CustomBoldFont,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
    paddingVertical:Dimension.padding30
  },
  emptyWrap:{
    alignContent:"center"
  },
  searchWrapper: {
    marginBottom: Dimension.margin20,
    position: 'relative',
    backgroundColor:"#fff",
    flex:8
  },

  SearchInputCss: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding8,
    borderRadius:4,
    height:Dimension.margin35,
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding10,
    right: Dimension.padding10,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
  },
  footerSearchWrap:{
    flexDirection:"row",
    paddingHorizontal:Dimension.padding10,
    //flex:1
  },
  filterBtnWrap:{
    flex:2,
    marginLeft:Dimension.margin5,
    alignItems:"center"
  },
  filterBtn:{
    flexDirection:"row",
    borderWidth:1,
    borderColor:Colors.FontColor,
    borderRadius:4,
    backgroundColo:Colors.grayShade13,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding10,
    height:Dimension.height35
  },
  filterIcon:{
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    marginLeft:Dimension.margin5
  },
  filtertxt:{
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },

});

export default styles;
