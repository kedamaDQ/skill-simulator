import React from 'react';
import PropTypes from 'prop-types';
import SpTableHeaderPanelContainer from '../containers/sp_table_header_panel';
import SpTableDataRowContainer from '../containers/sp_table_data_row';
import SkillSummarySpPanelContainer from '../containers/sp_panel_skill_summary';

export default class SpTable extends React.PureComponent {

  static propTypes = {
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

  constructor(props) {
    super();
    this.table = null;

    this.handleWeaponHeaderClick = this.handleWeaponHeaderClick.bind(this);
    this.handleJobHeaderClick = this.handleJobHeaderClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.setTableRef = this.setTableRef.bind(this);
  }

  handleWeaponHeaderClick = (weaponId) => {
    this.props.onHeaderClick(this.props.currentFilterId, weaponId, [ weaponId ]);
  }

  handleJobHeaderClick = (jobId) => {
    // Weapon skills other than grappling and shield.
    const exclusions = ['grappling', 'shield'];
    this.props.onHeaderClick(
      this.props.currentFilterId,
      jobId,
      this.props.jobs[jobId].weapon_skill_lines.filter((weaponId) => {
        return !exclusions.includes(weaponId);
      })
    );
  }

  handleScroll = () => {
    if (this.props.directControllerIsActive) {
      this.props.onTableScroll();
    }
  }

  renderHeaderRow = () => {
    const headers = [];
    headers.push(
      <th
        key='header-top-right'
        className='skill-point-table__col-header top-left'>&nbsp;
      </th>
    );

    const ownedHeaderDatas = [
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

    ownedHeaderDatas.forEach((headerData) => {
      headers.push(
        <th
          key={headerData.id}
          className='skill-point-table__col-header owned'
        >
          <SpTableHeaderPanelContainer
            id={headerData.id}
            display={headerData.display}
            styleClasses={headerData.styleClasses}
          />
        </th>
      );
    });

    headers.push(
      <th
        key='remained-nsp-header'
        className='skill-point-table__col-header assigned nsp'
      >
        <SpTableHeaderPanelContainer
          id='remained-nsp-header'
          display={<span>残り<br />SP</span>}
          styleClasses='remained-header'
        />
      </th>
    );

    headers.push(
      <th
        key='remained-msp-header'
        className='skill-point-table__col-header assigned msp'
      >
        <SpTableHeaderPanelContainer
          id='remained-msp-header'
          display={<span>残り<br />MSP</span>}
          styleClasses='remained-header'
        />
      </th>
    );
 
    headers.push(
      <th
        key='job-skill-header'
        className='skill-point-table__col-header job-skill'
      >
        <SpTableHeaderPanelContainer
          id='job-skill-header'
          display='職スキル'
          styleClasses='assigned-header'
        />
      </th>
    );

    this.props.indices.weapons.forEach((weaponId) => {
      headers.push(
        <th
          key={`header-${weaponId}`}
          className='skill-point-table__col-header weapon-skill'
        >
          <SpTableHeaderPanelContainer
            id={weaponId}
            display={this.props.weapons[weaponId].display}
            styleClasses='assigned-header weapons'
            onClick={() => this.handleWeaponHeaderClick(weaponId)}
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

  renderDataRows = () => {
    return (
      (
        (this.props.weaponFilter.length) ?
          this.props.indices.jobs.filter((jobId) => {
            return this.props.weaponFilter.some((weaponId) => {
              return this.props.jobs[jobId].weapon_skill_lines.includes(weaponId);
            });
        }) :
        this.props.indices.jobs
      ).map((jobId) => {
        return (
          <SpTableDataRowContainer
            key={jobId}
            jobId={jobId}
            onHeaderClick={this.handleJobHeaderClick}
          />
        );
      })
    );
  }

  renderTotalRow = () => {
    const cells = [];

    cells.push(
      <th
        key='summary-header'
        className='summary header'
      >
      </th>
    );
    cells.push(
      <th
        key='summary-owned'
        className='summary'
        colSpan='3'
      >
      </th>
    );
    cells.push(
      <th
        key='summary-assiened-nsp'
        className='summary nsp'
      >
      </th>
    );
    cells.push(
      <th
        key='summary-assiened-msp'
        className='summary msp'
      >
      </th>
    );
    cells.push(
      <th
        key='summary-assigned-job'
        className='summary'
      >
      </th>
    );

    this.props.indices.weapons.forEach((weaponId) => {
      cells.push(
        <td
          key={`summary-${weaponId}`}
          className='skill-point-table__skill-total-data'
        >
          <SkillSummarySpPanelContainer skillLineId={weaponId} />
        </td>);
    });
    return <tr>{cells}</tr>;
  }

  componentDidMount() {
    let passiveSupported = false;
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return true;
        }
      };
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (error) {
      console.log(`passiveSuppoted: ${passiveSupported}`)
      passiveSupported = false;
    }
    this.table.addEventListener('scroll', this.handleScroll, (passiveSupported) ? { passive: true} : false);
  }

  componentWillUnmount() {
    this.table.removeEventListener('scroll', this.handleScroll);
  }

  setTableRef(elem) {
    this.table = elem;
  }

  render() {
    if (this.props.isFetching) {
      return (<div>loading...</div>);
    } else {
      return(
        <div className='skill-point-table-outer'>
          <table className='skill-point-table' ref={this.setTableRef}>
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
