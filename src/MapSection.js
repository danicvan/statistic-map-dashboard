import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapSection = () => {
    return (
        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
                {/* Add a tile layer (map tiles) */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Example marker with popup */}
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A marker in London.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapSection;
