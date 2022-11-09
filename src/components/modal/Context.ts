import { createGenericContext, createGenericUseFunction } from '../../utils';

interface ModalTriggerEvent {
  open: () => void;
  close: () => void;
}

const context = createGenericContext<ModalTriggerEvent>();
export default context;

export const useModal = createGenericUseFunction<ModalTriggerEvent>(context);
