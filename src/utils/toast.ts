// Simple toast utility - can be replaced with a more sophisticated solution later
export const toast = {
  success: (message: string) => {
    console.log('✅ Success:', message);
    // For now using console.log, can be replaced with actual toast implementation
    if (typeof window !== 'undefined') {
      alert(`Success: ${message}`);
    }
  },
  error: (message: string) => {
    console.error('❌ Error:', message);
    // For now using console.error, can be replaced with actual toast implementation
    if (typeof window !== 'undefined') {
      alert(`Error: ${message}`);
    }
  },
  info: (message: string) => {
    console.log('ℹ️ Info:', message);
    if (typeof window !== 'undefined') {
      alert(`Info: ${message}`);
    }
  },
  warning: (message: string) => {
    console.warn('⚠️ Warning:', message);
    if (typeof window !== 'undefined') {
      alert(`Warning: ${message}`);
    }
  },
};
