import React, { useState, useEffect } from "react";
import GroupPageContainer from './grouppage.styles'
import { useHistory } from "react-router-dom";
import { firestore, addDocument, convertNewsSnapshotToMap, deleteDocument } from '../../firebase/firebase.utils.js';
import NewsItems from '../../components/news-list/news-list.component';
import AddNewsItem from '../../components/add-news-item/add-news-item.component';
import { createUserObjectFromState } from '../../libs/common';

function GroupPage(props) {
    const [news, setNews] = useState([]);
    const [group, setGroup] = useState({ name: null, id: props.match.params.id });
    const [newsItemTitle, setNewsItemTitle] = useState('');
    const [newsItemBody, setNewsItemBody] = useState('');
    const [showAddNews, setShowAddNews] = useState(false);
    const [editing, setEditing] = useState(false);
    const [groupName, setGroupName] = useState('');
    let history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        const newNewsItem = { 
            title: newsItemTitle, 
            body: newsItemBody, 
            groups: [ group.id ], 
            user: createUserObjectFromState(props.currentUser),
            created: new Date() 
        };

        console.log(newNewsItem);
        
        await addDocument('news', newNewsItem);
        setNewsItemTitle('');
        setNewsItemBody('');
        setShowAddNews(false);
    }

    async function handleUpdateGroup(event) {
        console.log("updating group name to: ", groupName);
        const groupRef = await firestore.collection('group').doc(group.id);
        groupRef.update( { name: groupName } )
        setEditing(false);
    }

    function isFormValid() {
        return newsItemTitle.length > 2 && newsItemBody.length > 10;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'newsItemTitle') {
            setNewsItemTitle(value);
        }
        if (name === 'newsItemBody') {
            setNewsItemBody(value);
        }
        if (name === 'groupName') {
            setGroupName(value);
        }
    };

    function toggleNewPostVisbility() {
        setShowAddNews(!showAddNews);
    }

    function editGroupProperties() {
        setEditing(true);
    }

    async function deleteGroup() {
        let confirmDelete = window.confirm("Are you sure you want to delete this group?")
        if (confirmDelete) {
            await deleteDocument('group', group.id);
            history.push("/");
        }
    }

    useEffect(() => {
        
        let unsubscribeFromGroupSnapshot = null;
        let unsubscribeFromNewsSnapshot = null;

        async function onLoad() {
            const groupRef = firestore.collection('group').doc(group.id);
            unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
                const thisGroup = { id: group.id, ...snapshot.data() }
                setGroup(thisGroup);
                setGroupName(thisGroup.name);
            });

            // todo: https://firebase.google.com/docs/firestore/query-data/query-cursors
            const newsRef = firestore.collection("news").where("groups", "array-contains", group.id).orderBy("created", "desc").limit(5);
            unsubscribeFromNewsSnapshot = newsRef.onSnapshot(snapshot => {
                setNews(convertNewsSnapshotToMap(snapshot));
            });

            

            console.log("got group data feed");
        }
    
        onLoad();

        return function cleanup() {
            unsubscribeFromGroupSnapshot();
            unsubscribeFromNewsSnapshot();
        }
    }, [group.id]);


    return (
        <GroupPageContainer>
            <h3>
            Group Page: 
            {
                editing ?
                    <>
                        <span>
                            <input type="text" value={groupName} onChange={handleChange} name="groupName"/>
                            <input type="button" className="edit-button" value="Update Name" onClick={handleUpdateGroup}/>
                        </span>
                    </>
                :
                <span>{groupName}</span>
            }

            { props.currentUser && !editing ?
                <>
                    <input type="button" className="edit-button" onClick={editGroupProperties} name="editGroup" value="Edit Group"/>
                    <input type="button" className="edit-button" onClick={deleteGroup} name="deleteGroup" value="Delete Group"/>
                </>
                :
                null
            }
            </h3>
            
            {/* <h4>Members</h4>

            <h4>Chat</h4> */}

            <h4>News</h4>

            <NewsItems news={news}/>

            { props.currentUser ?
                <div className="toggle-box">
                    <input type="button" onClick={toggleNewPostVisbility} value="Add New Post"/>
                </div>
                :
                null
            }

            { showAddNews && props.currentUser ?
                <div>
                    <h3>New News Post</h3>
                    <AddNewsItem
                        title={newsItemTitle}
                        body={newsItemBody}
                        group={group} 
                        isFormValid={isFormValid}
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                    />
                </div>
                :
                null
            }
        </GroupPageContainer>
    )
}

export default GroupPage;