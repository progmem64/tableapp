import * as commentsActions from '../../actions/comments';
import * as entriesActions from '../../actions/entries';
import * as eventInfoActions from '../../actions/eventInfo';
import * as eventsActions from '../../actions/events';
import * as eventScreenshotActions from '../../actions/eventScreenshots';
import * as notificationsActions from '../../actions/notifications';


/**
 * Sets up listeners & handlers for server-side-events.
 * Look at implementation for further info.
 * @function
 * @param {ApiConnection} api ApiConnection instance 
 * @param {dispatchAction} dispatch function to dispatch an action to the store
 */
export const setupListeners = (api, dispatch) => {
    // handlers
    // comments
    const _handleUpdateCommentDict = (commentDict) => {
        dispatch(commentsActions.updateCommentDict(commentDict));
    };

    // entries
    const _handleUpdateEntries = ({entryDict, idList}) => {
        dispatch(entriesActions.updateEntries(entryDict, idList));
    };

    // eventInfo
    const _handleUpdateRoleList = (roleList) => {
        dispatch(eventInfoActions.updateRoleList(roleList));
    };

    const _handleUpdateUserDict = (userDict) => {
        dispatch(eventInfoActions.updateUserDict(userDict));
    };

    // events
    const _handleUpdateEventDict = (eventDict) => {
        dispatch(eventsActions.updateEventDict(eventDict));
    };

    // eventScreenshots
    const _handleUpdateScreenshotIds = (ids) => {
        dispatch(eventScreenshotActions.updateScreenshotIds(ids));
    };
    
    // notifications
    const _hanldeUpdateNotificationDict = (notificationDict) => {
        dispatch(notificationsActions.updateNotificationDict(notificationDict))
    };


    // listeners
    // comments
    api.on('comments/updateCommentDict', _handleUpdateCommentDict);

    // entries
    api.on('entries/updateEntries', _handleUpdateEntries);

    // eventInfo
    api.on('eventInfo/updateRoleList', _handleUpdateRoleList);
    api.on('eventInfo/updateUserDict', _handleUpdateUserDict);

    // events
    api.on('events/updateEventDict', _handleUpdateEventDict);

    // eventScreenshots
    api.on('eventScreenshots/updateScreenshotIds', _handleUpdateScreenshotIds);

    // notifications
    api.on('notifications/updateNotificationDict', _hanldeUpdateNotificationDict);
};