import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Radio,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid
} from '@mui/material';
import axios from 'axios';

export default function CreationPanel() {
  const [isClient, setIsClient] = useState(true);
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/clients/getAll'
        );
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchClients();
  }, []);

  const handleChange = () => {
    setIsClient(!isClient);
    setSelectedClientId('');
  };

  const handleChangeClientOption = (e) => {
    console.log(e.target.value);
  };

  const handleCreate = async () => {
    if (isClient) {
      const request = {
        name: name
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/clients/create',
          request
        );
        if (response.status === 201) {
          alert('Client created successfully!');
        } else {
          console.log('Internal server error');
          alert('Error occured in creating Client');
        }
      } catch (error) {
        console.error('Error occured in creating Client');
      }
    } else {
      const request = {
        client_id: selectedClientId,
        name: name
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/orders/create',
          request
        );
        if (response.status === 200) {
          alert('Order created successfully!');
        } else {
          alert('Error occured in creating Order');
        }
      } catch (error) {
        console.error('Internal server error: ', error.message);
      }
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            defaultValue="client"
            onChange={handleChange}
          >
            <FormControlLabel
              value="client"
              control={<Radio />}
              label="Client"
              labelPlacement="top"
            />
            <FormControlLabel
              value="order"
              control={<Radio />}
              label="Order"
              labelPlacement="top"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={4} md={4}>
          <Box sx={{ minWidth: 120, maxWidth: 240 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Clients</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={
                  selectedClientId !== ''
                    ? clients.find((client) => client.id === selectedClientId)
                        .name
                    : selectedClientId
                }
                label="Clients"
                onChange={handleChangeClientOption}
              >
                {clients.map((client, index) => (
                  <MenuItem value={client.id} key={index + 1}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <TextField
            variant="filled"
            label={isClient === true ? 'Client Name' : 'Order Name'}
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
