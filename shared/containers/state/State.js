import { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import formatCurrency from 'utils/formatCurrency';
import { inject } from 'mobx-react';

class StateContainer extends Component {

  static propTypes = {
    stateMap: PropTypes.object,
    children: PropTypes.func,
    abbreviation: PropTypes.string,
    type: PropTypes.oneOf(['4g', '5g']),
  }

  static defaultProps = {
    type: '4g',
  };

  state = {}

  componentDidMount() {
    const { stateMap, abbreviation } = this.props;
    const currentState = stateMap.getState(abbreviation);

    this.setState({ state: currentState }); // eslint-disable-line
  }

  componentWillReceiveProps(newProps) {
    const { stateMap } = newProps;

    if (newProps.abbreviation !== this.props.abbreviation) {
      const currentState = stateMap.getState(newProps.abbreviation);

      this.setState({ state: currentState });
    }
  }

  get4gStateData = () => { // eslint-disable-line
    // Removed all data
    return [];
  }

  get5gStateData = (state) => {
    const { stateData: {
      totalWirelessRelatedJobs,
      GCP,
    } } = state;

    return [
      {
        number: formatCurrency(totalWirelessRelatedJobs, 1),
        copy: 'Wireless-Related Jobs',
      },
      {
        number: `$${formatCurrency(GCP, 1)}`,
        copy: 'Economic Impact (GDP)',
      },
      {
        number: `$${formatCurrency(GCP, 1)}`,
        copy: 'Economic Impact (GDP)',
      },
    ];
  }

  getStatisticsData = (state) => {
    const { stateData: {
      mobileWireless,
      adultsInWirelessOnly,
      totalWirelessRelatedJobs,
      GCP,
      totalWagesDependentOnWireless,
    } } = state;

    return [
      {
        number: `$${formatCurrency(GCP, 1)}`,
        copy: 'Economic Impact (GDP)',
        // footnote: '1',
        // pipe: true,
      },
      {
        number: formatCurrency(totalWirelessRelatedJobs, 1),
        copy: 'Wireless-Related Jobs',
        // footnote: '1',
        // pipe: true,
      },
      {
        number: formatCurrency(mobileWireless, 1),
        copy: 'Wireless Subscriber Connections',
        // footnote: '2',
      },
      {
        number: `${(adultsInWirelessOnly * 100).toFixed(1)}%`,
        copy: 'Adults are Wireless-Only',
        // footnote: '3',
      },
      {
        number: `$${formatCurrency(totalWagesDependentOnWireless, 1)}`,
        copy: 'Pay & Benefits from Wireless Industry',
        // footnote: '1',
      },
    ];
  }

  get4gText = () => `The wireless industry contributes $475B a year to the U.S. economy and
  supports 4.7M jobs. Its impact can be felt across every state.`;

  get5gText = () => `Building America's 5G network will have a meaningful impact on our cities
  and towns, large and small. Over the next five years, the U.S. will see benefits across
  the country, including 3 million new jobs, $275 billion in new investment,
  and $500 billion in economic growth.`;

  getSources = () => [
    {
      name: 'Accenture Wireless Industry Economic Contribution Model',
    },
    {
      link: 'https://www.fcc.gov/voice-telephone-services-report',
      name: 'FCC Voice Telephone Services Report',
    },
    {
      name: 'CDC/NCHS Wireless Substitution State-Level Report',
    },
    // {
    //   link: 'https://www.cdc.gov/nchs/data/nhis/earlyrelease/Wireless_state_201712.pdf',
    //   name: 'NCHS National Health Interview Survey Early Release Program',
    // },
  ];

  render() {
    const { type, children } = this.props;
    const { state } = this.state;

    if (isEmpty(state)) {
      return null;
    }

    const data = {
      name: state.name,
      abbreviation: state.abbreviation,
      stateData: this.get4gStateData(state),
      statistics: type === '4g' ? this.getStatisticsData(state) : state.citiesData,
      text: type === '4g' ? this.get4gText(state) : this.get5gText(state),
      sources: [],
    };

    return children(data);
  }
}

export default inject('stateMap')(StateContainer);
