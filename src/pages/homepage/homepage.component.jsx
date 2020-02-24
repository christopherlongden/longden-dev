import React from 'react';

import GroupList from '../../components/group-list/group-list.component'

import HomePageContainer from './homepage.styles'

const HomePage = () => (
    <HomePageContainer>
        Groups Directory:
        <GroupList/>
    </HomePageContainer>
);

export default HomePage;