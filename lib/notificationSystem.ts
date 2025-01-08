import { Opportunity } from './mockData';

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export let notifications: Notification[] = [];
let lastChecked: string | null = null;

export function checkForNewOpportunities(opportunities: Opportunity[]): Notification[] {
  const now = new Date().toISOString();
  const newNotifications: Notification[] = [];

  if (lastChecked) {
    const newOpportunities = opportunities.filter(opp => opp.createdAt > lastChecked);
    newOpportunities.forEach(opp => {
      newNotifications.push({
        id: (notifications.length + 1).toString(),
        message: `New opportunity: ${opp.title} by ${opp.organization}`,
        timestamp: new Date(now),
        read: false,
      });
    });
  }

  lastChecked = now;
  notifications = [...notifications, ...newNotifications];
  return newNotifications;
}

export function getNotifications(): Notification[] {
  return notifications;
}

export function markNotificationAsRead(id: string): void {
  notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
}

export function notifyNewOpportunity(opportunity: Opportunity): void {
  const notification: Notification = {
    id: (notifications.length + 1).toString(),
    message: `New opportunity added: ${opportunity.title} by ${opportunity.organization}`,
    timestamp: new Date(),
    read: false,
  };
  notifications.push(notification);
}

