import React, { useState,useEffect } from 'react'
import './week.scss';
import getDate from '../getDate';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Switch from '@mui/material/Switch';

const Week = (props) => {
    const [weekData,setWeekData] = useState([]);
    const [loc,setLoc] = useState({});
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongtitude] = useState('');
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
            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9bb14c0df323a08017f83e3b0bae610f`)
                .then(res =>res.json())
                .then((data) => {

                
                    var d = new Date(data.list[0].dt_txt.substring(0,10));
                    console.log(getDate.getDay(d));

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
                var d = new Date(data.list[i].dt_txt.substring(0,10));
                
                let obj = {
                    temp:data.list[i].main.temp - 273.15,
                    humidity:data.list[i].main.humidity,
                    feels_like:data.list[i].main.feels_like - 273.15,
                    wind:data.list[i].wind.speed,
                    weather:data.list[i].weather[0],
                    date:getDate(d)
                }
                
                arr.push(obj);
                i=i+8;

            }
            setWeekData(arr);
            
          
         });
    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        
        <div className='week-data'>
            <div className='location-img'> 
                <LocationOnOutlinedIcon />
            </div>
            <div className='city'>
                <span style={{fontWeight:800}}>{`${loc.city} , ${loc.country}`}</span>

            </div>
            <div className='alter-temp'>
                <span style={{fontWeight:800}}>F</span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <span style={{fontWeight:800}}>T</span>
            </div>
            <div className='week-full-data'>
                {weekData.map((item,index)  => (
                    <div className='week-day-data' key={index}>
                        <h4>{item.date}</h4>
                        <div className='week-sub-item'>
                            <div className='sub-item'>
                                <p>Temperature</p>
                                {checked ? 
                                    <p>{`${item.temp.toFixed(2)}`}&deg; C</p>
                                    :
                                    <p>{`${((item.temp*9/5)+32).toFixed(2)}`}&deg; F</p>
                                }
                            </div>
                            <div className='sub-item'>
                                <p>Feels Like</p>

                                {checked ? 
                                    <p>{`${item.feels_like.toFixed(2)}`}&deg; C</p>
                                    :
                                    <p>{`${((item.feels_like*9/5)+32).toFixed(2)}`}&deg; F</p>
                                }
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