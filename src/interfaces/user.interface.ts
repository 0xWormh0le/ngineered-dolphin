export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  isJobSearchUnlocked: boolean;
  profileUrl:string;
}

export interface IUserExpanded {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  isJobSearchUnlocked: boolean;
  progress: Object;
  streakDays: number;
  matches: number;
  applied: number;
  saved: number;
  expired: number;
  streakRecordDays: number;
  appliedPerDayRecord: number;
  profileCompletionPercent: number;
}

export interface IUserSettings{

  info: any;
  answer:any;
} 
