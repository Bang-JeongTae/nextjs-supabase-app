import { z } from "zod";
import { GroupCategory } from "@/types";

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(2, "모임 이름은 2자 이상이어야 합니다")
    .max(100, "모임 이름은 100자 이하여야 합니다"),
  category: z.enum(
    [
      GroupCategory.SWIMMING,
      GroupCategory.HEALTH,
      GroupCategory.RUNNING,
      GroupCategory.OTHER,
    ],
    { message: "유효한 카테고리를 선택해주세요" },
  ),
  description: z
    .string()
    .max(500, "설명은 500자 이하여야 합니다")
    .optional()
    .or(z.literal("")),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
