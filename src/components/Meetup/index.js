import React, {useMemo} from 'react';
import {formatDateWithHour} from 'date-fns';
import {View} from 'react-native';

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

export default function Meetup({data, onSubscribe}) {
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

      <SubmitButton onPress={onSubscribe} past={data.past}>
        Realizar inscrição
      </SubmitButton>
    </Container>
  );
}
