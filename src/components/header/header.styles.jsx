import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color:blue;
`;

export const LoggedInStatus = styled.span`
  padding: 10px 15px;
  color:black;
`;

export default OptionLink;