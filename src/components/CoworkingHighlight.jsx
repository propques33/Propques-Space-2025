import { Briefcase, Users, Star } from "lucide-react";

export default function CoworkingHighlight() {
  return (
    <section className="px-6 py-12 bg-white text-gray-800 my-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl leading-tight mb-4">
          Level Up Your Work at  
          {" "}
            <span className="text-gray-900">India’s Best Managed Workspaces</span>
          </h1>
          <p className=" text-gray-600 capitalize text-sm mb-4 md:text-medium">
          Whether you're a freelancer, startup, or enterprise team, discover vibrant managed workspaces built for productivity and connection. As leaders in Coworking consultancy India, we deliver Coworking space consulting, Coworking setup consultants, and End-to-end coworking solutions. From Coworking business consulting to Property consultancy for coworking, we fuel your growth under one roof.
          </p>
        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            {/* <Briefcase className="mx-auto text-[#20B1EE] mb-2" size={32} /> */}
            <p className="text-4xl ont-semibold text-sky-500">+6</p>
            <p className="text-sm text-gray-600">Centers</p>
          </div>
          <div>
            {/* <Users className="mx-auto text-[#20B1EE] mb-2" size={32} /> */}
            <p className="text-4xl ont-semibold text-sky-500">+600</p>
            <p className="text-sm text-gray-600">Members</p>
          </div>
          <div>
            {/* <Star className="mx-auto text-[#20B1EE] mb-2" size={32} /> */}
            <p className="text-4xl ont-semibold text-sky-500">1 </p>
            <p className="text-sm text-gray-600">Million Sq. Ft.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
