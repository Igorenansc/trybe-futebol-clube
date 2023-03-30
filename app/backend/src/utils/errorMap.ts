const errors = ['NOT_FOUND', 'INVALID_VALUE', 'MISSING_VALUE'];
const statuses = [401, 422, 400];

interface IError {
  [key: string]: number;
}

export const errorMap = errors.reduce((acc: IError, key, index) => {
  acc[key] = statuses[index];
  return acc;
}, {});

export const mapError = (type: string) => (
  errorMap[type as keyof typeof errorMap] || 500
);
