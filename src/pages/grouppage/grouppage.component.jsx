import React from 'react';
import GroupPageContainer from './grouppage.styles'
import { firestore } from '../../firebase/firebase.utils.js';
import NewsItems from '../../components/news-items/news-items.component';
import AddNewsItem from '../../components/add-news-item/add-news-item.component';

class GroupPage extends React.Component {
    unsubscribeFromGroupSnapshot = null;

    constructor(props) {
        super(props);

        this.state = {
            group: {
                name: null,
                id: props.match.params.id
            }
        }
    }
    
    componentDidMount() {
        const groupRef = firestore.collection('group').doc(this.state.group.id);
        
        this.unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
            if (snapshot.exists) {
                console.log(snapshot.data());
                this.setState ( { group: snapshot.data() });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromGroupSnapshot();
    }

    render() {
        return (
            <GroupPageContainer>
                <h3>Group Page: { this.state.group.name }</h3>
                
                <h4>Members</h4>

                <h4>Chat</h4>
    
                <h4>News</h4>

                <NewsItems group={this.state.group}/>

                <AddNewsItem group={this.state.group}/>
                
            </GroupPageContainer>
        )
    }
}

export default GroupPage;