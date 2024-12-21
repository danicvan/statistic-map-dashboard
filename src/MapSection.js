import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { countryCoordinates } from './countryCoordinates';
import 'leaflet/dist/leaflet.css';

const MapSection = ({ onSelectData }) => {
    const [loading, setLoading] = useState(false);

    const handleMarkerClick = async (country) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api?country=${country}`);
            const data = await response.json();
            setLoading(false);

            if (data) {
                onSelectData(data); // Pass the data to the parent Dashboard component
            } else {
                alert(`No data found for ${country}`);
            }
        } catch (error) {
            setLoading(false);
            alert(`Error fetching data for ${country}: ${error.message}`);
        }
    };

    return (
        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative">
            <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
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
                            Click for COVID-19 data.
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
