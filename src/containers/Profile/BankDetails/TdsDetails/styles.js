import { StyleSheet } from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Dimension.padding10,
    borderBottomColor: Colors.grayShade3,
    borderBottomWidth: 1
  },
  sectionView: {
    //paddingVertical: 80,
    borderColor: Colors.grayShade14,
    borderRadius: 4,
    borderWidth: 1
  },
  HeadinngInnerTxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    marginHorizontal: Dimension.margin10,
    borderRightColor: Colors.grayShade3,
    borderRightWidth: 1,
    flex: 8
  },
  yesNotxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    marginHorizontal: Dimension.margin10,
    flex: 1
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
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    marginBottom: Dimension.margin50,
    backgroundColor: Colors.WhiteColor
  },
  type: {
    alignSelf: 'center',
    left: 10,
    borderWidth: 1,
    backgroundColor: '#eeeeee',
    borderColor: '#eeeeee',
    fontSize: Dimension.font13
  },
  iconStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: "absolute",
    right: 30,
    top: 15,
    zIndex: 999
  },
  edit: {
    fontSize: Dimension.font16,
    color: Colors.BrandColor,
    bottom: 2,
    left: 5,
    alignSelf: 'center'
  },
  checkboxContainer: {
    backgroundColor: Colors.transparent,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: Colors.WhiteColor,
    width: 'auto',
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
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
    marginTop: Dimension.margin25
  },
  addtds: {
    fontSize: Dimension.font14,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginTop: Dimension.margin1,
    textTransform: "uppercase"
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
  submit: {
    backgroundColor: Colors.BrandColor,
    marginHorizontal: Dimension.margin10,
  },
  AccordianHeaderWrap: {

    paddingVertical: Dimension.padding10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AccordianheadingTxt: {
    color: Colors.FontColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomBoldFont
  },

});

export default styles;