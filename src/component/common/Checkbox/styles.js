import {StyleSheet} from 'react-native';
import Dimension from "../../../Theme/Dimension";
import colors from "../../../Theme/Colors"

const styles = StyleSheet.create({
  checkboxTitle:{
    fontSize:Dimension.font12,
    color:colors.FontColor,
    fontWeight:"normal",
    marginLeft:Dimension.margin5,
  },
  checkboxwrapper:{
    backgroundColor:colors.transparent,
  },
  checkboxContainer:{
    backgroundColor:colors.transparent,
    paddingVertical:0,
    paddingHorizontal:0,
    borderWidth:0,
    borderColor:colors.WhiteColor,
    width:"auto"
  },
});

export default styles;