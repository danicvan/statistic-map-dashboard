import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { countryCoordinates } from './countryCoordinates'; // Import the coordinates data
import 'leaflet/dist/leaflet.css';

const MapSection = () => {
    const [loading, setLoading] = useState(false);

    // Function to handle fetching and displaying COVID data when a marker is clicked
    const handleMarkerClick = async (country) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api?country=${country}`);
            const data = await response.json();
            setLoading(false);

            // Display data in an alert or other UI
            if (data) {
                alert(
                    `Country: ${data.country}\n` +
                    `Region: ${data.region || 'N/A'}\n` +
                    `Cases (latest):\n` +
                    `  Total: ${Object.values(data.cases).pop()?.total || 'N/A'}\n` +
                    `  New: ${Object.values(data.cases).pop()?.new || 'N/A'}`
                );
            } else {
                alert(`No data found for ${country}`);
            }
        } catch (error) {
            setLoading(false);
            alert(`Error fetching data for ${country}: ${error.message}`);
        }
    };

    return (
        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Render CircleMarkers from the coordinates file */}
                {Object.entries(countryCoordinates).map(([country, coordinates], index) => (
                    <CircleMarker
                        key={index}
                        center={coordinates}
                        radius={8} // Size of the circle
                        color="red" // Border color
                        fillColor="red" // Fill color
                        fillOpacity={0.8} // Opacity of the fill
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
