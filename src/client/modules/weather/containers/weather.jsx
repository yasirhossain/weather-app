import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import { Button } from 'reactstrap';

import axios from 'axios';

import AMOUNT_QUERY from '../graphql/count_get.graphql';
import ADD_COUNT_MUTATION from '../graphql/count_add_mutation.graphql';
import COUNT_SUBSCRIPTION from '../graphql/count_subscribe.graphql';

//import WEATHER_QUERY from '../graphql/weather_get.graphql';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      if (this.subscription) {
        this.subscription();
        this.subscription = null;
      }

      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCount();
      }

      this.getLocation();
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription();
    }
  }

  handleReduxIncrement(e) {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }

    this.props.onReduxIncrement(value);
  }

  getLocation() {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }

      geolocation.getCurrentPosition((position) => {
        this.getWeatherForecast(position.coords.latitude, position.coords.longitude);
      }, () => {
        reject (new Error('Permission denied'));
      });
    });
  }

  getWeatherForecast(lat, long) {
    const API_KEY = `46ddd9c3c6a545d0d62e60754768e38d`;
    const WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`;

    return axios.get(WEATHER_URL).then(
      function(res) {
        if (res.data.cod !== '200' && res.data.message){
          throw new Error(res.data.message);
        } else {
          console.log(res);
          return res;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    );
  }

  subscribeToCount() {
    const { subscribeToMore } = this.props;
    this.subscription = subscribeToMore({
      document: COUNT_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, {subscriptionData: {data: {countUpdated: { amount }}}}) => {
        return update(prev, {
          count: {
            amount: {
              $set: amount,
            },
          }
        });
      }
    });
  }

  render() {
    const { loading, count, addCount, reduxCount } = this.props;
    if (loading) {
      return (
        <div className="text-center">
          Loading...
        </div>
      );
    } else {
      return (
        <div className="text-center mt-4 mb-4">
          ITS DAT BOI WUDDUP
        </div>
      );
    }
  }
}

Weather.propTypes = {
  loading: PropTypes.bool.isRequired,
  count: PropTypes.object,
  updateCountQuery: PropTypes.func,
  onReduxIncrement: PropTypes.func,
  addCount: PropTypes.func.isRequired,
  subscribeToMore: PropTypes.func.isRequired,
  reduxCount: PropTypes.number.isRequired,
};

const WeatherWithApollo = compose(
  graphql(AMOUNT_QUERY, {
    props({ data: { loading, count, subscribeToMore } }) {
      return { loading, count, subscribeToMore };
    }
  }),
  graphql(ADD_COUNT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
      addCount(amount) {
        return () => mutate({
          variables: { amount },
          updateQueries: {
            getCount: (prev, { mutationResult }) => {
              const newAmount = mutationResult.data.addCount.amount;
              return update(prev, {
                count: {
                  amount: {
                    $set: newAmount,
                  },
                },
              });
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            addCount: {
              __typename: 'Count',
              amount: ownProps.count.amount + 1,
            },
          },
        });
      },
    }),
  })
)(Weather);

export default connect(
  (state) => ({ reduxCount: state.counter.reduxCount }),
  (dispatch) => ({
    onReduxIncrement(value)
    {
      dispatch({
        type: 'COUNTER_INCREMENT',
        value: Number(value)
      });
    }
  }),
)(WeatherWithApollo);
