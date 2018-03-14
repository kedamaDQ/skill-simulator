import {
  MODAL_OPEN,
  MODAL_CLOSE
} from '../actions/modal';

const initialState = {
  is_modal_open: false,
  width: 0,
  height: 0,
  position: {x: 0, y: 0},
  content: '',
  content_params: {}
}

const modal = (state = initialState, action) => {
  switch(action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        is_modal_open: true,
        width: action.width,
        height: action.height,
        position: action.position,
        content: action.content,
        content_params: action.content_params
      };

    case MODAL_CLOSE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default modal;
