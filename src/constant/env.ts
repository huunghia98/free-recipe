export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
export const ssrBaseUrl = process.env.NEXT_PUBLIC_SSR_API_URL ?? '';
export const GEMINI_KEY = process.env.GEMINI_KEY ?? '';
