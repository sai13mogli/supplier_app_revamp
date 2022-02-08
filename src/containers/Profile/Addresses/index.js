import React, {useState,} from 'react';
import { Tab, TabView } from 'react-native-elements';
import Billing from './Billing';
import PickedUp from './PickedUp';

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