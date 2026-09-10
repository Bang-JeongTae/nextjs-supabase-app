import { z } from "zod";

export const createNoticeSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(200, "제목은 200자 이하여야 합니다"),
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(5000, "내용은 5000자 이하여야 합니다"),
  isPinned: z.boolean().default(false),
});

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>;
