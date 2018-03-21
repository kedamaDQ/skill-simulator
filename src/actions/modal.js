export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const openModalAssign = (position, job, skillLine) => {
  return {
    type: MODAL_OPEN,
    position,
    width: 530,
    height: 380,
    content: 'assign',
    content_params: { job, skillLine }
  };
}

export const openModalBulk = (position) => {
  return {
    type: MODAL_OPEN,
    position,
    width: 500,
    height: 325,
    content: 'bulk',
    content_params: {}
  };
};

export const openModalSave = (position) => {
  return {
    type: MODAL_OPEN,
    position,
    width: 300,
    height: 325,
    content: 'save',
    content_params: {}
  }
};

export const openModalUsage = (position) => {
  return {
    type: MODAL_OPEN,
    position,
    width: 500,
    height: 500,
    content: 'usage',
    content_params: {}
  };
};

export const openModalAbout = (position) => {
  return {
    type: MODAL_OPEN,
    position,
    width: 500,
    height: 500,
    content: 'about',
    content_params: {}
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE
  };
}
