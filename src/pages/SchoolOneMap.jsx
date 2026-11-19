import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SchoolOneMap = ({ schoolId = "school_one" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live data from Firestore on mount or when schoolId changes
  useEffect(() => {
    async function fetchSchoolData() {
      try {
        setLoading(true);

        // Fetch Images Subcollection
        const imagesSnap = await getDocs(
          collection(db, "schools", schoolId, "images"),
        );
        const imagesData = imagesSnap.docs.map((doc) => doc.data());
        imagesData.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        // Fetch Descriptions Subcollection
        const descSnap = await getDocs(
          collection(db, "schools", schoolId, "descriptions"),
        );
        const descData = descSnap.docs.map((doc) => doc.data());
        descData.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        setImages(imagesData);
        setDescriptions(descData);
      } catch (error) {
        console.error("Error fetching map data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchoolData();
  }, [schoolId]);

  // Handle hotspot clicks
  const handleClick = (targetIndex) => {
    setCurrentImageIndex(targetIndex);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "3rem", textAlign: "center" }}>
          <h2>Loading campus map...</h2>
        </div>
      </>
    );
  }

  // Find the matching description object for the current image index
  const currentDesc = descriptions.find(
    (desc) => desc.id === currentImageIndex,
  ) || {
    title: "Location Info",
    desc: "No description available.",
  };

  // Get current image object
  const currentImgObj = images[currentImageIndex] || { src: "", hotspots: [] };

  return (
    <>
      <div>
        <Navbar />
        <div className="row mapRow">
          <div className="col-lg-8 map-child">
            <div className="image-container">
              <div style={{ position: "relative" }}>
                <motion.img
                  key={currentImageIndex}
                  src={currentImgObj.src}
                  alt="Campus Location"
                  className="westmoor-map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {currentImgObj.hotspots?.map((spot, index) => (
                  <button
                    key={index}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                    }}
                    className="hotspot-buttons mx-auto"
                    onClick={() => handleClick(spot.target)}
                    title={spot.name}
                  >
                    <FontAwesomeIcon icon={faGhost} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 px-5 locationList my-5 map-child">
            <div className="card">
              <div className="card-body desc">
                <div className="card-text">
                  <h2>{currentDesc.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: currentDesc.desc }} />
                </div>
                <img src="tinyram1.png" alt="" width="30%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolOneMap;
