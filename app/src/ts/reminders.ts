export interface Reminder {
  id: string;
  description?: string;
  date: string;
}

export interface ReminderInput {
  description: string;
  date: string;
}

export interface ReminderFilterInput {
  from?: string;
  to?: string;
}

export interface ReminderDeleteInput {
  remindersId: number[];
}
