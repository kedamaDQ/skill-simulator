import React from 'react';
import PropTypes from 'prop-types';
import SpTableHeaderPanelContainer from '../containers/sp_table_header_panel';
import SpTableDataRowContainer from '../containers/sp_table_data_row';
import SummarizedSpPanelContainer from '../containers/sp_panel_summarized';

export default class SpTable extends React.PureComponent {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    jobs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired).isRequired,
    weapons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired
    }).isRequired).isRequired,
    assigned: PropTypes.object.isRequired
  };

  renderHeaderRow() {
    const headerDatas = [
      {
        id: 'owned-by-level-header',
        display: 'レベル',
        styleClasses: 'owned-header'
      },
      {
        id: 'owned-by-training-header',
        display: '特訓',
        styleClasses: 'owned-header'
      },
      {
        id: 'owned-by-skillbooks-header',
        display: 'マスター',
        styleClasses: 'owned-header'
      },
      {
        id: 'remain-sp-header',
        display: '残り',
        styleClasses: 'owned-header'
      },
      {
        id: 'jobskill-header',
        display: '職スキル',
        styleClasses: 'owned-header'
      }
    ];
    const headers = [];
    headers.push(
      <th
        key='header-top-right'
        className='skill-point-table__col-header'>
      </th>
    );
    headerDatas.forEach((headerData => {
      headers.push(
        <th
          key={headerData.id}
          className='skill-point-table__col-header'
        >
          <SpTableHeaderPanelContainer
            id={headerData.id}
            display={headerData.display}
            styleClasses={headerData.styleClasses}
          />
        </th>
      );
    }));

    this.props.weapons.forEach((weapon) => {
      headers.push(
        <th
          key={`header-${weapon.id}`}
          className='skill-point-table__col-header'
        >
          <SpTableHeaderPanelContainer
            id={weapon.id}
            display={weapon.display}
            styleClasses='assigned-header'
          />
        </th>
      );
    });

    headers.push(
      <th
        key='header-jobSkill-total'
        className='skill-point-table__col-header'
      >
        <SpTableHeaderPanelContainer
          id='jobskill-total'
          display='合計'
          styleClasses='assigned-header'
      />
      </th>
    );

    return <tr>{headers}</tr>;
  }

  renderDataRows() {
    const rows = [];
    this.props.jobs.forEach((job) => {
      const assigned = this.props.assigned.details[job.id];
      rows.push(
        <SpTableDataRowContainer
          key={job.id}
          job={job}
          assigned={assigned}
        />);
    });
    return rows;
  }

  renderTotalRow() {
    const cells = [];
    cells.push(<th key={`summary-header`} colSpan='6'></th>);
    this.props.weapons.forEach((weapon) => {
      const assigned = this.props.assigned.summaries[weapon.id];
      cells.push(
        <td
          key={`summary-${weapon.id}`}
          className='skill-point-table__skill-total-data'
        >
          <SummarizedSpPanelContainer
            max={weapon.max_points}
            assigned={assigned}
          />
        </td>);
    });
    return <tr>{cells}</tr>;
  }

  render() {
    if (this.props.isFetching) {
      return (<div>loading...</div>);
    } else {
      return(
        <div className='skill-point-table-outer'>
          <table className='skill-point-table'>
            <thead>
              {this.renderHeaderRow()}
            </thead>
            <tbody>
              {this.renderDataRows()}
            </tbody>
            <tfoot>
              {this.renderTotalRow()}
            </tfoot>
          </table>
        </div>
      );
    }
  }
}
