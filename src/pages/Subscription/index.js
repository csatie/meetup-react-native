import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {Container, List} from './styles';

function Subscription({isFocused}) {
  const [subscriptions, setSubscriptions] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');
    /* const data = response.data.map(meetup => {
      return {
        data: meetup.Meetup,
       formattedDate: format(
          parseISO(meetup.date),
          `dd 'de' MMMM, 'às' HH'h'mm`,
          {locale: pt}
        ),
      };
    });
*/
    setSubscriptions(response.data);
  }

  async function handleUnsubscribe(id) {
    try {
      // setLoading(true);
      await api.delete(`subscriptions/${id}`);
      Alert.alert('Sucesso!', 'Inscrição cancelada');
      loadSubscriptions();
    } catch (error) {
      Alert.alert('Erro', 'Houve uma falha ao tentar cancelar ');
    }
  }

  return (
    <Background>
      <Container>
        <Header />

        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              data={item.Meetup}
              subscribed
              onSubmit={() => handleUnsubscribe(item.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({tintColor}) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
