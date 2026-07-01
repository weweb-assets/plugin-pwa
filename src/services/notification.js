export async function showNotification({
    notif_title,
    notif_body,
    notif_icon,
    notif_image,
    notif_tag,
    notif_data,
    notif_vibrate,
    notif_actions,
}) {
    if (!('Notification' in window)) {
        throw new Error('Notifications are not available.');
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Notification permission denied.');
        }

        const options = {
            body: notif_body,
            icon: notif_icon,
            image: notif_image,
            tag: notif_tag,
            data: notif_data,
            vibrate: notif_vibrate,
            actions: notif_actions,
        };

        let registration = null;
        if ('serviceWorker' in navigator) {
            registration =
                (await navigator.serviceWorker.getRegistration()) ||
                (await navigator.serviceWorker.ready);
        }

        if (registration) {
            await registration.showNotification(notif_title, options);
        } else {
            new Notification(notif_title, options);
        }
    } catch (error) {
        throw new Error(error, 'Error while sending notification.');
    }
}
