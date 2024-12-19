import React from 'react';
import MapSection from './MapSection'; // Import the Map component

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
            <header className="bg-indigo-700 text-white p-6 shadow-lg rounded-b-lg">
                <h1 className="text-3xl font-bold">Statistic Map Dashboard</h1>
            </header>
            <main className="p-8">
                {/* New Map Section */}
                <section className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-4">Interactive Map</h2>
                    <MapSection />
                </section>

                {/* Existing Cards Section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-indigo-700">Most Affected Area</h2>
                        <p className="text-gray-700">Details about the most affected area...</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-indigo-700">Statistics</h2>
                        <p className="text-gray-700">Details about statistics...</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-indigo-700">Additional Data</h2>
                        <p className="text-gray-700">Details about additional data...</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
