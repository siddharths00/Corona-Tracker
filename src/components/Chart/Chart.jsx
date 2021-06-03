import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import  { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
// useState and useEffect are both hooks which let us use the functionality of class
// components without actually changing the functional component into a class component.
const Chart = ({data:{confirmed, deaths, recovered}, country}) => {

    const [ dailyData, setDailyData] = useState([]);
    // dailyData is basically a field within the state.
    // setDailyData us the setter method for this data.

    // useEffect is the closest things we have to a componentDidaMount in functional components in react.
    // Below is the only way to make async functions out of useEffect
    useEffect(()=>{
        const fetchApi = async() => {
            setDailyData(await fetchDailyData());
        }
        // console.log(dailyData);
        fetchApi();
    }, []);

    console.log(confirmed, deaths, recovered);

    const lineChart =(
        dailyData.length ? 
        (<Line
            // The outer set of curly braces tell us that the data will be dynamic.
            // The second set of curly braces tell us that the data will be in the form of objects.
          data = {{
            labels: dailyData.map(({date})=>date),
            // The above is a map returning an array of values
            datasets: [{
                data: dailyData.map(({confirmed})=>confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
            },{
                data: dailyData.map(({deaths})=>deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true,
            }],
            // We could have 3 datasets one for each. But unfortunately, the api only provide
            // daily data for deaths and recovery.
          }}  
        />) : null
    );

        const barChart = (
            confirmed ? 
            (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(255, 255, 0, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                ],
                            data: [confirmed.value, recovered.value, deaths.value],
                        }]
                    }}
                    options={{
                        legend: {display:false},
                        title: {display: true, text:`Current state in ${country}`},
                    }}
                />
            ): null
        );

    return (    
        <div className={styles.container}>
            {country ? barChart:lineChart}
        </div>
    )
}
export default Chart
