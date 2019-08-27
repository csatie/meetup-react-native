import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {formatDateWithHour} from 'date-fns';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Banner,
  Info,
  Title,
  Content,
  Time,
  Location,
  Owner,
  SubmitButton,
} from './styles';

export default function Meetup({data, subscribed, onSubmit}) {
  // const dateParsed = useMemo(() => formatDateWithHour(data.date), [data.date]);

  return (
    <Container past={data.past}>
      <Banner source={{uri: data.file.url}} />
      <Info>
        <Title>{data.name}</Title>
        <Content>
          <Icon name="event" size={16} color="#999" />
          <Time>{data.date}</Time>
        </Content>
        <Content>
          <Icon name="location-on" size={16} color="#999" />
          <Location>{data.location}</Location>
        </Content>
        <Content>
          <Icon name="person" size={16} color="#999" />
          <Owner>Organizador: {data.user.name}</Owner>
        </Content>
      </Info>

      <SubmitButton onPress={onSubmit} past={data.past}>
        {subscribed ? `Cancelar inscrição` : `Realizar inscrição`}
      </SubmitButton>
    </Container>
  );
}
