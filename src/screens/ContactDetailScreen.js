import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, Dimensions, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Layout,
  Divider,
  Text,
  Button,
  Avatar,
  Icon,
  Spinner,
  useTheme,
} from '@ui-kitten/components';
import {
  getContact,
  clearContact,
  deleteContact,
  getContacts,
} from '../store/actions/contactAction';

const ContactDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { contact } = useSelector((state) => state.contact);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getContact(id));
    };
    getData();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearContact());
    };
  }, []);

  const handleDelete = (data) => {
    setDisable(true);
    Alert.alert('Confirm', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => setDisable(false),
      },
      {
        text: 'OK',
        onPress: async () => {
          const res = await dispatch(deleteContact(data));
          if (res.status) {
            await dispatch(getContacts());
            navigation.navigate('Contacts');
          } else {
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
          }

          setDisable(false);
        },
      },
    ]);
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
    <SafeAreaView edges={['top', 'right', 'left', 'bottom']} style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'space-between' }}>
        <Layout>
          <Layout level='1' style={{ padding: 30 }}>
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text category='h4'>Contact</Text>
              <Button
                size='medium'
                appearance='ghost'
                onPress={() => navigation.navigate('ContactEdit', { contact })}
              >
                Edit
              </Button>
            </Layout>
            {contact && contact.photo ? (
              <>
                <Layout style={[styles.item, { alignItems: 'center' }]}>
                  {contact.photo.includes('http') ? (
                    <Avatar
                      source={{ uri: contact.photo }}
                      size='giant'
                      ImageComponent={ImageBackground}
                    />
                  ) : (
                    <Layout
                      style={{ borderRadius: 20, borderWidth: 1, borderColor: 'grey', padding: 10 }}
                    >
                      <Icon name='person' style={{ width: 32, height: 32 }} fill='#8F9BB3' />
                    </Layout>
                  )}
                </Layout>
                <Layout style={styles.item}>
                  <Text appearance='hint'>First Name</Text>
                  <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color={theme['color-basic-600']}
                      style={{ paddingVertical: 8, marginRight: 10 }}
                    />
                    <Text>{contact.firstName}</Text>
                  </Layout>
                </Layout>
                <Divider />
                <Layout style={styles.item}>
                  <Text appearance='hint'>Last Name</Text>
                  <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color={theme['color-basic-600']}
                      style={{ paddingVertical: 8, marginRight: 10 }}
                    />
                    <Text>{contact.lastName}</Text>
                  </Layout>
                </Layout>
                <Divider />
                <Layout style={styles.item}>
                  <Text appearance='hint'>Age</Text>
                  <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color={theme['color-basic-600']}
                      style={{ paddingVertical: 8, marginRight: 10 }}
                    />
                    <Text>{contact.age}</Text>
                  </Layout>
                </Layout>
                <Divider />
                <Layout>
                  <Button
                    onPress={() => handleDelete(contact.id)}
                    appearance='outline'
                    status='danger'
                    style={{ marginVertical: 20 }}
                    disabled={disable}
                    accessoryLeft={disable ? LoadingIndicator : null}
                  >
                    Delete
                  </Button>
                </Layout>
              </>
            ) : (
              <Layout
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Dimensions.get('window').height * 0.8,
                }}
              >
                <Spinner />
              </Layout>
            )}
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    marginVertical: 10,
  },
});

export default ContactDetailScreen;
