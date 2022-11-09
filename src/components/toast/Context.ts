import { createGenericContext, createGenericUseContext } from '../../utils';

interface ToastEvent {
  show: () => void;
  close: () => void;
}

const context = createGenericContext<ToastEvent>();
export default context;

export const useToast = createGenericUseContext<ToastEvent>(context);
