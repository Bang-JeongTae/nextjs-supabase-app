// ============================================================================
// Action Result Types
// ============================================================================

export interface ActionResult<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// ============================================================================
// Form State Types
// ============================================================================

export interface FormState {
  isLoading: boolean;
  isSubmitted: boolean;
  error?: string;
  success?: boolean;
}

// ============================================================================
// Pagination Types
// ============================================================================

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// Filter Types
// ============================================================================

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// ============================================================================
// Error Types
// ============================================================================

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
