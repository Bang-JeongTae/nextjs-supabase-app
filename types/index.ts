// ============================================================================
// Enums
// ============================================================================

export enum GroupCategory {
  SWIMMING = "swimming",
  HEALTH = "health",
  RUNNING = "running",
  OTHER = "other",
}

export enum MemberRole {
  OWNER = "owner",
  MEMBER = "member",
}

export enum RsvpStatus {
  ATTENDING = "attending",
  NOT_ATTENDING = "not_attending",
  WAITLIST = "waitlist",
}

export enum RecurrenceRule {
  NONE = "none",
  WEEKLY = "weekly",
}

export enum RsvpSource {
  MEMBER = "member",
  GUEST = "guest",
}

export enum NotificationType {
  NOTICE = "notice",
  EVENT = "event",
}

// ============================================================================
// Domain Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  category: GroupCategory;
  memberCount: number;
  nextEvent?: Event;
  inviteCode: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  groupId: string;
  userId: string;
  role: MemberRole;
  user: User;
  joinedAt: Date;
}

export interface Notice {
  id: string;
  groupId: string;
  title: string;
  content: string;
  isPinned: boolean;
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  location?: string;
  startAt: Date;
  endAt: Date;
  capacity: number;
  rsvpDeadline: Date;
  recurrenceRule: RecurrenceRule;
  publicToken: string;
  authorId: string;
  attendingCount: number;
  waitlistCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRsvp {
  id: string;
  eventId: string;
  userId?: string;
  guestName?: string;
  guestPhone?: string;
  status: RsvpStatus;
  source: RsvpSource;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  relatedId: string; // noticeId or eventId
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// ============================================================================
// Page Params
// ============================================================================

export interface GroupPageParams {
  groupId: string;
}

export interface NoticePageParams extends GroupPageParams {
  noticeId: string;
}

export interface EventPageParams extends GroupPageParams {
  eventId: string;
}

export interface JoinPageParams {
  inviteCode: string;
}

export interface PublicRsvpPageParams {
  publicToken: string;
}
