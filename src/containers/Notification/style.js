import {StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';

const styles = StyleSheet.create({
    EmptyNotificationList:{
        backgroundColor:Colors.WhiteColor,
        flex:1,
        alignItems:"center",
        paddingTop:Dimension.padding30
    },
  ContainerCss:{
    backgroundColor:Colors.WhiteColor,
    flex:1
  },
  
  boldtxt:{
fontSize:Dimension.font18,
color:Colors.FontColor,
fontFamily:Dimension.CustomBoldFont,
paddingVertical:Dimension.padding40
  },
  NewTicktbtn:{
    backgroundColor:Colors.BrandColor,
    paddingHorizontal:Dimension.padding30,
    paddingVertical:Dimension.padding14,
    borderRadius:4,
    marginVertical:Dimension.margin30,
    flexDirection:"row",
    justifyContent:"center"
  },
  NewTicktbtnTxt:{
    fontSize:Dimension.font14,
    color:Colors.WhiteColor,
    fontFamily:Dimension.CustomMediumFont, 
    alignSelf:"center",
    textAlign:"center",
    marginTop:1,
    marginLeft:Dimension.margin5,
  },
  notificationWrap:{
   borderRadius:10,
   backgroundColor:Colors.grayShade3,
   marginBottom:Dimension.margin3,
   flexDirection:"row",
   padding:Dimension.padding15,
   justifyContent:"space-between"
  },
  ActivenotificationWrap:{
    borderRadius:10,
    backgroundColor:Colors.LightBrandColor,
    marginBottom:Dimension.margin3,
    flexDirection:"row",
    padding:Dimension.padding15,
    justifyContent:"space-between"
  },
  titleCss:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
    
  },
  iconWrap:{
    width:Dimension.width30,
    height:Dimension.width30,
    backgroundColor:Colors.WhiteColor,
    borderRadius:Dimension.width30,
    justifyContent:"center",
    alignItems:"center",
    marginRight:Dimension.margin10

  },
  ActioniconWrap:{
    width:Dimension.width30,
    height:Dimension.width30,
    backgroundColor:Colors.LightBrandColor2,
    borderRadius:Dimension.width30,
    justifyContent:"center",
    alignItems:"center",
    marginRight:Dimension.margin10
  },
  timeorDateCss:{
    fontSize:Dimension.font10,
    color:Colors.eyeIcon,
    fontFamily:Dimension.CustomRegularFont,
    marginTop:Dimension.margin10
  },
  TitleDateCss:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont,
  },
  titleDateWrap:{
    flexDirection:"row",
  justifyContent:"space-between",
  padding:Dimension.padding15
  },
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Dimension.padding20,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
  modalBtn:{
    flexDirection:"row",
    marginBottom:Dimension.margin20
  },
  ModalTxt:{
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginLeft: Dimension.margin10,
  },
});

export default styles;

