import React from 'react';
import GroupPageContainer from './grouppage.styles'
import { firestore, addDocument, convertNewsSnapshotToMap } from '../../firebase/firebase.utils.js';
import NewsItems from '../../components/news-list/news-list.component';
import AddNewsItem from '../../components/add-news-item/add-news-item.component';

class GroupPage extends React.Component {
    unsubscribeFromGroupSnapshot = null;
    unsubscribeFromNewsSnapshot = null;

    constructor(props) {
        super(props);

        this.state = {
            news: [],
            group: {
                name: null,
                id: props.match.params.id
            },
            newsItemTitle: '',
            newsItemBody: '',
            showAddNews: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { newsItemTitle, newsItemBody, group } = this.state;
        const newNewsItem = { title: newsItemTitle, body: newsItemBody, groups: [ group.id ], created: new Date() };
        
        await addDocument('news', newNewsItem);
        this.setState({ newsItemTitle: '', newsItemBody: '', showAddNews: false })
    }

    isFormValid = () => {
        const { newsItemTitle, newsItemBody } = this.state;
        return newsItemTitle && newsItemBody;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    toggleNewPostVisbility = () => {
        this.setState( { showAddNews: !this.state.showAddNews } )
    }
    
    componentDidMount() {
        const groupId = this.state.group.id;
        const groupRef = firestore.collection('group').doc(groupId);
        this.unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
            const group = { id: this.state.group.id, ...snapshot.data() }
            this.setState ( { 
                group: group
            });
        });

        const newsRef = firestore.collection("news").where("groups", "array-contains", groupId)
        this.unsubscribeFromNewsSnapshot = newsRef.onSnapshot(snapshot => {
            this.setState ( { 
                news: convertNewsSnapshotToMap(snapshot) 
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromGroupSnapshot();
        this.unsubscribeFromNewsSnapshot();
    }

    render() {
        const { newsItemTitle, newsItemBody, group, news, showAddNews } = this.state;
        return (
            <GroupPageContainer>
                <h3>Group Page: { group.name }</h3>
                
                {/* <h4>Members</h4>

                <h4>Chat</h4> */}
    
                <h4>News</h4>

                <NewsItems news={news}/>

                <div className="toggle-box">
                    <input type="button" onClick={this.toggleNewPostVisbility} value="Add New Post"/>
                </div>
                { showAddNews ?
                    <div>
                        <h3>New News Post</h3>
                        <AddNewsItem
                            title={newsItemTitle}
                            body={newsItemBody}
                            group={group} 
                            isFormValid={this.isFormValid}
                            handleSubmit={this.handleSubmit} 
                            handleChange={this.handleChange} 
                        />
                    </div>
                    :
                    null }
            </GroupPageContainer>
        )
    }
}

export default GroupPage;