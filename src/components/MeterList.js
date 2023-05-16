import { TABLE_COLUMNS, METER_COLUMN_NAMES, API_KEY } from "../Constants";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const MeterList = () => {
    let navigate = useNavigate();
    const [meterData, setMeterData] = useState([]);

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
                setMeterData(resp);
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    const sortData = (col_name) => {
        console.log(col_name);
        let sortedData = [];
        Object.assign(sortedData, meterData);
        sortedData.sort((row1, row2) => (row1[col_name] > row2[col_name]) ? 1 : -1);
        setMeterData(sortedData);
    } 
    
    const handleRowClick = (event, meter) => {
        event.preventDefault();
        navigate(`meters/${meter.id}`, { replace: true });
    };

    const handleCreateMeter = (e) => {
        e.preventDefault();
        navigate("createMeter", { replace: true });
      };

    return (
        <div className="container">
        <table className="meterTable">
            <caption className="caption">Meter List</caption>
            <thead>
            <tr>
                {TABLE_COLUMNS.map((col,idx) => {
                    return (
                        <th key={idx} onClick={(e) => sortData(col)}>{METER_COLUMN_NAMES[col]}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody>
            {meterData.map(meter => {
                return (
                    <tr onClick={(event) => handleRowClick(event, meter)} key={meter.id}>
                        {TABLE_COLUMNS.map((col,idx) => {
                            return (
                                <td key={idx}>{meter[col].toString()}</td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
        <button className="button" onClick={(e) => handleCreateMeter(e)}>
          Create new Meter
        </button>
        </div>
    );
};

export default MeterList;