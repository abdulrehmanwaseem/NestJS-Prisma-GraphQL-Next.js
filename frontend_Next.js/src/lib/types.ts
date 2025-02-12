export interface ParsedError {
  name: string;
  path?: string;
  message: string;
  statusCode: number;
  error: string;
  stack?: string;
}
