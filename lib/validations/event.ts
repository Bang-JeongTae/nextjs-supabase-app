import { z } from "zod";
import { RecurrenceRule } from "@/types";

export const createEventSchema = z
  .object({
    title: z
      .string()
      .min(1, "일정 제목을 입력해주세요")
      .max(200, "제목은 200자 이하여야 합니다"),
    description: z
      .string()
      .max(1000, "설명은 1000자 이하여야 합니다")
      .optional(),
    location: z.string().max(200, "장소는 200자 이하여야 합니다").optional(),
    startAt: z.date({ message: "시작 시간을 선택해주세요" }),
    endAt: z.date({ message: "종료 시간을 선택해주세요" }),
    capacity: z
      .number()
      .int("정원은 정수여야 합니다")
      .min(1, "정원은 1명 이상이어야 합니다")
      .max(10000, "정원은 10000명 이하여야 합니다"),
    rsvpDeadline: z.date({ message: "RSVP 마감 시간을 선택해주세요" }),
    recurrenceRule: z
      .enum([RecurrenceRule.NONE, RecurrenceRule.WEEKLY])
      .default(RecurrenceRule.NONE),
  })
  .refine((data) => data.startAt < data.endAt, {
    message: "종료 시간은 시작 시간보다 늦어야 합니다",
    path: ["endAt"],
  })
  .refine((data) => data.rsvpDeadline <= data.startAt, {
    message: "RSVP 마감은 시작 시간 이전이어야 합니다",
    path: ["rsvpDeadline"],
  });

export type CreateEventInput = z.infer<typeof createEventSchema>;
