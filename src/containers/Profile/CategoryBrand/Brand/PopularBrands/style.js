import {StyleSheet} from 'react-native';
import Colors from '../../../../../Theme/Colors';
import Dimension from '../../../../../Theme/Dimension';
const styles = StyleSheet.create({
Wrapper:{
  marginTop:Dimension.margin20,
  flexDirection:"row"
  },
  activeBackground: {
   backgroundColor:Colors.grayShade1,
   paddingHorizontal:Dimension.padding10,
   paddingVertical:Dimension.padding15
  },
  inactiveBackground: {
    backgroundColor:Colors.WhiteColor,
    paddingHorizontal:Dimension.padding10,
    paddingVertical:Dimension.padding15
  },
  leftPart:{
    flex:.8,
    marginRight:Dimension.margin10
  },
  rightPart:{
    flex:1
  },
  categoryText:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
  },

});

export default styles;
