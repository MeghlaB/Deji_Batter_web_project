import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi"; // install with `npm i react-icons`

const faqs = [
  {
    question: "Q1. Are you a direct manufacturer or a trader?",
    answer: "We are a direct manufacturer with over 10 years of experience.",
  },
  {
    question: "Q2. How is the quality of the battery?",
    answer: "Our batteries are high-quality with certifications like CE and RoHS.",
  },
  {
    question: "Q3. Is the battery new with no charge cycles?",
    answer: "Yes, all batteries are brand new with 0 charge cycles.",
  },
  {
    question: "Q4. Can I get a product catalog and wholesale price?",
    answer: "Yes, we can send you a detailed product catalog and offer wholesale pricing.",
  },
  {
    question: "Q5. Can you accept OEM orders with a requested package?",
    answer: "Absolutely. We support OEM orders with custom branding and packaging.",
  },
  {
    question: "Q6. In addition to mobile phone battery products do you offer other accessories?",
    answer: "Yes, we also supply chargers, cases, and other related accessories.",
  },
  {
    question: "Q7. How is the after sales service?",
    answer: "We provide 12-month warranty and 24/7 customer support.",
  },
  {
    question: "Q8. What's the shipping and warranty policy?",
    answer: "Shipping usually takes 5-10 days. Warranty is 12 months.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-2xl  font-bold ">FAQ</h2>
      <div className=" mx-auto   rounded-lg shadow-md">
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white rounded border">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-4 text-left text-green-600  text-xl hover:bg-gray-50 transition"
                >
                  <span className="truncate font-bold">{faq.question}</span>
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out px-4 overflow-hidden text-gray-700 ${isOpen ? "max-h-40 py-2" : "max-h-0 py-0"
                    }`}
                >
                  <p className="font-semibold">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}
