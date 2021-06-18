export interface Reminder {
  id: string;
  description?: string;
  date?: string;
}

export interface ReminderInput {
  description: string;
  date: Date;
  user_id: number | null;
}

export interface ReminderFilterInput {
  from?: Date;
  to?: Date;
}

export interface ReminderDeleteInput {
  remindersId: number[];
}
