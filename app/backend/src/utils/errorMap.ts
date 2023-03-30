/* eslint-disable @typescript-eslint/naming-convention */
export const errorMap = {
  NOT_FOUND: 401,
  INVALID_VALUE: 422,
  MISSING_VALUE: 400,
};

export const mapError = (type: string) => (
  errorMap[type as keyof typeof errorMap] || 500
);
