import styled from 'styled-components';

export const NewsItemContainer = styled.div`
    & .title {
        font-weight:bold;
        font-size:20px;
    }
    & .body {
        margin-top:5px;
        margin-bottom: 15px;
    }
    & .created {
        font-size:12px;
    }
`;