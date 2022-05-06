import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 0.9,
    padding: Dimension.padding2,
    paddingHorizontal: Dimension.padding10,
    marginHorizontal: Dimension.margin10,
    height: Dimension.height130,
    borderRadius: 3,
    borderColor: Colors.FontColor,
    marginVertical: Dimension.margin8
  },
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    padding: Dimension.padding15,
    marginTop: Dimension.margin25
  },
  addnewtxt: {
    fontSize: Dimension.font14,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginLeft: Dimension.margin5,
    alignSelf: 'center',
    marginTop: Dimension.margin1,
    textTransform: "uppercase"
  },
  addbank: {
    fontSize: Dimension.font14,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginLeft: Dimension.margin5,
    marginTop: Dimension.margin1,
    textTransform: "uppercase"
  },
  TopWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Dimension.padding25,
  },
  Pageheading: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  pendingBox: {
    borderWidth: .5,
    // marginTop: 20,
    borderRadius: 4,
    borderColor: Colors.grayShade14,
  },
  HeadingWrap: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight: Dimension.margin15
  },
  Detailtxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin4
  },
  DetailHeading: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginBottom: Dimension.margin3
  },
  Pendingtxt: {
    fontSize: Dimension.font12,
    color: Colors.blackColor,
    fontFamily: Dimension.CustomMediumFont,

  },
  pendingWrap: {
    marginBottom: Dimension.margin10,
    flexDirection: 'row',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: Colors.grayShade12,

    justifyContent: "space-between",
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding15
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    marginBottom: Dimension.margin50,
    backgroundColor: Colors.WhiteColor
  },
  submit: {
    backgroundColor: Colors.BrandColor,
    marginHorizontal: Dimensions.margin10,
  },
  nameWrap: {
    flexDirection: 'row',
    top: 10,
    left: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: Dimension.font13
  },
  type: {
    alignSelf: 'center',
    left: 10,
    borderWidth: 1,
    backgroundColor: '#eeeeee',
    borderColor: '#eeeeee',
    fontSize: Dimension.font13
  },
  addresses: {
    top: 15,
    left: 10,
    fontSize: Dimension.font13
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  remove: {
    borderWidth: 0.9,
    top: 33,
    padding: Dimension.padding2,
    paddingHorizontal: Dimension.padding42,
    height: Dimension.height30,
    borderRadius: 3,
    borderColor: Colors.BoxBorderColor,
    marginVertical: Dimension.margin8
  },
});

export default styles;