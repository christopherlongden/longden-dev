import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MemberItemContainer = styled.div`
    border: 1px black;
    border-style: double;
    margin-top:5px;
    padding:5px;

    & .joinedGroup, .displayName {
        font-size:12px;
        font-weight:bold;
    }

    & .photoURL {
        height:30px;
        width:30px;
    }
`;

export const MemberLink = styled(Link)`
  cursor: pointer;
`;