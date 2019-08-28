import React, {useEffect, useState, useMemo} from 'react';
import {Alert, ActivityIndicator, View} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {format, subDays, addDays} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {
  Container,
  NoResults,
  DateNavigation,
  ArrowButton,
  Title,
  List,
} from './styles';

function Dashboard({isFocused}) {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", {locale: pt}),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date,
          page,
        },
      });

      const data = page === 1 ? response.data : [...meetups, ...response.data];

      setMeetups(data);
      console.tron.log(response.data);
      setLoadMore(false);
      setLoading(false);
    }

    if (isFocused && loadMore) {
      loadMeetups();
      setLoadMore(false);
    }
  }, [isFocused, date, loadMore, page, meetups]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setMeetups([]);
    setLoadMore(true);
    setLoading(true);
    setPage(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setMeetups([]);
    setLoadMore(true);
    setLoading(true);
    setPage(1);
  }

  async function handleSubscribe(id) {
    try {
      setLoading(true);
      await api.post(`meetups/${id}/subscribe`);
      Alert.alert('Sucesso!', 'Inscrição foi realizada com sucesso');
      setLoading(false);
    } catch (error) {
      Alert.alert('Erro', 'Houve uma falha na inscrição');
      setLoading(false);
    }
  }

  function handleLoadMore() {
    if (meetups.length >= 10) {
      setPage(page + 1);
      setLoadMore(true);
    }
  }

  return (
    <Background>
      <Container>
        <Header />

        <DateNavigation>
          <ArrowButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </ArrowButton>
          <Title>{dateFormatted}</Title>
          <ArrowButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </ArrowButton>
        </DateNavigation>

        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : meetups.length === 0 ? (
          <NoResults>Nenhum meetup nesta data</NoResults>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <Meetup data={item} onSubmit={() => handleSubscribe(item.id)} />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        )}
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
