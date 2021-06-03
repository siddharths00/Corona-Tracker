import React, {Component} from 'react';
import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api/';
import covidImage from './images/covid.png';

class App extends Component{

    // instead of creating the constructor again and again, what we can do is just declare
    // the state without any constructor and the constructor will be built in the backend.
    state = {
        data: {},
        country: '',
    }

    // The async fetchData will only work inside of an async function
    // So in order for any function to make async all we need to do is function async()
    // BUT
    // with componentDidMount it's special, you write the async keyword before the componentDidMount.
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({
            data: fetchedData,
        });
    }

    handleCountryChange = async(country) =>{
        
        const fetchedData = await fetchData(country);
        this.setState({
            data: fetchedData,
            country: country
        });
        console.log(fetchedData);
    }
 
    render(){

        const { data, country } = this.state; 
        return(
            <div className={styles.container}> 
              {/*We do the above so that there will be no interference of this className with  */}
              {/* Any other classNames that will be defined somewhere else in another .module.css */}
              {/* This can only be done when and if you've used the module.css and imported that */}
                <img src={covidImage} className={styles.image} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data = {data} country={country}/>                
            </div>
        );
    }   
}
export default App;