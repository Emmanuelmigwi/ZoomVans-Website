import { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaTelegram, FaTiktok } from 'react-icons/fa';
import jsPDF from 'jspdf';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tripDetails, setTripDetails] = useState('');
  const [location, setLocation] = useState('');
  const [vans, setVans] = useState([
    { id: 1, name: 'Luxury Van', price: 'KES 10,000', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Party Van', price: 'KES 15,000', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Family Van', price: 'KES 8,000', image: 'https://via.placeholder.com/150' },
  ]);

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

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.text("ZoomVans Booking Invoice", 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Phone: ${phone}`, 20, 40);
    doc.text(`Location: ${location}`, 20, 50);
    doc.text(`Trip Details: ${tripDetails}`, 20, 60);
    doc.save("ZoomVans_Invoice.pdf");
    alert("Invoice Generated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request sent for ${name}`);
    generateInvoice();
    window.location.href = `https://wa.me/254719681678?text=Hello%20ZoomVans,%20I'm%20${name}%20and%20I%20want%20to%20book%20a%20trip.%20Location:%20${location},%20Phone:%20${phone},%20Trip:%20${tripDetails}`;
  };

  const handlePayment = async () => {
    alert("Redirecting to Payment Gateway...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-500 text-white text-center p-10">
      <h1 className="text-4xl font-bold">Welcome to ZoomVans</h1>
      <p className="text-lg mt-2">"Your Ride, Your Adventure, Your Way"</p>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Available Vans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {vans.map((van) => (
            <div key={van.id} className="bg-white text-black p-4 rounded-lg shadow-lg">
              <img src={van.image} alt={van.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{van.name}</h3>
              <p className="text-lg">{van.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Book Your Van</h2>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded text-black"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 rounded text-black"
            required
          />
          <input
            id="location"
            type="text"
            placeholder="Pickup Location"
            className="p-2 rounded text-black"
            required
          />
          <textarea
            placeholder="Trip Details (Date, Destination, Van Type)"
            value={tripDetails}
            onChange={(e) => setTripDetails(e.target.value)}
            className="p-2 rounded text-black"
            required
          ></textarea>
          <button className="bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition">Submit Booking</button>
          <button type="button" onClick={handlePayment} className="bg-green-500 py-2 rounded hover:bg-green-600 transition">Pay Now</button>
        </form>
      </section>

      <footer className="mt-10">
        <p>Follow Us:</p>
        <div className="flex justify-center gap-4 text-2xl">
          <a href="https://wa.me/254719681678" target="_blank"><FaWhatsapp /></a>
          <a href="https://www.instagram.com/zoomvansofficial" target="_blank"><FaInstagram /></a>
          <a href="https://t.me/ZoomVansOfficial" target="_blank"><FaTelegram /></a>
          <a href="https://www.tiktok.com/@zoomvansofficial" target="_blank"><FaTiktok /></a>
        </div>
        <p className="mt-4">© 2025 ZoomVans - All Rights Reserved</p>
      </footer>
    </div>
  );
}
