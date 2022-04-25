import { StyleSheet } from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const styles = StyleSheet.create({
  UserDetailWrap: {
    backgroundColor: Colors.BrandColor,
    padding: Dimension.padding15,
    borderRadius: 8,
  },
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
  },
  UserName: {
    fontSize: Dimension.font14,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  UserEmail: {
    fontSize: Dimension.font12,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  UserContact: {
    fontSize: Dimension.font12,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomRegularFont,
    //marginTop: 5,
  },
  welcomeText: {
    fontSize: Dimension.font10,
    fontWeight: '400',
    color: Colors.textColor,
    lineHeight: 16,
    fontFamily: Dimension.CustomRegularFont,
  },
  outerView: {
    backgroundColor: Colors.WhiteColor,
    flex: 1,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginTop: Dimension.margin15,
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: Colors.WhiteColor,
  },
  titleWrap: {
    height: Dimension.height28,
    backgroundColor: Colors.NudgeColor1,


  },

  TitleLightTxt: {
    fontSize: Dimension.font12,
    backgroundColor: Colors.NudgeColor1,
    textAlign: 'center',
    marginTop: Dimension.margin8,
    color: Colors.blackColor,
    fontFamily: Dimension.CustomRegularFont,
    // marginBottom: Dimension.margin5,
  },
  sendOtptext: {
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomRegularFont,
  },

  setndOtpBtn: {
    backgroundColor: Colors.LightBrandColor,
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding10,
    borderRadius: 2,

    alignItems: 'center',
  },
});

export default styles;
