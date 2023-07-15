const notification_service = require('./notificationService');

const onGetNotificationByIdReceiver = async (_idReceiver) => {
    try {
        const notifications = await notification_service.get_notification_by_idReceiver(_idReceiver);
        return notifications;
    } catch (error) {
        console.log('Get notification by id receiver error: ', error);
    }
};

const onUpdateNotificationIsCheck = async (_idNotification) => {
    try {
        const notification = await notification_service.update_notification_isCheck(_idNotification);
        return notification;
    } catch (error) {
        console.log('Update notification is check error: ', error);
    }
};

const onDeleteNotification = async (_idNotification) => {
    try {
        const notification = await notification_service.delete_notification(_idNotification);
        return notification;
    } catch (error) {
        console.log('Delete notification error: ', error);
    }
};

const onAddNotification = async (_notification) => {
    try {
        const notification = await notification_service.add_notification(_notification);
        return notification;
    } catch (error) {
        console.log('Add notification error: ', error);
    }
};

module.exports = {
    onGetNotificationByIdReceiver, onUpdateNotificationIsCheck, onDeleteNotification, onAddNotification
}