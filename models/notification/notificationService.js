const notification_model = require('./notificationModel');

//Lay tat ca notification theo idReceiver
const get_notification_by_idReceiver = async (_idReceiver) => {
    const notifications = await notification_model.find({ idReceiver: _idReceiver });
    return notifications;
};

//Cap nhat notification da doc
const update_notification_isCheck = async (_idNotification) => {
    const notification = await notification_model.findById(_idNotification);
    notification.isCheck = true;
    await notification.save();
    return notification;
};

//Xoa notification
const delete_notification = async (_idNotification) => {
    const notification = await notification_model.findByIdAndDelete(_idNotification);
    return notification;
};

//Them notification
const add_notification = async (_notification) => {
    const notification = new notification_model(_notification);
    await notification.save();
    return notification;
}

module.exports = {
    get_notification_by_idReceiver, update_notification_isCheck, delete_notification, add_notification
};