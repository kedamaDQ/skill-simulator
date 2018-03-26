import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import ModalAssignContainer from '../containers/modal_assign';
import ModalSaveContainer from '../containers/modal_save';
import ModalBulkContainer from '../containers/modal_bulk';
import ModalUsage from './modal_usage';
import ModalAbout from './modal_about';

ReactModal.setAppElement('body');

const edgeMargin = 50;
const textAboutClose = <div className='text-about-close'>Press [Esc] or click outside to close.</div>

export default class Modal extends React.PureComponent {

  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    content: PropTypes.string.isRequired,
    contentParams: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
  };

  /*
  componentDidMount() {
    document.addEventListener('wheel', (e) => {
      e.stopPropagation();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('wheel');
  }
  */

  renderModalContent() {
    switch (this.props.content) {
      case 'assign':
        return(
          <div>
            <ModalAssignContainer
              job={this.props.contentParams.job}
              skillLine={this.props.contentParams.skillLine}
            />
            { textAboutClose }
          </div>
        );
      
      case 'bulk':
        return(
          <div>
            <ModalBulkContainer
              contentParams={this.props.contentParams}
            />
            { textAboutClose }
          </div>
        );

      case 'save':
        return(
          <ModalSaveContainer
            contentParams={this.props.contentParams}
          />
        );

      case 'usage':
        return(
          <div>
            <ModalUsage
              contentParams={this.props.contentParams}
            />
            { textAboutClose }
          </div>
        );

      case 'about':
        return(
          <div>
            <ModalAbout
              contentParams={this.props.contentParams}
            />
            { textAboutClose }
          </div>
        );

      default:
        return '?';
    }
  }

  render() {
    const { width, height, position: { x, y } } = this.props;

    const top =
      (height + edgeMargin * 2 > window.innerHeight) ? 0 + edgeMargin :
      (y - height / 2 < 0 + edgeMargin) ? 0 + edgeMargin :
      (y + height / 2 > window.innerHeight - edgeMargin) ? window.innerHeight - (height + edgeMargin) :
      y - height / 2;

    const left =
      (width + edgeMargin * 2 > window.innerWidth) ? 0 + edgeMargin :
      (x - width / 2 < 0 + edgeMargin) ? 0 + edgeMargin :
      (x + width / 2 > window.innerWidth - edgeMargin) ? window.innerWidth - (width + edgeMargin) :
      x - width / 2;

    const customStyle = {
      content: {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    };

    return(
      <ReactModal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className='modal_content'
        overlayClassName='modal_overlay'
        style={customStyle}
      >
        { this.renderModalContent() }
      </ReactModal>
    );
  }
}
