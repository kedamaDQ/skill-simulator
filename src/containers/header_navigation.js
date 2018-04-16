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

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onButtonClick: ({ type, position }) => {
      switch (type) {
        case OPEN_BULK:
          dispatch(openModalBulk(position));
          break;
        
        case OPEN_USAGE:
          dispatch(openModalUsage(position));
          break;
        
        case OPEN_ABOUT:
          dispatch(openModalAbout(position));
          break;

        case OPEN_SAVE_DIALOG:
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
