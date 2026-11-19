import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SchoolTwoClubs = ({ schoolId = "school_two" }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch clubs from Firestore
  useEffect(() => {
    async function fetchClubsData() {
      try {
        setLoading(true);

        const querySnapshot = await getDocs(
          collection(db, "schools", schoolId, "clubs"),
        );
        const clubsData = querySnapshot.docs.map((doc) => doc.data());

        // Sort clubs by ID
        clubsData.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

        setClubs(clubsData);
      } catch (error) {
        console.error("Error fetching School Two clubs from Firestore:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClubsData();
  }, [schoolId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "3rem", textAlign: "center" }}>
          <h2>Loading School Two clubs...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="row">
        <img src="2.png" alt="Header Banner" />
      </div>
      <div className="row px-5">
        {clubs.map((club) => (
          <div key={club.id || club.name} className="col-md-4 px-3 py-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{club.name}</h5>
                <p className="card-text">
                  meeting room: {club.meetingRoom}
                  <br />
                  instagram: {club.instagram}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SchoolTwoClubs;
