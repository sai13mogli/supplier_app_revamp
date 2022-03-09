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
    marginLeft:Dimension.margin5
  },
});

export default styles;

