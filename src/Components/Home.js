import React from 'react';
import { useEffect, useState } from 'react';
import icon from '../icon';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Switch from '@mui/material/Switch';

import './Home.scss';

const Home = (props) => {
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongtitude] = useState('');
    const [temp,setTemp] = useState(0.0);
    const [loc,setLoc] = useState({});
    const [weather,setWeather] = useState({});
    const [feel,setFeel] = useState(0.0);
    const [humidity,setHumidity] = useState(0.0);
    const [wind,setWind] = useState(0.0);
    const [checked, setChecked] = useState(true);
    
    useEffect(() =>{
        if(props.city==""){
            searchByCord();
        } 
        else{
            searchByName();
        }
    },[props.city]);

    const searchByCord = () => {
        if(navigator.geolocation){
             
            navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongtitude(position.coords.longitude);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=`)
                .then(res =>res.json())
                .then((data) => {
                    
                    setLoc({
                        city:data.city.name,
                        country:data.city.country
                    });  
                    setTemp(data.list[0].main.temp - 273.15);
                    setHumidity(data.list[0].main.humidity);
                    setFeel(data.list[0].main.feels_like - 273.15);
                    setWind(data.list[0].wind.speed);
                    setWeather(data.list[0].weather[0]);
                   
                }); 
                console.log("data");
            });
        }
      
        
    }
    const searchByName = () => {
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=`)
         .then((res) => res.json() )
         .then((data) => {
            console.log(data);
            setLoc({
                city:data.city.name,
                country:data.city.country
            });  
            setTemp(data.list[0].main.temp - 273.15);
            setHumidity(data.list[0].main.humidity);
            setFeel(data.list[0].main.feels_like - 273.15);
            setWind(data.list[0].wind.speed);
            setWeather(data.list[0].weather[0]);
         })
    }
    

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className='homeContainer'>
            <div className='location-img'> 
                <LocationOnOutlinedIcon />
            </div>
            <div className='city'>
                <span>{`${loc.city} , ${loc.country}`}</span>

            </div>
            <div className='weather-icon'>
                <img src={icon[weather.icon]} />
                  
            </div>
            <div className='weather-name'>
                <p>{weather.main}</p>   
            </div>  
            <div className='temp'>
                {checked ? 
                    <h1>{`${temp.toFixed(2)}`}&deg; C</h1>
                    :
                    <h1>{`${((temp*9/5)+32).toFixed(2)}`}&deg; F</h1>
                }

                
            </div>  
            <div className='temp'>
                {checked ? 
                    <p>{`Feels Like ${feel.toFixed(2)}`}&deg; C</p>
                    :
                    <p>{`Feels Like ${((feel*9/5)+32).toFixed(2)}`}&deg; F</p>
                }
                
            </div>
            <div className='alter-temp'>
                <span>F</span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <span>T</span>
            </div>
            <div className='wind'>
                <p>{`Wind Speed: ${wind} km/s`} </p>
                <p>{`Humidity: ${humidity} %`}</p>
            </div>  
              


            
        </div>
    )
}

export default Home