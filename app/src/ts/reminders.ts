export interface Reminder {
  id: string;
  description?: string;
  date?: string;
}

export interface ReminderInput {
  description: string;
  date: Date;
}

export interface ReminderFilterInput {
  from?: Date;
  to?: Date;
}

export interface ReminderDeleteInput {
  remindersId: number[];
}
