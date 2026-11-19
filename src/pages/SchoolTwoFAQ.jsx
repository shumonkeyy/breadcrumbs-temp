import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SchoolTwoFAQ = ({ schoolId = "school_two" }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live FAQ data from Firestore
  useEffect(() => {
    async function fetchFaqs() {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          collection(db, "schools", schoolId, "faqs"),
        );
        const faqData = querySnapshot.docs.map((doc) => doc.data());

        // Sort by ID order
        faqData.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        setFaqs(faqData);
      } catch (error) {
        console.error("Error fetching School Two FAQs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, [schoolId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "3rem", textAlign: "center" }}>
          <h2>Loading FAQs...</h2>
        </div>
      </>
    );
  }

  // Group FAQs dynamically by category
  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <>
      <Navbar />
      <div className="row">
        <img src="1.png" alt="Header Banner" />
      </div>

      {categories.map((categoryName, catIdx) => {
        const categoryFaqs = faqs.filter(
          (faq) => faq.category === categoryName,
        );
        const accordionId = `accordion-${catIdx}`;

        return (
          <div key={categoryName} className="pt-4">
            <h2 className="px-5">{categoryName}</h2>
            <div className="accordion px-5 py-3" id={accordionId}>
              {categoryFaqs.map((faq) => {
                const itemCollapseId = `collapse-faq-school-two-${faq.id}`;

                return (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${itemCollapseId}`}
                        aria-expanded="false"
                        aria-controls={itemCollapseId}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={itemCollapseId}
                      className="accordion-collapse collapse"
                      data-bs-parent={`#${accordionId}`}
                    >
                      <div
                        className="accordion-body"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SchoolTwoFAQ;
