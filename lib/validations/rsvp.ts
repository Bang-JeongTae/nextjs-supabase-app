import { z } from "zod";
import { RsvpStatus } from "@/types";

export const memberRsvpSchema = z.object({
  status: z.enum(
    [RsvpStatus.ATTENDING, RsvpStatus.NOT_ATTENDING, RsvpStatus.WAITLIST],
    { message: "유효한 응답을 선택해주세요" },
  ),
});

export type MemberRsvpInput = z.infer<typeof memberRsvpSchema>;

export const guestRsvpSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .max(100, "이름은 100자 이하여야 합니다"),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "올바른 전화번호를 입력해주세요")
    .optional()
    .or(z.literal("")),
  status: z.enum(
    [RsvpStatus.ATTENDING, RsvpStatus.NOT_ATTENDING, RsvpStatus.WAITLIST],
    { message: "유효한 응답을 선택해주세요" },
  ),
});

export type GuestRsvpInput = z.infer<typeof guestRsvpSchema>;
