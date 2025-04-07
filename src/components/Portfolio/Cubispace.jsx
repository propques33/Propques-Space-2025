import { Briefcase, Wifi, Users, Leaf, Coffee, MonitorSmartphone, Mail, Phone } from 'lucide-react';

const amenities = [
  { icon: <Wifi />, title: "High-Speed Internet" },
  { icon: <MonitorSmartphone />, title: "Ergonomic Workstations" },
  { icon: <Users />, title: "Meeting Rooms" },
  { icon: <Coffee />, title: "Relaxation Zones" },
  { icon: <Briefcase />, title: "Networking Events" },
  { icon: <Leaf />, title: "Biophilic Design" },
];

const pricing = [
  { plan: "Dedicated Desk", price: "₹6,600/month" },
  { plan: "Flexible Desk", price: "₹6,050/month" },
  { plan: "Private Cabin", price: "₹26,400/month" },
  { plan: "Meeting Room", price: "₹599/hour" },
  { plan: "Conference Room", price: "₹1,200/hour" },
];

const gallery = [
  "https://www.cubispace.com/wp-content/uploads/2021/08/IMG_5518-01-1024x683.jpeg",
  "https://www.cubispace.com/wp-content/uploads/2021/08/IMG_5495-01-1024x683.jpeg",
  "https://www.cubispace.com/wp-content/uploads/2021/08/IMG_5474-01-1024x683.jpeg",
];

export default function Cubispace() {
  return (
    <div className="font-sans text-gray-800">
      <header className="bg-white shadow p-6 text-center">
        <h1 className="text-4xl font-bold">Cubispace Coworking</h1>
        <p className="text-sm text-gray-500">Lucknow’s modern coworking space</p>
      </header>

      <section className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {amenities.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 border rounded-xl shadow-sm">
              <div className="text-indigo-600">{item.icon}</div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {gallery.map((url, idx) => (
            <img key={idx} src={url} alt="Cubispace view" className="rounded-xl shadow-md" />
          ))}
        </div>
      </section>

      <section className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>
        <ul className="space-y-3">
          {pricing.map((item, idx) => (
            <li key={idx} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>{item.plan}</span>
              <span className="font-semibold">{item.price}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2"><Phone /> <span>+91 7897765559</span></div>
          <div className="flex items-center gap-2"><Mail /> <span>hello@cubispace.com</span></div>
          <p>2nd Floor, JSV Hyundai, Sitapur Road Yojna, Near IET College, Lucknow</p>
        </div>
      </section>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Cubispace. All rights reserved.
      </footer>
    </div>
  );
}
