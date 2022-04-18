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
    justifyContent: 'center',
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
  emptyTxt: {
    fontFamily: Dimension.CustomBoldFont,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
    paddingVertical: Dimension.padding30,
    //alignSelf:"center"
  },
  emptyWrap: {
    //alignContent:"center",
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    marginTop: Dimension.margin60,
  },
  searchWrapper: {
    marginBottom: Dimension.margin5,
    position: 'relative',
    backgroundColor: '#fff',
    flex: 8,
   borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    paddingHorizontal: Dimension.padding10,
    //paddingVertical: Dimension.padding8,
    height: Dimension.margin35,
  },

  SearchInputCss: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    height: Dimension.margin35,
    // width:"85%",
    // flex: 8,
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding10,
    right: Dimension.padding10,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
  },
  footerSearchWrap: {
    flexDirection: 'row',
    paddingHorizontal: Dimension.padding10,
    //flex:1
  },
  filterBtnWrap: {
    flex: 1.8,
    marginLeft: Dimension.margin10,
    alignItems: 'center',
  },
  filterBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.FontColor,
    borderRadius: 4,
    backgroundColo: Colors.grayShade13,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding8,
    height: Dimension.height35,
  },
  filterIcon: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    marginLeft: Dimension.margin5,
    marginTop:Dimension.margin5
  },
  filtertxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  selectAllBtn: {
    borderRadius: 50,
    backgroundColor: Colors.FontColor,
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding15,
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: Dimension.height130,
  },
  selectBtnTxt: {
    fontSize: Dimension.font14,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomMediumFont,
    marginRight: Dimension.margin8,
  },
  bulkItemfooter: {
    backgroundColo: '#fff',
    flexDirection: 'row',
    padding: Dimension.padding15,
  },
  CountWrap: {
    flex: 1,
  },
  BulkAcceptbtn: {
    backgroundColor: Colors.BrandColor,
    flex: 1,
    borderRadius: 4,
    paddingVertical: Dimension.padding12,
    alignItems: 'center',
  },
  BulkAcceptTxt: {
    fontSize: Dimension.font14,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  selectedtxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  Counttxt: {
    fontSize: Dimension.font18,
    color: Colors.eyeIcon,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginTop: Dimension.margin5,
  },
  footerWrap: {
    backgroundColor: '#fff',
    paddingTop: Dimension.padding10,
    borderTopLeftRadius: 10,
    borderTopRightadius: 10,
    position: 'absolute',
    flex: 1,
    width: '100%',
    bottom: 0,
  },
});

export default styles;
