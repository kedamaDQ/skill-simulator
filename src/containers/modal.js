import { connect } from 'react-redux';
import Modal from '../components/modal';
import { closeModal } from '../actions/modal';

const mapStateToProps = (state, ownProps) => {
  const {
    is_modal_open,
    width,
    height,
    position,
    content,
    content_params
  } = state.modal;

  return {
    is_modal_open,
    width,
    height,
    position,
    content,
    content_params
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;
