import { useState, useEffect } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaUserShield } from 'react-icons/fa';
import jsPDF from 'jspdf';

const vans = [
  { id: 1, name: 'Luxury Van', price: 'KES 10,000', image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Party Van', price: 'KES 15,000', image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Family Van', price: 'KES 8,000', image: 'https://via.placeholder.com/300' }
];

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tripDetails, setTripDetails] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.onload = () => {
        const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById('location'),
          { types: ['geocode'] }
        );
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          setLocation(place.formatted_address);
        });
      };
      document.head.appendChild(script);
    };
    loadGoogleMaps();
  }, []);

  const generateInvoice = (van) => {
    const doc = new jsPDF();
    doc.text("ZoomVans Booking Invoice", 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Phone: ${phone}`, 20, 40);
    doc.text(`Location: ${location}`, 20, 50);
    doc.text(`Van: ${van.name}`, 20, 60);
    doc.text(`Price: ${van.price}`, 20, 70);
    doc.save(`ZoomVans_Invoice_${van.name}.pdf`);
    alert("Invoice Generated!");
  };

  const handleBooking = (van) => {
    if (!name || !phone || !location) {
      alert("Please enter your name, phone number, and pickup location");
      return;
    }
    generateInvoice(van);
    window.location.href = `https://wa.me/254719681678?text=Hello%20ZoomVans,%20I'm%20${name}%20and%20I%20want%20to%20book%20the%20${van.name}%20from%20${location}%20for%20${tripDetails}.%20Phone:%20${phone}`;
  };

  const handlePayment = () => {
    alert("Redirecting to M-Pesa Payment Gateway...");
    window.open("https://payments.zoomvans.co.ke/pay?amount=1000&phone=" + phone, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-500 text-white text-center p-10">
      <h1 className="text-5xl font-bold">🚐 Welcome to ZoomVans</h1>
      <p className="mt-2 text-lg">Your Ride, Your Adventure, Your Way</p>

      <div className="mt-10">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded text-black mb-4"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 rounded text-black mb-4"
          required
        />
        <input
          id="location"
          type="text"
          placeholder="Pickup Location"
          className="p-2 rounded text-black mb-4"
          required
        />
        <textarea
          placeholder="Trip Details (Date, Destination)"
          value={tripDetails}
          onChange={(e) => setTripDetails(e.target.value)}
          className="p-2 rounded text-black mb-4"
          required
        ></textarea>
      </div>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Available Vans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {vans.map((van) => (
            <div key={van.id} className="bg-white text-black p-4 rounded-lg shadow-lg">
              <img src={van.image} alt={van.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{van.name}</h3>
              <p className="text-lg">{van.price}</p>
              <button
                onClick={() => handleBooking(van)}
                className="bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition mt-3"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <button onClick={handlePayment} className="bg-green-500 py-2 rounded hover:bg-green-600 transition mt-10">
        Pay with M-Pesa
      </button>

      <footer className="mt-10">
        <p>Follow Us:</p>
        <a href="https://wa.me/254719681678" target="_blank" className="text-2xl"><FaWhatsapp /></a>
        <p className="mt-4">© 2025 ZoomVans - All Rights Reserved</p>
        <div className="text-2xl mt-2"><FaUserShield /> Admin Panel</div>
      </footer>
    </div>
  );
}
