import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const styles = StyleSheet.create({
  actionSheet: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalText: {
    paddingVertical: 10,
    fontFamily: Dimension.CustomRegularFont,
    borderBottomWidth: 0.5,
    color: '#000',
  },
});

export default styles;
