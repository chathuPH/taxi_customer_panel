/**
 * @author Mevan Nirosh
 * @version 1.0
 * @since 08-05-2022
 */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8080/api/v1/vehicle`,
});

const VehiclesDropdown = ({onChange,categoryValue}) => {
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [inputValue, setValue] = useState("");

  
  const handleInputChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const filter={
      "category":categoryValue,
      "status":"free"
    }
    api
      .post("/findAllByTypeAndStatus",filter)
      .then((res) => {
        const payload = res.data.map((vehicle) => {
          return { Vid: vehicle.id, label: vehicle.vehicleName };
        });
        setData(payload);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, [categoryValue]);

  return (
  <Select options={data} onChange={onChange}/>
  );
}
export default VehiclesDropdown;
