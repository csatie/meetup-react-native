import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  background: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px 15px 0;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Content = styled.View`
  color: #999;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Time = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 6px;
`;

export const Location = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 6px;
`;

export const Owner = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 6px;
`;

export const SubmitButton = styled(Button)`
  margin: 20px 15px;
  opacity: ${props => (props.past ? 0.3 : 1)};
`;
