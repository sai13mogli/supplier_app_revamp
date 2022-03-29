import { StyleSheet } from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    bottom: 60,
    paddingVertical: 10
  },
  sectionView: {
    paddingVertical: 80,
    borderColor: 'grey',
    borderRadius: 12,
    borderWidth: 0.9
  },
  text: {
    fontSize: 16
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
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
    justifyContent: 'center',
    //  alignItems:'flex-end',
    right: 20,
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
  radioText: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin11,
    width: Dimension.width280
  },
  verticalWrapper: {
    paddingVertical: Dimension.padding5
  },
  Separater: {
    height: 0.8,
    backgroundColor: '#e0e0e0',
    marginTop: 5,
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
    paddingHorizontal: Dimension.padding15
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
});

export default styles;