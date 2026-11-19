import React, { useState, useContext } from "react";
import Select from "react-select";
import "../index.css";
import { Link } from "react-router-dom";
import { SchoolContext } from "../context/Context";

const Start = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { mapLink, setMapLink, setClubLink, setFAQLink, setTitle } =
    useContext(SchoolContext);
  const options = [
    {
      value: "school-one-map",
      clubLink: "school-one-clubs",
      faqLink: "school-one-faq",
      label: "School One, Daly City, CA, USA",
      title: "- School One",
    },
    {
      value: "school-two-map",
      clubLink: "school-two-clubs",
      faqLink: "school-two-faq",
      label: "School Two, Daly City, CA, USA",
      title: "- School Two",
    },
  ];
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setMapLink(selectedOption.value);
    setClubLink(selectedOption.clubLink);
    setFAQLink(selectedOption.faqLink);
    setTitle(selectedOption.title);
  };

  return (
    <>
      <div className="startPage notranslate">
        <h1 className="notranslate">breadcrumbs</h1>
        <form action="">
          <div>
            <label htmlFor="">Select your bread: &nbsp; </label>
            <div className="selectSchool">
              <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                isSearchable={true}
                placeholder="Select School"
                className="select-school-box mx-auto"
              />
            </div>
          </div>
          <Link to={mapLink} className="continueButton">
            continue
          </Link>
        </form>
      </div>
    </>
  );
};

export default Start;
