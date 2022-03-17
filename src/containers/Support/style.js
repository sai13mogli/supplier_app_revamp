import {StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';

const styles = StyleSheet.create({
  EmptyChatWrap: {
    backgroundColor: Colors.grayShade3,
    padding: Dimension.padding20,
    marginHorizontal: Dimension.margin10,
    borderRadius: 10,
    alignItems: 'center',
  },
  EmptyBoldTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginVertical: Dimension.margin20,
  },
  EmptyLightTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    alignSelf: 'center',
    textAlign: 'center',
  },
  NewTicktbtn: {
    backgroundColor: Colors.BrandColor,
    paddingHorizontal: Dimension.padding30,
    paddingVertical: Dimension.padding14,
    borderRadius: 4,
    marginVertical: Dimension.margin30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  NewTicktbtnTxt: {
    fontSize: Dimension.font14,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomMediumFont,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 1,
    marginLeft: Dimension.margin5,
  },
  ticketListContainer: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding10,
  },
  TicketOuterWrap: {
    backgroundColor: Colors.WhiteColor,
    padding: Dimension.padding10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: Dimension.margin10,
  },
  TicketTopWrap: {
    borderRadius: 4,
    backgroundColor: Colors.grayShade5,
    paddingHorizontal: Dimension.padding8,
    paddingVertical: Dimension.padding5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimension.margin15,
  },

  ticketStatus: {
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  ticketIdTxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  TicketTypeWrap: {
    backgroundColor: Colors.FontColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding8,
    paddingVertical: Dimension.padding4,
  },
  tickettypetxt: {
    fontSize: Dimension.font12,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  ticketBottomWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ticketSubTxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  TicketDate: {
    fontSize: Dimension.font12,
    color: Colors.grayShade6,
    fontFamily: Dimension.CustomRegularFont,
  },
  SearchInputCss: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding10,
    backgroundColor: Colors.grayShade7,
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding12,
    right: Dimension.padding15,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
  },
  searchWrapper: {
    marginBottom: Dimension.margin20,
    position: 'relative',
  },

  CloseIcon: {
    position: 'absolute',
    top: Dimension.padding12,
    right: Dimension.padding15,
    fontSize: Dimension.font18,
    color: Colors.BrandColor,
  },
  SearchTicketTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
  ticketTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
  },
  filterBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.FontColor,
    paddingVertical: Dimension.padding5,
    paddingHorizontal: Dimension.padding10,
    alignItems: 'center',
  },
  filterTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin5,
  },
  filterRowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimension.margin15,
  },
  BottomWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },
});

export default styles;
