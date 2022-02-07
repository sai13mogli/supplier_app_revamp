import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList} from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import Billing from './Tabs/Billing';
import PickedUp from './Tabs/PickedUp';


import colors from "../../Theme/Colors"
import styles from '../../containers/Home/style';


const Addresses = () => {
  
  const [index, setIndex] = useState(0);
  





  return (
    <>
    <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Billing"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
       
        <Tab.Item
          title="Pickup"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
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

export default Addresses;