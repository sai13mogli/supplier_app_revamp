import React, {useState,} from 'react';
import { Tab, TabView } from 'react-native-elements';
import Accounts from './Accounts';
import TdsDetails from './TdsDetails';

const BankDetails = () => {
  
  const [index, setIndex] = useState(0);

  return (
    <>
     <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'red',
          height: 3,
        }}
        variant="primary"
        >
            <Tab.Item
              title="Accounts"
              titleStyle={{ fontSize: 12 }}
              icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
            />
          <Tab.Item
              title="TDS Taxation Details"
              titleStyle={{ fontSize: 12 }}
              icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
            />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                <Accounts/>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                <TdsDetails/>
            </TabView.Item>
      </TabView>
  
    </>
  );
};

export default BankDetails;