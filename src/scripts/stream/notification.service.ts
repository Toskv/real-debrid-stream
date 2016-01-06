import {Injectable} from 'angular2/core';
import Permissions = chrome.permissions;
import Notifications = chrome.notifications;

@Injectable()
export class NotificationService {
	notify(text: string): void {
		console.log('notify' + text);
		if (!Notifications) {
			alert('Desktop notifications not available in your browser. Try Chromium.');
		}
		else {
			Permissions.contains({ permissions: ['notifications'] }, (result: boolean) => {
				if (result) {
					this.createNotification(text);
				} else {
					Permissions.request({ permissions: ['notifications'] }, (granted: boolean) => {
						if (granted) {
							this.createNotification(text);
						}
					});
				}
			});
		}
	}

	private createNotification(text: string): void {
		Notifications.create('Real-debrid stream', { contextMessage: text, iconUrl: './icon.png' });
	}
}
