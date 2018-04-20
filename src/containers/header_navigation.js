import { connect } from 'react-redux';
import HeaderNavigation, {
  OPEN_BULK,
  OPEN_SAVE_DIALOG,
  OPEN_USAGE,
  OPEN_ABOUT
} from '../components/header_navigation';
import {
  openModalBulk,
  openModalSave,
  openModalUsage,
  openModalAbout
} from '../actions/modal';
import { deactivateController } from '../actions/direct_controller';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onButtonClick: ({ type, position }) => {
      switch (type) {
        case OPEN_BULK:
          dispatch(deactivateController());
          dispatch(openModalBulk(position));
          break;
        
        case OPEN_USAGE:
          dispatch(deactivateController());
          dispatch(openModalUsage(position));
          break;
        
        case OPEN_ABOUT:
          dispatch(deactivateController());
          dispatch(openModalAbout(position));
          break;

        case OPEN_SAVE_DIALOG:
          dispatch(deactivateController());
          dispatch(openModalSave(position, ownProps.storageAvailable));
          break;

        default:
          break;
      }
    },
    onOpenBulkModalClick: (position) => {
      dispatch(
        openModalBulk(position)
      );
    }
  };
}

const HeaderNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderNavigation);

export default HeaderNavigationContainer;
