import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapSection = ({ onSelectData }) => {
    const [loading, setLoading] = useState(false);
    const [countryCoordinates, setCountryCoordinates] = useState({});
    const [countryDetails, setCountryDetails] = useState({});

    const formatNumber = (number) => {
        if (typeof number === 'number') {
            return number.toLocaleString();
        }
        return number;
    };

    const handleMarkerClick = async (country) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api?country=${country}`);
            const data = await response.json();
            setLoading(false);

            if (data) {
                onSelectData(data);
            } else {
                alert(`No data found for ${country}`);
            }
        } catch (error) {
            setLoading(false);
            alert(`Error fetching data for ${country}: ${error.message}`);
        }
    };

    const fetchAllCountryCoordinates = async () => {
        const url = 'https://restcountries.com/v3.1/all?fields=name,latlng,capital,population,region';
        try {
            const response = await fetch(url);
            const data = await response.json();
            const coordinates = {};
            const details = {};

            data.forEach((country) => {
                if (country.name?.common && country.latlng) {
                    coordinates[country.name.common] = country.latlng;
                    details[country.name.common] = {
                        capital: country.capital ? country.capital[0] : 'N/A',
                        population: country.population || 'N/A',
                        region: country.region || 'N/A',
                    };
                }
            });

            setCountryCoordinates(coordinates);
            setCountryDetails(details);
        } catch (error) {
            console.error('Error fetching country coordinates:', error);
        }
    };

    useEffect(() => {
        fetchAllCountryCoordinates();
    }, []);

    return (
        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative">
            <MapContainer center={[20, 30]} zoom={2} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.entries(countryCoordinates).map(([country, coordinates], index) => (
                    <CircleMarker
                        key={index}
                        center={coordinates}
                        radius={8}
                        color="red"
                        fillColor="red"
                        fillOpacity={0.8}
                        eventHandlers={{
                            click: () => handleMarkerClick(country),
                        }}
                    >
                        <Popup>
                            <strong>{country}</strong>
                            <br />
                            <strong>Capital:</strong> {countryDetails[country]?.capital || 'N/A'}
                            <br />
                            <strong>Population:</strong> {formatNumber(countryDetails[country]?.population) || 'N/A'}
                            <br />
                            <strong>Region:</strong> {countryDetails[country]?.region || 'N/A'}
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-100 flex items-center justify-center">
                    Loading...
                </div>
            )}
        </div>
    );
};

export default MapSection;
