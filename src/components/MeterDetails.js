import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEY, TABLE_COLUMNS, METER_COLUMN_NAMES } from "../Constants";

const MeterDetails = () => {
    let navigate = useNavigate();
    let params = useParams();
    const [meterData, setMeterData] = useState();
    
    useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch('https://take-home-exercise-api.herokuapp.com/meters', {
                  method: 'GET',
                  headers: {
                      'API-KEY': API_KEY,
                  }
              });
              const resp = await response.json();
              const meter = resp.find(meter => meter.id === params?.id);
              setMeterData(meter);
          } catch(err) {
              console.error(err);
          }
      }
      fetchData();
  }, [params]);
  
    const handleBackBtnClick = (e) => {
      e.preventDefault();
      navigate("../", { replace: true });
    };

    const handleEditBtnClick = (e) => {
        e.preventDefault();
        navigate(`../editMeter/${params.id}`, { replace: true });
      };
    
  
    return (
      <div className="listContainer">
        <div className="caption">Meter Details</div>
        {meterData ? (
            <ul className="list">
                {TABLE_COLUMNS.map(col => {
                    return (
                        <li className="listItem" key={col}>
                            <strong><label className="listHeading" htmlFor="about">{METER_COLUMN_NAMES[col]}: </label></strong>
                            <span className="listValue">{meterData[col].toString()}</span>
                        </li>
                    )
                })}
            </ul>
        ) : (
          <span>There is no data available for given meter Id.</span>
        )}
        <button className="button" onClick={(e) => handleBackBtnClick(e)}>
          Go Back to Meter List
        </button>
        {meterData ? (
          <button className="button" onClick={(e) => handleEditBtnClick(e)}>
          Edit Meter
        </button>
        ) : (
          null
        )}
        
      </div>
    );
  };
  
  export default MeterDetails;
