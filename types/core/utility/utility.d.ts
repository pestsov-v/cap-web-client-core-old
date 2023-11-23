export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'TRACE' | 'HEAD' | 'OPTIONS'
export type UnknownObject = Record<string, unknown>
export type StringObject = Record<string, string>
export type Nullable<T>  = T | null