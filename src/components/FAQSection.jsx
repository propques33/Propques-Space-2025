import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I come visit before joining?",
    answer:
      "Absolutely! We’d love to show you around. For memberships, book a free trial day to experience firsthand what it’s like to work at Propques Spaces. And if you’re looking for a private office, join us for a tour and decide on the perfect layout for your space. We can’t wait to welcome you!" },
  {
    question: "How do I become a member?",
    answer:
      "Just pick the location that speaks to you, choose the membership that fits like your favourite sweater, pay, and voilà! You’re officially part of the coolest community around! Plus, if you’re eyeing a private office, our sales team is ready to chat. Swing by for a visit and see for yourself what makes Propques Spaces the perfect fit for your business needs!",
  },
  {
    question: "Can I bring my pet to office?",
    answer:
      "Of course! We love furry friends. Just let us know in advance, and we’ll make sure your pet has a great time too. We have a few pet-friendly locations, so check with us to find the perfect spot for you and your four-legged buddy.",},
  {
    question: "Can I cancel my membership  any time?",
    answer:
      "If you ever need to cancel your membership, just reach out to your community manager. There are no long-term commitments here – you can simply terminate it by giving us 30 days written notice. We’re here to make your workspace experience as flexible as possible!",
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
