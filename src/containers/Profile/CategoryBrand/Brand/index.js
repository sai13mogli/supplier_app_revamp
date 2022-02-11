import React, {useState} from 'react';
import {Tab, TabView} from 'react-native-elements';
import AllBrandsScreen from './AllBrands';
import PopularBrandsScreen from './PopularBrands';

const BrandScreen = () => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'red',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Popular Brands"
          titleStyle={{fontSize: 12}}
          icon={{name: 'timer', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="All Brands"
          titleStyle={{fontSize: 12}}
          icon={{name: 'cart', type: 'ionicon', color: 'white'}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <PopularBrandsScreen />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <AllBrandsScreen />
        </TabView.Item>
      </TabView>
    </>
  );
};

export default BrandScreen;
