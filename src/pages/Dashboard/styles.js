import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateNavigation = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 30px 0 20px;
`;

export const ArrowButton = styled.Text`
  margin: 0 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const NoResults = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  opacity: 0.3;
  align-self: center;
  margin-top: 50px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})``;
