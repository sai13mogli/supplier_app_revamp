import React, {useState,} from 'react';
import { Tab, TabView } from 'react-native-elements';
import Billing from './Billing';
import PickedUp from './PickedUp';
import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
const Addresses = () => {
  
  const [index, setIndex] = useState(0);

  return (
    <>
     <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={styles.indicatorStyle}
        style={{backgroundColor:"#000"}}
       
        >
            <Tab.Item
              title="Billing"
              titleStyle={styles.tabText}
            //  icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
            
            />
          <Tab.Item
              title="Pickup"
              titleStyle={styles.tabText}
            //  icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
            />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                <Billing/>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                <PickedUp/>
            </TabView.Item>
      </TabView>
  
    </>
  );
};
const styles = StyleSheet.create({
indicatorStyle:{
  height:2,
  backgroundColor:Colors.BrandColor

},
tabText:{
  fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
   fontWeight:"normal"
},


  userName: {
    fontSize: Dimension.font14,
    color: Colors.textColor,
    fontFamily: Dimension.CustomRegularFont,
    
  },
  welcomeText: {
    fontSize: Dimension.font10,
    fontWeight: '400',
    color: Colors.textColor,
    lineHeight: 16,
    fontFamily: Dimension.CustomRegularFont,
  },
  statusBar: {
    marginVertical: 24,
  },
  actionSheet: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalText: {
    paddingVertical: Dimension.padding10,
    fontFamily: Dimension.CustomRegularFont,
    borderBottomWidth: 0.5,
    color: Colors.FontColor
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
  
  },
  starIcon:{
    color:Colors.BrandColor,
    fontSize: Dimension.font10,
    
    fontFamily: Dimension.CustomMediumFont,

  },
});

export default Addresses;