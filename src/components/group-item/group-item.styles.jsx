import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GroupItemContainer = styled.div`
    font-weight:bold;
    margin-top:5px;
    margin-bottom:5px;

    & span {
        margin-left:20px;
    }
`;

export const GroupLink = styled(Link)`
  cursor: pointer;
`;