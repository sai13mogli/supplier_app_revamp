import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {OrderedMap} from 'immutable';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import DropDown from '../../../component/common/DropDown';
import MultiFileUpload from '../../../component/common/MultiFileUpload';
import CustomButton from '../../../component/common/Button';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {BASE_URL} from '../../../redux/constants';
import {getCategories, getSubCategories} from '../../../services/support';
import AppHeader from '../../../component/common/Header';
import Toast from 'react-native-toast-message';
import {fetchTickets} from '../../../redux/actions/support';
import {useDispatch} from 'react-redux';

const NewTicket = props => {
  const [loading, setLoading] = useState(false);
  const [category, setcategory] = useState('');
  const [subCategory, setsubCategory] = useState('');
  const [businessType, setbusinessType] = useState('');
  const [explainQuery, setexplainQuery] = useState('');
  const [docs, setdocs] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [categoryError, setcategoryError] = useState('');
  const [subCategoryError, setsubCategoryError] = useState('');
  const [businessTypeError, setbusinessTypeError] = useState('');
  const [explainQueryError, setexplainQueryError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const {data} = await getCategories();
    setCategoryList(data.data.map(_ => ({label: _.name, value: _.id})));
  };

  const fetchSubCategory = async id => {
    const {data} = await getSubCategories(id);
    setSubCategoryList(data.data.map(_ => ({label: _.name, value: _.id})));
  };

  useEffect(() => {
    if (category) {
      validateCategory();
    }
  }, [category]);
  useEffect(() => {
    if (subCategory) {
      validateSubCategory();
    }
  }, [subCategory]);
  useEffect(() => {
    if (businessType) {
      validateBusinessType();
    }
  }, [businessType]);
  useEffect(() => {
    if (explainQuery) {
      validateExplainQuery();
    }
  }, [explainQuery]);

  const FORM_FIELDS = new OrderedMap({
    category: {
      label: 'Category',
      title: 'Category',
      selectedValue: category,
      component: DropDown,
      isImp: true,
      errorMessage: 'Please select a Category',
      showError: categoryError,
      placeholder: 'Please Select a Category',
      onValueChange: text => {
        setcategory(text);
        fetchSubCategory(text);
      },
      items: categoryList,
      enabled: true,
    },
    subCategory: {
      label: 'Sub Category',
      title: 'Sub Category',
      selectedValue: subCategory,
      component: DropDown,
      isImp: true,
      errorMessage: 'Please select a Sub Category',
      showError: subCategoryError,
      placeholder: 'Please Select a Sub Category',
      onValueChange: text => setsubCategory(text),
      items: subCategoryList,
      enabled: true,
    },
    businessType: {
      label: 'Business Type',
      title: 'Business Type',
      selectedValue: businessType,
      component: DropDown,
      isImp: true,
      errorMessage: 'Please select a Business Type',
      showError: businessTypeError,
      placeholder: 'Please Select a Business Type',
      onValueChange: text => setbusinessType(text),
      items: [
        {label: 'Enterprise', value: 'Enterprise'},
        {label: 'Online', value: 'Online'},
        {label: 'ABFRL', value: 'ABFRL'},
      ],
      enabled: true,
    },
    explainQuery: {
      label: 'Explain Query',
      title: 'Explain Query',
      value: explainQuery,
      placeholder: 'Explain your Query',
      component: FloatingLabelInputField,
      isImp: true,
      errorMessage: 'Please explain your query',
      onChangeText: text => setexplainQuery(text),
      showError: explainQueryError,
      IsMultiline:true
    },
  });

  const validateCategory = () => {
    if (category) {
      setcategoryError(false);
    } else {
      setcategoryError(true);
    }
  };

  const validateSubCategory = () => {
    if (subCategory) {
      setsubCategoryError(false);
    } else {
      setsubCategoryError(true);
    }
  };

  const validateBusinessType = () => {
    if (businessType) {
      setbusinessTypeError(false);
    } else {
      setbusinessTypeError(true);
    }
  };

  const validateExplainQuery = () => {
    if (explainQuery) {
      setexplainQueryError(false);
    } else {
      setexplainQueryError(true);
    }
  };

  const submit = async () => {
    if (!category || !subCategory || !businessType || !explainQuery) {
      validateCategory();
      validateSubCategory();
      validateBusinessType();
      validateExplainQuery();
    } else {
      setLoading(true);
      console.log([
        {
          name: 'categoryId',
          data: category,
        },
        {
          name: 'subCategoryId',
          data: subCategory,
        },
        {
          name: 'businessType',
          data: businessType,
        },
        {
          name: 'description',
          data: explainQuery,
        },
        ...docs.map(_ => ({
          name: 'attachments',
          filename: _.name,
          type: _.type,
          data: RNFetchBlob.wrap(_.uri),
        })),
      ]);
      setcategoryError(false);
      setsubCategoryError(false);
      setbusinessTypeError(false);
      setexplainQueryError(false);
      let token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const url = `${BASE_URL}api/ticket/create`;
      const response = await RNFetchBlob.fetch(
        'POST',
        url,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
        [
          {
            name: 'categoryId',
            data: String(category),
          },
          {
            name: 'subCategoryId',
            data: String(subCategory),
          },
          {
            name: 'businessType',
            data: String(businessType),
          },
          {
            name: 'description',
            data: String(explainQuery),
          },
          ...docs.map(_ => ({
            name: 'attachments',
            filename: _.name,
            type: _.type,
            data: RNFetchBlob.wrap(_.uri),
          })),
        ],
      );

      const res = await response.json();
      // setLoader(false);
      // return {
      //   resp: res,
      //   fileData: data,
      // };
      console.log(res);
      if (res.success) {
        Toast.show({
          type: 'success',
          text2: 'Ticket created successfully',
          visibilityTime: 2000,
          autoHide: true,
        });
        fetchTicketListing(1, '');
        props.navigation.goBack();
      }
      setLoading(false);
    }
  };

  const fetchTicketListing = (pageNo, search) => {
    let fetchTicketListingObj = {
      page: pageNo,
      days: 180,
      openOnly: 0,
      search: search,
    };
    dispatch(fetchTickets(fetchTicketListingObj));
  };

  return (
    <View style={{flex: 1}}>
      <AppHeader
        showBack
        navigation={props.navigation}
        showText={'New Ticket'}
        // rightIconName={'category--brand'}
      />
      <ScrollView style={styles.ContainerCss}>
        {FORM_FIELDS.map((field, fieldKey) => (
          <field.component key={fieldKey} {...field} />
        )).toList()}
        <MultiFileUpload
          title={'Add Attachment'}
          subTitle={
            'Attach file (pdf, doc, csv, jpg ,jpeg ,png upto 2 Mb in size)'
          }
          docsList={docs}
          onUpload={doc => setdocs([...docs, doc])}
          onRemove={id => setdocs(docs.filter(doc => doc.id !== id))}
        />
      </ScrollView>
      <View style={styles.BottomWrap}>
        <CustomButton
          title={'CANCEL'}
          buttonColor={Colors.WhiteColor}
          onPress={() => props.navigation.goBack()}
          TextColor={Colors.blackColor}
          borderColor={Colors.WhiteColor}
          TextFontSize={Dimension.font16}
        />
        <CustomButton
          loading={loading}
          disabled={loading}
          title={'SUBMIT'}
          buttonColor={Colors.BrandColor}
          onPress={submit}
          TextColor={Colors.WhiteColor}
          borderColor={Colors.WhiteColor}
          TextFontSize={Dimension.font16}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
  },
  BottomWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },
});
export default NewTicket;
