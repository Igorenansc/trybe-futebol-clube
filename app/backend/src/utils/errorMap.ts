const errors = ['NOT_AUTHORIZED', 'INVALID_VALUE', 'MISSING_VALUE', 'NOT_FOUND'];
const statuses = [401, 422, 400, 404];

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
