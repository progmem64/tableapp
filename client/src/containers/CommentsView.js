import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentsActions from '../actions/comments';
import * as entriesActions from '../actions/entries';
import { isInitialLoadPending, getCommentsView } from '../reducers/comments';
import {Link} from 'react-router-dom';
import {EntryCard} from './EntryCard';
import { Comment, Header, Message, Dropdown, Button, Responsive } from 'semantic-ui-react';
import { CommentCard } from './CommentCard';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { NavBar } from './NavBar';
import { SegmentLoader } from '../components/SegmentLoader';


const CustomCommentGroup = styled(Comment.Group)`
    // .ui.comments &&& {
    &&&&& {
        margin: 0;
        padding: 0;
    }
    // &&&&& {
    //     margin: 1em 0 1em 1px;
    //     padding: 0 0 0 1em;
    //     box-shadow: -2px 0px 0px 0px rgba(0,0,0,.1);
    // }
    // &&&&& {
    //     padding: 0;
    //     margin: 1em 0 1.5em 1.5em;
    // }
`;


/**
 * Displays comments for entryId.
 * 
 * __Exported component is connected to redux-store. Some props are injected by HOC.__
 * @param {object} props
 * @param {object} props.commentsActions object containing bound commentsActions (injected by redux)
 * @param {object} props.commentsView object, contains adjacency list for comment-ids (injected by redux) 
 * @param {object} props.entriesActions object containing bound entriesActions (injected by redux)
 * @param {boolean} props.isInitialLoadPending indicates of comments are currently loading (injected by redux)
 * @param {object} props.match route-match object object (from react-router)
 * @param {object} props.match.params route-match params
 * @param {object} props.match.params.entryId id of entry to display comments for
 */
class CommentsView extends React.Component {
    static get propTypes() {
        return {
            commentsActions: PropTypes.object.isRequired,
            commentsView: PropTypes.object.isRequired,
            entriesActions: PropTypes.object.isRequired,
            isInitialLoadPending: PropTypes.bool.isRequired,
            match: PropTypes.shape({
                    params: PropTypes.shape({
                        entryId: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    /**
     * Lifecycle that subscribes to comments for entryId
     * @function
     */
    componentDidMount() {
        const entryId = this.props.match.params.entryId;
        this.props.entriesActions.subscribeEntries([entryId]);        
        this.props.commentsActions.subscribeCommentsForEntry(entryId);
    }


    /**
     * Lifecycle that unsubscribes comments for entryId
     * @function
     */
    componentWillUnmount() {
        this.props.entriesActions.unsubscribeEntries([this.props.match.params.entryId]);
        this.props.commentsActions.unsubscribeCommentsForEntry();
    }


    /**
     * Renders a comment and all its child comments.
     * @private
     * @function
     * @param {string} parentId id of parent comment
     */
    _renderComments(parentId) {
        const {entryId} = this.props.match.params;
        const childrenIds = this.props.commentsView[parentId];
        if (!childrenIds)
            return;
        const comments = childrenIds.map(id => {
            const innerComments = this._renderComments(id);
            return ( 
                <CommentCard 
                    key={id}
                    commentId={id}
                    entryId={entryId}
                    parentId={parentId}
                    toplevel={parentId === '0'}
                >
                    {innerComments}
                </CommentCard>
            );
        });
        
        if (comments)
            return ( 
                <CustomCommentGroup 
                    key={parentId + "_commentgroup"}
                >
                    {comments}
                </CustomCommentGroup>
            );
    }


    render() {
        const { entryId } = this.props.match.params;
        const { commentsView, isInitialLoadPending } = this.props;

        return (
            <div>
                <NavBar
                    hasGoBack
                    hideNavigation
                    mainContent="Kommentare anzeigen"
                    rightRailContent={
                        <Responsive
                            minWidth={801}
                        >
                            <Button
                                as={Link}
                                color="blue"
                                circular
                                icon="reply"
                                size="big"
                                to={`/entries/${entryId}/0/new`}
                            />
                        </Responsive>
                    }
                />
                <Responsive
                    maxWidth={800}
                >
                    <FloatingActionButton
                        as={Link}
                        icon="reply"
                        to={`/entries/${entryId}/0/new`}
                    />
                </Responsive>
                <EntryCard 
                    entryId={entryId}
                    noLink
                />
                <Header>
                    Kommentare
                    <Header.Subheader>
                        <Dropdown text="Neueste">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Neueste' />
                            <Dropdown.Item text='Bestbewertet' />
                        </Dropdown.Menu>
                        </Dropdown>
                    </Header.Subheader>
                </Header>
                {isInitialLoadPending ? (
                    <SegmentLoader/>
                ) : (
                    Object.keys(commentsView).length ?
                        this._renderComments('0') 
                    : (
                        <Message>
                            <Message.Header>Keine Kommentare</Message.Header>
                        </Message>
                    )
                )}
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        commentsView: getCommentsView(state.comments),
        isInitialLoadPending: isInitialLoadPending(state.comments),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        commentsActions: bindActionCreators(commentsActions, dispatch),
        entriesActions: bindActionCreators(entriesActions, dispatch),        
    };
}


const ConnectedCommentsView = connect(mapStateToProps, mapDispatchToProps)(CommentsView);
export { ConnectedCommentsView as CommentsView };