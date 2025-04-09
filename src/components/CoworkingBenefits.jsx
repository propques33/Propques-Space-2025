import {
    CalendarDays,
    Users,
    Wifi,
    Coffee,
    DollarSign,
    Briefcase,
  } from "lucide-react";
  
  const features = [
    {
      icon: <CalendarDays size={28} className="text-[#20B1EE]" />,
      title: "Flexible Plans",
      desc: "Choose from daily, monthly, or yearly options.",
    },
    {
      icon: <Users size={28} className="text-[#20B1EE]" />,
      title: "Vibrant Community",
      desc: "Collaborate with diverse professionals.",
    },
    {
      icon: <Wifi size={28} className="text-[#20B1EE]" />,
      title: "High-Speed Internet",
      desc: "Stay connected at all times.",
    },
    {
      icon: <Coffee size={28} className="text-[#20B1EE]" />,
      title: "Unlimited Coffee",
      desc: "Enjoy fresh brews to fuel productivity.",
    },
    {
      icon: <DollarSign size={28} className="text-[#20B1EE]" />,
      title: "Cost-Effective",
      desc: "Pay only for the space and services you need.",
    },
    {
      icon: <Briefcase size={28} className="text-[#20B1EE]" />,
      title: "Professional Environment",
      desc: "Boost credibility with modern, well-equipped spaces.",
    },
  ];
  
  export default function CoworkingBenefits() {
    return (
      <section className="px-6 py-12 bg-white text-gray-800 my-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font- mb-8">Why Managed Office Stands <br /> Unrivalled?</h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="">
                {feature.icon} <br />
                <div>
                  <h3 className="text-xl">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  