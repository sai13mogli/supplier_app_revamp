import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
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
        props.navigation.goBack();
      }
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader
        showBack
        navigation={props.navigation}
        showText={'New Ticket'}
        // rightIconName={'category--brand'}
      />
      <ScrollView style={{padding: 12}}>
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
      </ScrollView>
    </>
  );
};

export default NewTicket;
