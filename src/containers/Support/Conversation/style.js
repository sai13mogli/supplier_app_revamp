import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const styles = StyleSheet.create({
  ContainerCss:{
    backgroundColor:Colors.WhiteColor,
    flex:1
  },
  InputWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   paddingVertical:Dimension.padding10,
   paddingHorizontal:Dimension.padding15,
   shadowColor: '#000',
  shadowOffset: { width: 1, height: -5 },
        shadowOpacity:  1,
        shadowRadius: 16,
        elevation: 5,
   //marginTop:10,
   backgroundColor:"#FFF"
  },
  InputCss:{
fontSize:Dimension.font14,
color:Colors.FontColor,
fontFamily:Dimension.CustomMediumFont,
width:"80%"
  },
  SendBtn:{
    backgroundColor:Colors.BrandColor,
    borderRadius:8,
    borderWidth:1,
    borderColor:Colors.grayShade8,
    padding:Dimension.padding8
  },
  systemChatWrap:{
    marginRight:Dimension.padding15,
    marginVertical:Dimension.margin10
  },
  userchatmWrap:{
    marginLeft:Dimension.padding15,
    marginVertical:Dimension.margin10
  },
  systemchat: {
  backgroundColor:Colors.WhiteColor,
  borderWidth:1,
  borderColor:Colors.grayShade1,
  borderTopLeftRadius:12,
  borderBottomLeftRadius:12,
  borderBottomRightRadius:12,
  width:"80%",
  alignSelf:"flex-end",
  padding:Dimension.padding20,
  
  },
  systemchatTxt:{
    fontSize:Dimension.font14,
  color:Colors.FontColor,
  fontFamily:Dimension.CustomMediumFont,
  
  },
  userchatTxt:{
    fontSize:Dimension.font14,
  color:Colors.WhiteColor,
  fontFamily:Dimension.CustomMediumFont,
  },
  DocDownWrapBtn:{
    backgroundColor:Colors.grayShade1,
    borderColor:Colors.BoxBorderColor,
    borderRadius:4,
    paddingHorizontal:Dimension.padding10,
    paddingVertical:Dimension.padding5,
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:Dimension.margin10
  },
  DocName:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,  
    //width:"50%"
  },
  DownloadTxt:{
    fontSize:Dimension.font12,
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomMediumFont,  
    marginLeft:Dimension.margin5,
    alignSelf:"center"
  },
  systemchatDate:{
    fontSize:Dimension.font10,
    color:Colors.grayShade6,
    fontFamily:Dimension.CustomRegularFont,  
    marginTop:Dimension.margin5,
    alignSelf:"flex-end",
    marginRight:Dimension.margin15,
  },
  userchatDate:{
    fontSize:Dimension.font12,
    color:Colors.grayShade6,
    fontFamily:Dimension.CustomRegularFont,
    marginTop:Dimension.margin5,
    marginLeft:Dimension.margin15,
  },
  userchat: {
    backgroundColor:Colors.FontColor,
    borderTopRightRadius:12,
    borderBottomLeftRadius:12,
    borderBottomRightRadius:12,
    width:"80%",
    alignSelf:"flex-start",
    padding:Dimension.padding20,
    
  },
  ticketStatusBtn:{
    flexDirection:"row",
    borderWidth:1,
    borderRadius:4,
    borderColor:Colors.FontColor,
    paddingVertical:Dimension.padding8,
    paddingHorizontal:Dimension.padding15,
    justifyContent:"space-between"
  },
  ticketstatusTxt:{
    fontSize:Dimension.font14,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont,
  },
  headerListWrap:{
    backgroundColor:Colors.NudgeColor,
    borderRadius:4,
    padding:Dimension.padding10,
    marginHorizontal:Dimension.margin10
  },
  headerListInnerWrap:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:Dimension.margin5,
    marginHorizontal:Dimension.margin10
  },
  HeaderTicketTxt:{
    fontSize:Dimension.font14,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomMediumFont,  
  },
  HeaderTicketDate:{
    fontSize:Dimension.font12,
    color:Colors.grayShade6,
    fontFamily:Dimension.CustomRegularFont,
    
  },
});

export default styles;

