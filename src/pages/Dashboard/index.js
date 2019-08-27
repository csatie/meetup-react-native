import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {Container, List} from './styles';

function Dashboard({isFocused}) {
  const [meetups, setMeetups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          page: 3,
        },
      });

      setMeetups(response.data);
      console.tron.log(response.data);
    }
    loadMeetups();
  }, []);

  async function handleSubscribe(id) {
    try {
      // setLoading(true);
      await api.post(`meetups/${id}/subscribe`);
      Alert.alert('Sucesso!', 'Inscrição foi realizada com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Houve uma falha na inscrição');
    }
  }

  handleRefresh = () => {
    setRefreshing(true);
    loadMeetups(1, true);
    setRefreshing(false);
  };

  return (
    <Background>
      <Container>
        <Header />
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup data={item} onSubmit={() => handleSubscribe(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({tintColor}) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
