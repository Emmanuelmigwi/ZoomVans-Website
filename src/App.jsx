import { useState, useEffect } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaUserShield, FaTelegramPlane, FaEnvelope, FaInstagram, FaStar } from 'react-icons/fa';
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

  const sendEmailConfirmation = () => {
    alert(`Booking confirmation email sent to ${name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-yellow-500 text-white text-center p-10">
      <header className="bg-blue-900 p-5 rounded-lg">
        <h1 className="text-5xl font-bold">🚐 Welcome to ZoomVans</h1>
        <p>Your Ride, Your Adventure, Your Way</p>
      </header>

      <section className="mt-10">
        <h2 className="text-3xl font-bold text-yellow-300">Book Your Ride</h2>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 rounded text-black mb-4 border-2 border-yellow-300" required />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-3 rounded text-black mb-4 border-2 border-yellow-300" required />
        <input id="location" type="text" placeholder="Pickup Location" className="p-3 rounded text-black mb-4 border-2 border-yellow-300" required />
        <textarea placeholder="Trip Details" value={tripDetails} onChange={(e) => setTripDetails(e.target.value)} className="p-3 rounded text-black mb-4 border-2 border-yellow-300" required></textarea>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold text-yellow-300">Available Vans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vans.map((van) => (
            <div key={van.id} className="bg-white text-black p-4 rounded-lg shadow-lg">
              <img src={van.image} alt={van.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{van.name}</h3>
              <p>{van.price}</p>
              <button onClick={() => { handleBooking(van); sendEmailConfirmation(); }} className="bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition w-full">Book Now</button>
            </div>
          ))}
        </div>
      </section>

      <button onClick={handlePayment} className="bg-green-500 py-2 rounded hover:bg-green-600 transition mt-10">Pay with M-Pesa</button>

      <footer className="mt-10 bg-blue-900 p-5 rounded-lg">
        <p>Follow Us:</p>
        <a href="https://wa.me/254719681678" target="_blank" className="text-2xl"><FaWhatsapp /></a>
        <a href="https://t.me/ZoomVansOfficial" target="_blank" className="text-2xl ml-4"><FaTelegramPlane /></a>
        <a href="https://instagram.com/zoomvansofficial" target="_blank" className="text-2xl ml-4"><FaInstagram /></a>
        <p>© 2025 ZoomVans - All Rights Reserved</p>
      </footer>
    </div>
  );
}
