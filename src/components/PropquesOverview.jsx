import React from "react";
import {
  Building2,
  Settings,
  Lightbulb,
  TrendingUp,
  Rocket,
  BadgeCheck,
  Users,
  ClipboardCheck,
} from "lucide-react";

export default function PropquesOverview() {
  return (
    <section className="max-w-7xl mx-auto py-16 text-center space-y-14 px-6">
      {/* Tagline */}
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#20B1EE]">
        Traditional Spaces to Managed Spaces 


        </h2>
        <p className="text-xl text-gray-700">
          Propques Powers the Future of Workspaces
        </p>
      </div>

      {/* What We Offer */}
      <div className="s">
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <FeatureCard
            icon={<Building2 className="w-8 h-8 text-[#20B1EE]" />}
            title="Managed  Workspaces Transformation"
            desc="We convert underutilized spaces into high-performance coworking hubs."
          />
          <FeatureCard
            icon={<Settings className="w-8 h-8 text-[#20B1EE]" />}
            title="End-to-End Management"
            desc="We handle everything — ops, marketing, community, and growth."
          />
          <FeatureCard
            icon={<Lightbulb className="w-8 h-8 text-[#20B1EE]" />}
            title="Strategic Consulting"
            desc="Get insights, strategy, and market-backed advice for space optimization."
          />
        </div>
      </div>

      {/* Why Propques */}
      <div className="space-y-6 my-20">
        <h3 className="text-4xl font-semibold capitalize  text-[#20B1EE]">Why choose propques spaces</h3>

        <p className="text-xl text-gray-700">
        Propques Workspaces That Work for You         </p>

       

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-gray-700">
          <MiniFeature icon={<TrendingUp />} text="Higher Rental Yields" />
          <MiniFeature icon={<Rocket />} text="Faster Occupancy Growth" />
          <MiniFeature icon={<ClipboardCheck />} text="Complete Management" />
          <MiniFeature icon={<BadgeCheck />} text="CRE Expertise" />
        </div>
      </div>

      {/* Our Promise */}
      <div className="bg-[#f0faff] py-10 px-6 rounded-xl space-y-3 my-20">
        <h3 className="text-2xl font-semibold text-[#20B1EE]">
          Your Space. Our Expertise.
        </h3>
        <p className="text-gray-700 md:text-lg text-sm">
          We transform properties into premium coworking brands — with strategy,
          design, and full-stack operations.
        </p>
      </div>

      {/* The Propques Advantage */}
      <div className="space-y-6">
        <h3 className="text-4xl md:text-5xl font-semibold text-[#20B1EE]">The Propques Advantage</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-700 mt-12 text-sm">
          <MiniFeature icon={<TrendingUp />} text="Higher Yields" />
          <MiniFeature icon={<Settings />} text="Expert Ops Management" />
          <MiniFeature icon={<Rocket />} text="Faster Setup & Launch" />
          <MiniFeature icon={<BadgeCheck />} text="Strong Brand Identity" />
          <MiniFeature icon={<Users />} text="Engaged Communities" />
          <MiniFeature icon={<ClipboardCheck />} text="End-to-End Support" />
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl shadow-md p-5 space-y-3 border border-gray-100">
    <div>{icon}</div>
    <h4 className="text-lg font-">{title}</h4>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);

const MiniFeature = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-[#20B1EE]">{icon}</span>
    <span>{text}</span>
  </div>
);
