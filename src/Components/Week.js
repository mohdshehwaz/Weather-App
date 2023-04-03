import React, { useState,useEffect } from 'react'
import './week.scss';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Week = (props) => {
    const [weekData,setWeekData] = useState([]);
    const [loc,setLoc] = useState({});
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongtitude] = useState('');

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
            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9bb14c0df323a08017f83e3b0bae610f`)
                .then(res =>res.json())
                .then((data) => {
                    setLoc({
                        city:data.city.name,
                        country:data.city.country
                    });
                    let arr = [];
        
                    let i =0;
                    while(i<data.list.length){
                        let obj = {
                            temp:data.list[i].main.temp - 273.15,
                            humidity:data.list[i].main.humidity,
                            feels_like:data.list[i].main.feels_like - 273.15,
                            wind:data.list[i].wind.speed,
                            weather:data.list[i].weather[0]
                        }
                        
                        arr.push(obj);
                        i=i+8;
        
                    }
                    setWeekData(arr);
                    
                         
                }); 
            });
        }
        
    }

    const searchByName = () => {
        console.log("In week search response")
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=9bb14c0df323a08017f83e3b0bae610f`)
         .then((res) => res.json() )
         .then((data) => {
            setLoc({
                city:data.city.name,
                country:data.city.country
            });
            let arr = [];

            let i =0;
            while(i<data.list.length){
                let obj = {
                    temp:data.list[i].main.temp - 273.15,
                    humidity:data.list[i].main.humidity,
                    feels_like:data.list[i].main.feels_like - 273.15,
                    wind:data.list[i].wind.speed,
                    weather:data.list[i].weather[0]
                }
                
                arr.push(obj);
                i=i+8;

            }
            setWeekData(arr);
            
          
         });
    }
    return (
        
        <div className='week-data'>
            <div className='location-img'> 
                <LocationOnOutlinedIcon />
            </div>
            <div className='city'>
                <span>{`${loc.city} , ${loc.country}`}</span>

            </div>
            <div className='week-full-data'>
                {weekData.map((item,index)  => (
                    <div className='week-day-data' key={index}>
                        <h1>Date</h1>
                        <div className='week-sub-item'>
                            <div className='sub-item'>
                                <p>Temperature</p>
                                <p>{item.temp.toFixed(2)} &deg; C</p>
                            </div>
                            <div className='sub-item'>
                                <p>Feels Like</p>
                                <p>{item.feels_like.toFixed(2)} &deg; C</p>
                            </div>
                            <div className='sub-item'>
                                <p>Humidity</p>
                                <p>{item.humidity}</p>
                            </div>
                            <div className='sub-item'>
                                <p>Wind</p>
                                <p>{item.wind}</p>
                            </div>
                            
                        </div>

                        
                    
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Week