import React from 'react';
import PropTypes from 'prop-types';
import SpTableHeaderPanelContainer from '../containers/sp_table_header_panel';
import SpTableDataRowContainer from '../containers/sp_table_data_row';
import SkillSummarySpPanelContainer from '../containers/sp_panel_skill_summary';

export default class SpTable extends React.PureComponent {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    jobs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
      display_short: PropTypes.string.isRequired
    }).isRequired).isRequired,
    weapons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired
    }).isRequired).isRequired,
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
        display: '特訓スタンプ',
        styleClasses: 'owned-header'
      },
      {
        id: 'owned-by-skillbooks-header',
        display: 'スキルブック',
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

    headers.push(
      <th
        key='remained-nsp-header'
        className='skill-point-table__col-header'
      >
        <SpTableHeaderPanelContainer
          id='remained-nsp-header'
          display={ <span>残り<br />SP</span> }
          styleClasses='remained-header'
        />
      </th>
    );

    headers.push(
      <th
        key='remained-msp-header'
        className='skill-point-table__col-header'
      >
        <SpTableHeaderPanelContainer
          id='remained-msp-header'
          display={ <span>残り<br />MSP</span> }
          styleClasses='remained-header'
        />
      </th>
    );

    headers.push(
      <th
        key='jobskill-header'
        className='skill-point-table__col-header'
      >
        <SpTableHeaderPanelContainer
          id='jobskill-header'
          display='職スキル'
          styleClasses='assigned-header'
        />
      </th>
    );

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
      rows.push(
        <SpTableDataRowContainer
          key={job.id}
          job={job}
        />);
    });
    return rows;
  }

  renderTotalRow() {
    const cells = [];
    cells.push(<th key={`summary-header`} colSpan='7'></th>);
    this.props.weapons.forEach((weapon) => {
      cells.push(
        <td
          key={`summary-${weapon.id}`}
          className='skill-point-table__skill-total-data'
        >
          <SkillSummarySpPanelContainer weapon={weapon} />
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
              { this.renderHeaderRow() }
            </thead>
            <tbody>
              { this.renderDataRows() }
            </tbody>
            <tfoot>
              { this.renderTotalRow() }
            </tfoot>
          </table>
        </div>
      );
    }
  }
}
