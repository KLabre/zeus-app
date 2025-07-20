export const ENV = import.meta.env.VITE_APP_ENVIRONMENT || 'local';
export const APP_NAMESPACE = import.meta.env.VITE_APP_NAMESPACE || 'zeus-app';

// We should always build our storage based on the namespace and environment
export function storageKey(key: string): string {
  return `${APP_NAMESPACE}:${ENV}:${key}`;
}
