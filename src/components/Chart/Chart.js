import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';

class Chart extends Component {
   
    render () {
      
        return (
            <div>
                <Bar
                    data={this.props.data}
                    options={{
		            maintainAspectRatio: false
	                }}
                />
            </div>
        )
    }
}

export default Chart;