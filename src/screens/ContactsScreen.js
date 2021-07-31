import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Layout,
  Text,
  Divider,
  Button,
  Icon,
  List,
  ListItem,
  Avatar,
  Spinner,
} from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../store/actions/contactAction';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { contacts, loading } = useSelector((state) => state.contact);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getContacts());
    };
    getData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getContacts());
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() => navigation.navigate('ContactDetail', { id: item.id })}
      title={`${item.firstName} ${item.lastName}`}
      accessoryLeft={
        item.photo.includes('http') ? (
          <Avatar source={{ uri: item.photo }} size='giant' ImageComponent={ImageBackground} />
        ) : (
          <Icon name='person' />
        )
      }
    />
  );

  const PersonAddIcon = (props) => <Icon {...props} name='person-add-outline' />;

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <Layout style={{ flex: 1 }} style={{ backgroundColor: 'white' }}>
          <Layout style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text category='h4'>Contacts</Text>
              <Button
                accessoryLeft={PersonAddIcon}
                appearance='ghost'
                size='medium'
                onPress={() => navigation.navigate('ContactCreate')}
                style={{ color: '#20A4DC' }}
              >
                Add
              </Button>
            </Layout>
          </Layout>
          <Divider style={{ marginVertical: 5 }} />
          {loading ? (
            <Layout
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('window').height * 0.8,
              }}
            >
              <Spinner />
            </Layout>
          ) : (
            <ScrollView
              style={{
                maxHeight: Dimensions.get('window').height * 0.89,
                marginTop: 10,
              }}
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              {contacts && contacts.length > 0 ? (
                <List data={contacts} renderItem={renderItem} ItemSeparatorComponent={Divider} />
              ) : (
                <Layout
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get('window').height * 0.8,
                  }}
                >
                  <MaterialCommunityIcons
                    name='alert-remove-outline'
                    size={64}
                    color='grey'
                    style={{ paddingVertical: 0, marginRight: 10 }}
                  />
                  <Text appearance='hint'>You don't have a contact person</Text>
                </Layout>
              )}
            </ScrollView>
          )}
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default ContactsScreen;
