import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GroupItemContainer = styled.div`
    font-weight:bold;

    & span {
        margin-left:20px;
    }
`;

export const GroupLink = styled(Link)`
  cursor: pointer;
`;