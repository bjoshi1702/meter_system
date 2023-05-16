import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { API_KEY } from '../Constants';

const MeterForm = () => {
    let params = useParams();
    let navigate = useNavigate();
    const [createMeterFormData, setCreateMeterFormData] = useState({
        display_name: "",
        api_name: "",
        active: "",
        used_for_billing: "",
        type: "",
    });

    const handleMeterFormChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        if (params?.id) {
            const newFormData = { ...editMeterFormData };
            newFormData[fieldName] = fieldValue;
            setEditMeterFormData(newFormData);
        } else {
            const newFormData = { ...createMeterFormData };
            newFormData[fieldName] = fieldValue;
            setCreateMeterFormData(newFormData);
        }
        
    };
        
    const handleMeterFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (params?.id) {
                const res = await fetch(`https://take-home-exercise-api.herokuapp.com/meters/${params.id}`, {
                    method: 'PUT',
                    headers: {
                        'API-KEY': API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        display_name: editMeterFormData.display_name,
                        api_name: editMeterFormData.api_name,
                        active: editMeterFormData.active === 'true' ? true : false,
                        used_for_billing: editMeterFormData.used_for_billing === 'true' ? true : false,
                        type: editMeterFormData.type,
                    }),
                });
            } else {
                const res = await fetch('https://take-home-exercise-api.herokuapp.com/meters', {
                    method: 'POST',
                    headers: {
                        'API-KEY': API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        display_name: createMeterFormData.display_name,
                        api_name: createMeterFormData.api_name,
                        active: createMeterFormData.active === 'true' ? true : false,
                        used_for_billing: createMeterFormData.used_for_billing === 'true' ? true : false,
                        type: createMeterFormData.type,
                    }),
                });
            }
        } catch (err) {
            console.error(err);
        }
        navigate("../", { replace: true }); 
    }

    const [editMeterFormData, setEditMeterFormData] = useState({
        display_name: "",
        api_name: "",
        active: "",
        used_for_billing: "",
        type: "",
    });

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
                const formValues = {
                    display_name: meter?.display_name,
                    api_name: meter?.api_name,
                    active: meter?.active,
                    used_for_billing: meter?.used_for_billing,
                    type: meter?.type
                };
                setEditMeterFormData(formValues);
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    }, [params]);

    const handleCancelBtnClick = (e) => {
        e.preventDefault();
        navigate("../", { replace: true });
    }

    return (
        <div className='container'>
            <div className='caption'>Meter Form</div>
            <form onSubmit={handleMeterFormSubmit} className='formContainer'>
                <label htmlFor='display_name'>Display Name</label>
                <input 
                    type='text' 
                    id='display_name' 
                    name='display_name'
                    required
                    onChange={handleMeterFormChange}
                    value={params?.id && editMeterFormData.display_name}
                />

                <label htmlFor='api_name'>API Name</label>
                <input 
                    type='text' 
                    id='api_name' 
                    name='api_name'
                    required
                    onChange={handleMeterFormChange}
                    value={params?.id && editMeterFormData.api_name} 
                />

                <label htmlFor="active">Active</label>
                <select 
                    id="active" 
                    name="active" 
                    onChange={handleMeterFormChange}
                    required
                    value={(params?.id && (editMeterFormData.active ? 'true' : 'false'))} 
                >   
                    <option value="choose">-- Select Value --</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                <label htmlFor="usused_for_billing">Used For Billing</label>
                <select 
                    id="usused_for_billing" 
                    name="used_for_billing" 
                    onChange={handleMeterFormChange} 
                    required
                    value={(params?.id && (editMeterFormData.used_for_billing ? 'true' : 'false'))}
                >
                    <option value="choose">-- Select Value --</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                <label htmlFor="type">Type</label>
                <select 
                    id="type" 
                    name="type" 
                    onChange={handleMeterFormChange}
                    required
                    value={params?.id && editMeterFormData.type} 
                >
                    <option value="choose">-- Select Value --</option>
                    <option value="sum">Sum</option>
                    <option value="max">Max</option>
                    <option value="unique_count">Unique Count</option>
                </select>

                <input className="button" type="submit" value="Submit"></input>
                <input className="button" onClick={handleCancelBtnClick} type="button" value="Cancel"></input>
            </form>
        </div>
    );
}

export default MeterForm;