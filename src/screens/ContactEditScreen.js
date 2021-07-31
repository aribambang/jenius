import React, { useState } from 'react';
import { Dimensions, ScrollView, Alert } from 'react-native';
import { Layout, Text, Input, Button, Spinner } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateContacts, getContacts } from '../store/actions/contactAction';

const ContactEditScreen = ({ route }) => {
  const { contact } = route.params;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [age, setAge] = useState(contact.age.toString());
  const [photo, setPhoto] = useState(contact.photo);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!firstName || !lastName || !age || !photo) {
        return Alert.alert('Error', 'Please fill the form');
      }
      setDisable(true);
      const res = await dispatch(
        updateContacts({ id: contact.id, firstName, lastName, age: Number(age), photo }),
      );
      if (res.status) {
        Alert.alert('Success', 'Contact has been updated');

        await dispatch(getContacts());
      } else {
        Alert.alert('Error', res.message);
      }
      setDisable(false);
    } catch (err) {
      Alert.alert('Error', err.message);
      setDisable(false);
    }
  };

  const LoadingIndicator = (props) => (
    <Layout
      style={[
        props.style,
        { backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <Spinner size='small' />
    </Layout>
  );

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Layout style={{ minHeight: Dimensions.get('window').height * 1 }}>
          <Layout style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text category='h5'>Edit Contact</Text>
            <Layout style={{ marginTop: 10 }}>
              <Text style={{ marginTop: 10, marginBottom: 5 }} appearance='hint'>
                First Name :
              </Text>
              <Input
                value={firstName}
                onChangeText={(nextValue) => setFirstName(nextValue)}
                placeholder='Enter First Name'
              />
              <Text style={{ marginTop: 10, marginBottom: 5 }} appearance='hint'>
                Last Name :
              </Text>
              <Input
                value={lastName}
                onChangeText={(nextValue) => setLastName(nextValue)}
                placeholder='Enter Last Name'
              />
              <Text style={{ marginTop: 10, marginBottom: 5 }} appearance='hint'>
                Age :
              </Text>
              <Input
                value={age}
                onChangeText={(nextValue) => setAge(nextValue)}
                placeholder='Enter Age'
                keyboardType='number-pad'
              />
              <Text style={{ marginTop: 10, marginBottom: 5 }} appearance='hint'>
                Photo (URL):
              </Text>
              <Input
                value={photo}
                onChangeText={(nextValue) => setPhoto(nextValue)}
                placeholder='Enter URL Photo'
              />
              <Layout>
                <Button
                  disabled={disable}
                  accessoryLeft={disable ? LoadingIndicator : null}
                  onPress={() => handleSubmit()}
                  style={{ marginVertical: 20 }}
                >
                  Update
                </Button>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactEditScreen;
