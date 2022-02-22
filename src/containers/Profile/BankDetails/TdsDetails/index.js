import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';

const TdsDetails = () => {
 
  const tdsInfoDetails = useSelector(state => (state.profileReducer.tdsInfoDetails.data||{}));
  const [tdsInfoList, setTdsInfoList] = React.useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Aakash====>",tdsInfoDetails);

  const _updateSections = (activeSections) => {
    setTdsInfoList(activeSections);
  };
  
  const _renderHeader = (section) => {
    const index = tdsInfoDetails.findIndex((i) => i.tdsInfoDetails_id === section.tdsInfoDetails_id);
    const iconName = index === tdsInfoList[0] ? 'angle-up' : 'angle-down';

    return (
      <View
        style={{
          margin: 10,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          {section.financialyear}
        </Text>
            <CustomeIcon 
            type="FontAwesome"
            name={iconName} 
            size={Dimension.font18} 
            color={colors.BrandColor} />
      </View>
    );
  };
 
  const _renderContent = (section) => {
    return (
      <View>
        
        <TouchableOpacity style={styles.iconStyle}
        >
        <CustomeIcon 
            type="FontAwesome"
            name={'add-circle'} 
            size={Dimension.font18} 
            color={colors.BrandColor} />
        <Text style={styles.edit}>
            Edit
         </Text>
        </TouchableOpacity>
      
      
      <View style={styles.sectionView}>
        
         {/* <View style={{height:'80%', width:'1%',
      borderColor:'grey',backgroundColor:'black',justifyContent:'flex-end'}}/> */}
        <View style={styles.wrap}>
            <Text style={styles.text}>ITR filled for 2020-21</Text>
            <Text style={{fontSize: 16}}>{section.lastYearItr==1?'Yes':'No'}</Text>
            </View>
            <View style={[styles.wrap,{bottom:50}]}>
            <Text style={styles.text}>ITR filled for 2020-21</Text>
            <Text style={{fontSize: 16}}>{section.lastToLastYearItr==1?'Yes':'No'}</Text>
            </View>
            <View style={[styles.wrap,{bottom:40}]}>
            <Text style={styles.text}>ITR filled for 2020-21</Text>
            <Text style={{fontSize: 16}}>{section.lastYearTdsTcs==1?'Yes':'No'}</Text>
            </View>
            <View style={[styles.wrap,{bottom:30}]}>
            <Text style={styles.text}>ITR filled for 2020-21</Text>
            <Text style={{fontSize: 16}}>{section.lastToLastYearTdsTcs==1?'Yes':'No'}</Text>
            </View>
            <View style={[styles.wrap,{bottom:20}]}>
            <Text style={styles.text}>ITR filled for 2020-21</Text>
            <Text style={{fontSize: 16}}>{section.financialYearTurnover==1?'Yes':'No'}</Text>
            </View>
       </View>
       </View>
    );
  };
 

  return (
    <View style={{flex:1}}>
      <ScrollView indicatorStyle="white" style={styles.ContainerCss}>
      
      <Accordion
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        sections={tdsInfoDetails || []}
        activeSections={tdsInfoList}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        touchableComponent={TouchableOpacity}
        renderFooter={() => (
          <View style={{height: 10, backgroundColor: '#E0E0E0'}}></View>
        )}
      />
               
      </ScrollView> 
      <View style={styles.bottombtnWrap}>
          <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor }
          TextColor={colors.WhiteColor }
          TextFontSize={Dimension.font16}
          title={'Next'}
          loading={loading}
          // onPress={onSubmit}
        />
          </View>
    </View>
    
  );
};
export default TdsDetails;