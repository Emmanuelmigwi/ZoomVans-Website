import { useState } from 'react';

const vans = [
  { id: 1, name: 'Luxury Van', price: 'KES 10,000', image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Party Van', price: 'KES 15,000', image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Family Van', price: 'KES 8,000', image: 'https://via.placeholder.com/300' }
];

export default function App() {
  const [tripDetails, setTripDetails] = useState('');

  const handleBooking = (vanName) => {
    alert(`Booking Request Sent for ${vanName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-500 text-white text-center p-10">
      <h1 className="text-5xl font-bold">🚐 Welcome to ZoomVans</h1>
      <p className="mt-2 text-lg">Your Ride, Your Adventure, Your Way</p>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Available Vans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {vans.map((van) => (
            <div key={van.id} className="bg-white text-black p-4 rounded-lg shadow-lg">
              <img src={van.image} alt={van.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{van.name}</h3>
              <p className="text-lg">{van.price}</p>
              <button
                onClick={() => handleBooking(van.name)}
                className="bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition mt-3"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
