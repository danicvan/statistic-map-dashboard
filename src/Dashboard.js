import React, { useState } from 'react';
import MapSection from './MapSection';

const Dashboard = () => {
    const [selectedData, setSelectedData] = useState(null);
    const latestCases = Object.values(selectedData?.[0]?.cases || {}).pop() || { total: 'N/A', new: 'N/A' };
    const latestDate = Object.keys(selectedData?.[0]?.cases || {}).pop() || 'N/A';

    const formatNumber = (number) => {
        if (typeof number === 'number') {
            return number.toLocaleString();
        }
        return number;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
            <header className="bg-indigo-700 text-white p-6 shadow-lg rounded-b-lg">
                <h1 className="text-3xl font-bold">Statistic Map Dashboard</h1>
            </header>
            <main className="p-8">
                <section className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-4">Interactive Map</h2>
                    <MapSection onSelectData={(data) => setSelectedData(data)} />
                </section>

                {selectedData && (
                    <section className="mt-8">
                        <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
                            <h2 className="text-xl font-semibold text-indigo-700">COVID-19 Data</h2>
                            <p className="text-gray-700">
                                <strong>Country:</strong> {selectedData[0].country || 'N/A'}
                            </p>
                            <p className="text-gray-700">
                                <strong>Date:</strong> {latestDate}
                            </p>
                            <p className="text-gray-700">
                                <strong>Total Cases:</strong> {formatNumber(latestCases?.total) || 'N/A'}
                            </p>
                            <p className="text-gray-700">
                                <strong>New Cases:</strong> {formatNumber(latestCases?.new) || 'N/A'}
                            </p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
