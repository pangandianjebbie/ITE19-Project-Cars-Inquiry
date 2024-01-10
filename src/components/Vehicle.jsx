import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { supabase } from './Supabase'; // Adjust the path accordingly

const VehicleComponent = ({ vin, modelName, color, engineType, transmissionType, bodyStyle, Image_URL }) => (
  <div>
    <h2>VIN: {vin}</h2>
    <p>Model: {modelName}</p>
    <p>Color: {color}</p>
    <p>Engine Type: {engineType}</p>
    <p>Transmission Type: {transmissionType}</p>
    <p>Body Style: {bodyStyle}</p>
    <img src={Image_URL} alt={`Car ${vin}`} style={{ maxWidth: '50%', height: 'auto' }} />
  </div>
);

const DisplayVehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data: vehicleData, error: vehicleError } = await supabase.from('vehicle').select('*');
        const { data: modelData, error: modelError } = await supabase.from('model').select('*');
        const { data: optionData, error: optionError } = await supabase.from('option').select('*');
        const { data: bodystyleData, error: bodystyleError } = await supabase.from('bodystyle').select('*');

        if (vehicleError || modelError || optionError || bodystyleError) {
          throw vehicleError || modelError || optionError || bodystyleError;
        }

        // Now manually combine data from different tables based on relationships
        const combinedData = vehicleData.map(vehicle => {
          const model = modelData.find(m => m.model_id === vehicle.model_id);
          const option = optionData.find(o => o.option_id === vehicle.option_id);
          const bodystyle = bodystyleData.find(b => b.bodystyle_id === vehicle.bodystyle_id);

          return {
            ...vehicle,
            model_name: model ? model.model_name : '',
            color: option ? option.color : '',
            engine_type: option ? option.engine_type : '',
            transmission_type: option ? option.transmission_type : '',
            body_style: bodystyle ? bodystyle.body_style : '',
          };
        });

        setVehicles(combinedData);
      } catch (error) {
        console.error('Error fetching vehicles:', error.message);
        setError(error.message);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <Container>
      <h2>Vehicle Table</h2>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        vehicles.map((vehicle) => (
          <Row key={vehicle.vin}>
            <Col>
              <VehicleComponent
                vin={vehicle.vin}
                modelName={vehicle.model_name}
                color={vehicle.color}
                engineType={vehicle.engine_type}
                transmissionType={vehicle.transmission_type}
                bodyStyle={vehicle.body_style}
                Image_URL={vehicle.Image_URL}
              />
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
};

export default DisplayVehicleTable;
