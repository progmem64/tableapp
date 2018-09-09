import * as commentsActionTypes from '../actiontypes/comments';
import * as commentsApiMethods from '../api/actions/comments';
import { getImage } from '../reducers/images';


/**
 * Creates action for changing a users vote on an entry.
 * @function
 * @param {string} entryId entryId 
 * @param {string} commentId commentId
 * @param {number} vote number representing vote (>0: upvote, 0: no vote, <0: downvote)
 * @returns {object} action
 */
export function changeVote(entryId, commentId, vote) {
    return ({
        type: 'apiCall',
        apiCall: {
            types: [commentsActionTypes.CHANGE_VOTE_REQUEST,
                commentsActionTypes.CHANGE_VOTE_SUCCESS,
                commentsActionTypes.CHANGE_VOTE_FAILURE],
            call: (api) => commentsApiMethods.changeVote(api, entryId, commentId, vote)
        }
    });
}


/**
 * Creates action for posting a new comment.
 * @function
 * @param {string} entryId entryId
 * @param {(string|null)} parentId id of parent-comment. '0' or null for toplevel
 * @param {boolean} isAnonymous true if posting is anonymous, otherwise false
 * @param {string} content content of comment
 * @param {Array<string>} imageIds array of images (by id) to attach
 * @returns {object} action
 */
export function postComment(entryId, parentId, isAnonymous, content, imageIds) {
    return (dispatch, getState) => {
        const imageDataArr = imageIds.map((id) => getImage(getState().images, id));
        dispatch({
            type: 'apiCall',
            apiCall: {
                key: 'postComment',
                types: [commentsActionTypes.POST_COMMENT_REQUEST,
                    commentsActionTypes.POST_COMMENT_SUCCESS,
                    commentsActionTypes.POST_COMMENT_FAILURE],
                call: (api) => commentsApiMethods.postComment(api, entryId, parentId, isAnonymous, content, imageDataArr)
            }
        });
    }
}


/**
 * Creates action for subscribing to comments (for an entry).
 * @function
 * @param {string} entryId entryId
 * @returns {object} action
 */
export function subscribeCommentsForEntry(entryId) {
    return {
        type: 'apiCall',
        apiCall: {
            key: 'subscribeCommentsForEntry',
            types: [commentsActionTypes.SUBSCRIBE_COMMENTS_FOR_ENTRY_REQUEST,
                commentsActionTypes.SUBSCRIBE_COMMENTS_FOR_ENTRY_SUCCESS,
                commentsActionTypes.SUBSCRIBE_COMMENTS_FOR_ENTRY_FAILURE],
            call: (api) => commentsApiMethods.subscribeCommentsForEntry(api, entryId)
        },
        entryId
    };
}


/**
 * Creates action for unsubscribing from comments (for last subscribed entry).
 * @function
 * @returns {object} action
 */
export function unsubscribeCommentsForEntry() {
    return ({
        type: 'apiCall',
        apiCall: {
            key: 'unsubscribeCommentsForEntry', // should not be blocked by subscribe event
            types: [commentsActionTypes.UNSUBSCRIBE_COMMENTS_FOR_ENTRY_REQUEST,
                commentsActionTypes.UNSUBSCRIBE_COMMENTS_FOR_ENTRY_SUCCESS,
                commentsActionTypes.UNSUBSCRIBE_COMMENTS_FOR_ENTRY_FAILURE],
            call: (api) => commentsApiMethods.unsubscribeCommentsForEntry(api)
        }
    });
}


/**
 * Creates action for updating the comment-dict.
 * @function
 * @param {CommentDict} commentDict commentDict-update
 * @returns {object} action
 */
export function updateCommentDict(commentDict) {
    return ({
        type: commentsActionTypes.UPDATE_COMMENT_DICT,
        commentDict,
    });
}
