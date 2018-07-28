import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';

class Chart extends Component {
   
    render () {
      
        return (
            <div className='bar-chart'>
                <Bar
                    data={this.props.data}
                    options={{
                    maintainAspectRatio: true,
                    responsive: true
                    }}   
                />
            </div>
        )
    }
}

export default Chart;