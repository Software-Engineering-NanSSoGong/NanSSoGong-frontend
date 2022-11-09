import { createGenericContext, createGenericUseContext } from '../../utils';

interface ModalTriggerEvent {
  open: () => void;
  close: () => void;
}

const context = createGenericContext<ModalTriggerEvent>();
export default context;

export const useModal = createGenericUseContext<ModalTriggerEvent>(context);
