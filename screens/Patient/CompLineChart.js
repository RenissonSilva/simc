import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// import { Container } from './styles';

export default class CompLineChart extends Component {

    componentDidMount(){
    }

    render() {
        return (
            <View>
            { this.props.data &&
                <LineChart
                    data={
                        {
                            datasets: [{
                                data: this.props.data
                            }],

                        }
                    }
                    width={300}
                    height={200}
                    chartConfig={
                        {
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#08130D",
                            backgroundGradientToOpacity: 0.1,
                            color: (opacity = 1) => `rgba(255, 95, 84, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 0.5
                        }
                    }
                />
            }
               
            </View>
        );
    }
}
