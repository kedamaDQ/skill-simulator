import React from 'react';
import PropTypes from 'prop-types';
import SpTableHeaderPanelContainer from '../containers/sp_table_header_panel';
import SpTableDataRowContainer from '../containers/sp_table_data_row';
import SkillSummarySpPanelContainer from '../containers/sp_panel_skill_summary';

const SpTable = (props) => {

  const renderHeaderRow = () => {
    const headers = [];
    headers.push(
      <th
        key='header-top-right'
        className='skill-point-table__col-header'>
      </th>
    );

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
      },
      {
        id: 'remained-nsp-header',
        display: <span>残り<br />SP</span>,
        styleClasses: 'remained-header'
      },
      {
        id: 'remained-msp-header',
        display: <span>残り<br />MSP</span>,
        styleClasses: 'remained-header'
      },
      {
        id: 'job-skill-header',
        display: <span>職スキル</span>,
        styleClasses: 'assigned-header'
      }
    ];

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

    /*
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
    */
    props.indices.weapons.forEach((weaponId) => {
      headers.push(
        <th
          key={`header-${weaponId}`}
          className='skill-point-table__col-header'
        >
          <SpTableHeaderPanelContainer
            id={weaponId}
            display={props.weapons[weaponId].display}
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
  };

  const renderDataRows = () => {
    const rows = [];

    props.indices.jobs.forEach((jobId) => {
      rows.push(
        <SpTableDataRowContainer
          key={jobId}
          jobId={jobId}
        />);
    });
    return rows;
  };

  const renderTotalRow = () => {
    const cells = [];

    cells.push(<th key={`summary-header`} colSpan='7'></th>);
    props.indices.weapons.forEach((weaponId) => {
      cells.push(
        <td
          key={`summary-${weaponId}`}
          className='skill-point-table__skill-total-data'
        >
          <SkillSummarySpPanelContainer skillLineId={weaponId} />
        </td>);
    });
    return <tr>{cells}</tr>;
  };

  if (props.isFetching) {
    return (<div>loading...</div>);
  } else {
    return(
      <div className='skill-point-table-outer'>
        <table className='skill-point-table'>
          <thead>
            { renderHeaderRow() }
          </thead>
          <tbody>
            { renderDataRows() }
          </tbody>
          <tfoot>
            { renderTotalRow() }
          </tfoot>
        </table>
      </div>
    );
  }
}

SpTable.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  jobs: PropTypes.shape(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    display_short: PropTypes.string.isRequired
  }).isRequired).isRequired,
  weapons: PropTypes.shape(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  }).isRequired).isRequired,
};

export default SpTable;
