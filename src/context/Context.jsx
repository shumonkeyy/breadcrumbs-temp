import React, { createContext, useState, useEffect } from "react";

export const SchoolContext = createContext(null);

export const SchoolContextProvider = (props) => {
  const [mapLink, setMapLink] = useState("");
  const [clubLink, setClubLink] = useState("");
  const [faqLink, setFAQLink] = useState("");
  const [counseling, setCounseling] = useState("");

  const [title, setTitle] = useState("");

  const contextValue = {
    mapLink,
    setMapLink,
    clubLink,
    setClubLink,
    faqLink,
    setFAQLink,
    title,
    setTitle,
    counseling,
    setCounseling,
  };
  useEffect(() => {
    const savedMap = localStorage.getItem("new-student-map");
    const savedClub = localStorage.getItem("new-student-club");
    const savedFAQ = localStorage.getItem("new-student-faq");
    const savedCounseling = localStorage.getItem("new-student-counseling");

    // Only set if the value exists to avoid overwriting state with "null"
    if (savedMap) setMapLink(JSON.parse(savedMap));
    if (savedClub) setClubLink(JSON.parse(savedClub));
    if (savedFAQ) setFAQLink(JSON.parse(savedFAQ));
    if (savedCounseling) setCounseling(JSON.parse(savedCounseling));
  }, []);
  useEffect(() => {
    if (mapLink) {
      localStorage.setItem("new-student-map", JSON.stringify(mapLink));
    }
  }, [mapLink]);

  useEffect(() => {
    if (clubLink) {
      localStorage.setItem("new-student-club", JSON.stringify(clubLink));
    }
  }, [clubLink]);

  useEffect(() => {
    if (faqLink) {
      localStorage.setItem("new-student-faq", JSON.stringify(faqLink));
    }
  }, [faqLink]);

  useEffect(() => {
    if (counseling) {
      localStorage.setItem(
        "new-student-counseling",
        JSON.stringify(counseling)
      );
    }
  }, [counseling]);

  return (
    <SchoolContext.Provider value={contextValue}>
      {props.children}
    </SchoolContext.Provider>
  );
};
