import React from 'react';
import { useEffect, useState } from 'react';
import icon from '../icon';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
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
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9bb14c0df323a08017f83e3b0bae610f`)
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
            });
        }
      
        
    }
    const searchByName = () => {
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=9bb14c0df323a08017f83e3b0bae610f`)
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
                <h1>{`${temp.toFixed(2)}`}&deg;C</h1>
                
            </div>  
            <div className='temp'>
                
                <p>{`Feels Like ${feel.toFixed(2)}`}&deg;C</p>
            </div>  
            <div className='wind'>
                <p>{`Wind Speed: ${wind} km/s`} </p>
                <p>{`Humidity: ${humidity} %`}</p>
            </div>  
              


            
        </div>
    )
}

export default Home