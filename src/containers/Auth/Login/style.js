import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import { colors } from 'react-native-elements';

const styles = StyleSheet.create({
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
    marginTop: Dimension.margin30
  },
  smallDeviceCss:{
    height: Dimension.height30, width:Dimension.width120, marginTop: Dimension.margin30, alignSelf: 'center'
  },
  lagreDeviceCss:{
    height: Dimension.height40, width:Dimension.width160, marginTop: Dimension.margin50, alignSelf: 'center'
  },
  headingTxt: {
    fontSize: Dimension.font18,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin30,
  },
  errorTxt: {
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomRegularFont,
  },


  buttonWrap: {
    flexDirection: "row",
    marginTop: Dimension.margin20
  },

  orwrap: {
    flexDirection: "row",
    marginVertical: Dimension.margin20,
    justifyContent: "center",
    alignItems: "center"
  },
  leftHorizontal: {
    height: 1,
    backgroundColor: Colors.grayShade4,
    width: 100,
    borderRadius: 4
  },
  orTxt: {
    fontSize: Dimension.font10,
    color: Colors.eyeIcon,
    fontFamily: Dimension.CustomRegularFont,
    marginHorizontal: Dimension.margin5
  },
  allrighttxt: {
    fontSize: Dimension.font8,
    color: Colors.eyeIcon,
    fontFamily: Dimension.CustomRegularFont,
    marginVertical: Dimension.margin5,
    alignSelf: "center"
  },
  fotgotTxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    alignSelf: "flex-end"
  }

});

export default styles;