import { toast as sonnerToast } from 'sonner';

const gradientStyle = {
  background: "linear-gradient(90deg, #ff2394 0%, #280595 100%)",
  color: "white",
};

// Toast utility using Sonner for better UX
export const toast = {
  success: (message: string) => {
    sonnerToast.success(message, { style: gradientStyle });
  },
  error: (message: string) => {
    sonnerToast.error(message);
  },
  info: (message: string) => {
    sonnerToast.info(message);
  },
  warning: (message: string) => {
    sonnerToast.warning(message);
  },
  loading: (message: string) => {
    return sonnerToast.loading(message);
  },
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};
