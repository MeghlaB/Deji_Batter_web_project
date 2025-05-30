import React from "react";

const faqs = [
  {
    question: "Are you a direct manufacturer or a trader?",
    answer:
      "We are real factory. There are 2000sqm and about 200 employees with 5 production lines.",
  },
  {
    question: "How is the quality of the battery?",
    answer:
      "DEJI’s mobile phone batteries are manufactured according to original quality standards and are of high quality. We have many agents and distributors worldwide all of whom trust us.",
  },
  {
    question: "Is the battery new with no charge cycles?",
    answer: "Yes. Our battery used 100% cobalt new cell with 0 cycle.",
  },
  {
    question: "Can I get a product catalog and wholesale price list?",
    answer:
      "Yes sure. Please contact us via WhatsApp or online form and describe the products you need and our sales manager will provide you with a preferential wholesale price list.",
  },
  {
    question: "Can you accept OEM orders with a requested package?",
    answer:
      "Yes Yes. We accept OEM order and make with your LOGO package.",
  },
  {
    question:
      "In addition to mobile phone battery products do you also make other products?",
    answer:
      "Our factory also produces power bank, wireless charger, data cables and other electronic products.",
  },
  {
    question: "How is the after sales service?",
    answer:
      "A. We have after sales service team to service for after sale questions.\nB. We offer 24-hours online service to help buyers to solve problems.\nC. We offer market information to buyers.",
  },
  {
    question: "What's the shipping and warranty policy?",
    answer:
      "We offer a one-year warranty. Shipping is available via air, sea, or express courier based on your location.",
  },
];

const FAQAccordion = () => {
  return (
    <div className="join join-vertical w-full bg-base-100 mt-10">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="collapse collapse-arrow join-item border border-base-300"
        >
          <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
          <div className="collapse-title font-semibold text-base">
            Q{index + 1}. {faq.question}
          </div>
          <div className="collapse-content text-sm whitespace-pre-line text-gray-600">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
