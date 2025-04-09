import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is coworking?",
    answer:
      "Coworking is a shared workspace model where professionals from different fields work together in a collaborative environment.",
  },
  {
    question: "Where are your coworking centers located?",
    answer:
      "Our centers are strategically located in prime areas across major cities in India.",
  },
  {
    question: "What amenities are provided?",
    answer:
      "We offer high-speed internet, meeting rooms, unlimited coffee, printing facilities, and community events.",
  },
  {
    question: "What are the membership plans?",
    answer:
      "We offer flexible plans including daily passes, monthly memberships, and team office solutions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-zinc-50 px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl  mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Have questions? We’ve got answers to help you choose the right coworking experience.
          </p>
        </div>

        {/* Right - Accordion */}
        <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#20b0ee7e] rounded-xl shadow-sm  bg-white transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 text-left  text-gray-900"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-4 overflow-hidden transition-all duration-300 text-sm text-gray-600 ${
                  openIndex === index
                    ? "max-h-40 opacity-100 pb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
