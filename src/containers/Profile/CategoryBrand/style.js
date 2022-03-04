import {StyleSheet} from 'react-native';
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
  labelStyle: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
    fontWeight: 'normal',
  },
  starIcon: {
    color: Colors.BrandColor,
    fontSize: Dimension.font10,
    fontFamily: Dimension.CustomMediumFont,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: Colors.FontColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding12,
    height: Dimension.height40,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimension.margin10,
    backgroundColor: Colors.WhiteColor,
    textAlignVertical: 'center',
    paddingVertical: Dimension.padding12,
  },
  placeholderCss: {
    fontSize: Dimension.font14,
    color: Colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  brandHeadingTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    marginVertical: Dimension.margin20,
  },

  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: Colors.WhiteColor,
  },

  BrandWrap: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.modalBorder,
    marginBottom: Dimension.margin8,
    padding: Dimension.padding20,
  },
  brandTitleTxt: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.FontColor,
  },
  brandNameTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
  },
  ApprovedStatus: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.ApproveStateColor,
  },
  pendingStatus: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.PendineStateColor,
  },
  fillBtn: {
    borderWidth: 1,
    borderColor: Colors.BrandColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding8,
    alignItems: 'center',
  },
  fillDetailtxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.BrandColor,
  },
  ArrowBtn: {
    alignItems: 'flex-end',
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
  TopWrap: {
    paddingHorizontal: Dimension.padding15,
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
    paddingVertical: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
  ModalFormWrap: {
    marginBottom: Dimension.margin20,
  },
  ModalBottomBtnWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },
  NoBrandWrap:{
    backgroundColor:Colors.DisableStateColor,
    borderRadius:4,
    width:"100%",
    height:200,
    justifyContent:"center",
    alignItems:"center"
  },
  NoBrandTxt:{
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
   // marginBottom: Dimension.margin5,
  },
});

export default styles;
