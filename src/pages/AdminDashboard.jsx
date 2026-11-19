import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [schoolId, setSchoolId] = useState("school_one");
  const [category, setCategory] = useState("descriptions");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const [newFaqCategory, setNewFaqCategory] = useState(
    "General School Information",
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const [newClubName, setNewClubName] = useState("");
  const [newMeetingRoom, setNewMeetingRoom] = useState("");
  const [newInstagram, setNewInstagram] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setStatusMessage("");
    try {
      const querySnapshot = await getDocs(
        collection(db, "schools", schoolId, category),
      );
      const data = querySnapshot.docs.map((d) => ({
        docId: d.id,
        ...d.data(),
      }));

      data.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      setItems(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setShowAddForm(false);
  }, [schoolId, category, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleInputChange = (docId, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.docId === docId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSave = async (docId, updatedData) => {
    try {
      setStatusMessage("Saving...");
      const docRef = doc(db, "schools", schoolId, category, docId);
      await updateDoc(docRef, updatedData);
      setStatusMessage(`Saved item (${docId}) successfully!`);
    } catch (err) {
      console.error(err);
      setStatusMessage("Error saving changes.");
    }
  };

  const handleDelete = async (docId, itemName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${
        itemName || docId
      }"? This action cannot be undone.`,
    );
    if (!confirmDelete) return;

    try {
      setStatusMessage(`Deleting ${docId}...`);
      const docRef = doc(db, "schools", schoolId, category, docId);
      await deleteDoc(docRef);
      setStatusMessage(`Successfully deleted item (${docId}).`);

      fetchData();
    } catch (err) {
      console.error("Error deleting item:", err);
      setStatusMessage("Failed to delete item.");
    }
  };

  const handleAddFaq = async (e) => {
    e.preventDefault();
    try {
      setStatusMessage("Adding new FAQ...");
      const nextId =
        items.length > 0 ? Math.max(...items.map((i) => i.id || 0)) + 1 : 1;
      const docId = `faq_${nextId}`;

      const newFaqObj = {
        id: nextId,
        category: newFaqCategory,
        question: newQuestion,
        answer: newAnswer,
      };

      const docRef = doc(db, "schools", schoolId, "faqs", docId);
      await setDoc(docRef, newFaqObj);

      setNewQuestion("");
      setNewAnswer("");
      setShowAddForm(false);
      setStatusMessage(`Successfully added new FAQ #${nextId}!`);
      fetchData();
    } catch (err) {
      console.error("Error adding FAQ:", err);
      setStatusMessage("Failed to add new FAQ.");
    }
  };

  const handleAddClub = async (e) => {
    e.preventDefault();
    try {
      setStatusMessage("Adding new Club...");
      const nextId =
        items.length > 0 ? Math.max(...items.map((i) => i.id || 0)) + 1 : 1;
      const docId = `club_${nextId}`;

      const newClubObj = {
        id: nextId,
        name: newClubName,
        meetingRoom: newMeetingRoom,
        instagram: newInstagram,
      };

      const docRef = doc(db, "schools", schoolId, "clubs", docId);
      await setDoc(docRef, newClubObj);

      setNewClubName("");
      setNewMeetingRoom("");
      setNewInstagram("");
      setShowAddForm(false);
      setStatusMessage(`Successfully added "${newClubName}"!`);
      fetchData();
    } catch (err) {
      console.error("Error adding Club:", err);
      setStatusMessage("Failed to add new Club.");
    }
  };

  if (!user) {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            required
          />
          <button type="submit" style={{ width: "100%", padding: "10px" }}>
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Admin Portal</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <label>School: </label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            >
              <option value="school_one">School One</option>
              <option value="school_two">School Two</option>
            </select>
          </div>

          <div>
            <label>Category: </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="descriptions">Map Descriptions</option>
              <option value="clubs">Clubs</option>
              <option value="faqs">FAQs</option>
            </select>
          </div>
        </div>

        {(category === "faqs" || category === "clubs") && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {showAddForm
              ? "Cancel"
              : `+ Add New ${category === "faqs" ? "FAQ" : "Club"}`}
          </button>
        )}
      </div>

      {statusMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>{statusMessage}</p>
      )}

      {showAddForm && category === "faqs" && (
        <form
          onSubmit={handleAddFaq}
          style={{
            border: "2px solid #007bff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "25px",
            backgroundColor: "#eef6ff",
          }}
        >
          <h3>Create New FAQ for {schoolId.toUpperCase()}</h3>
          <label>Section Category:</label>
          <select
            value={newFaqCategory}
            onChange={(e) => setNewFaqCategory(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
          >
            <option value="General School Information">
              General School Information
            </option>
            <option value="Academics">Academics</option>
            <option value="Sports">Sports</option>
          </select>

          <label>Question:</label>
          <input
            type="text"
            placeholder="e.g. Where is the library?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
            required
          />

          <label>Answer (Supports HTML):</label>
          <textarea
            rows="4"
            placeholder="e.g. The library is located in Building B."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
            required
          />

          <button
            type="submit"
            style={{
              padding: "8px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save New FAQ
          </button>
        </form>
      )}

      {showAddForm && category === "clubs" && (
        <form
          onSubmit={handleAddClub}
          style={{
            border: "2px solid #007bff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "25px",
            backgroundColor: "#eef6ff",
          }}
        >
          <h3>Create New Club for {schoolId.toUpperCase()}</h3>

          <label>Club Name:</label>
          <input
            type="text"
            placeholder="e.g. Robotics Club"
            value={newClubName}
            onChange={(e) => setNewClubName(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
            required
          />

          <label>Meeting Room:</label>
          <input
            type="text"
            placeholder="e.g. Room 204 or Library"
            value={newMeetingRoom}
            onChange={(e) => setNewMeetingRoom(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
            required
          />

          <label>Instagram Handle / Link:</label>
          <input
            type="text"
            placeholder="e.g. @robotics_club"
            value={newInstagram}
            onChange={(e) => setNewInstagram(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
          />

          <button
            type="submit"
            style={{
              padding: "8px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save New Club
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {items.map((item) => (
            <div
              key={item.docId}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* 1. MAP DESCRIPTIONS */}
              {category === "descriptions" && (
                <>
                  <h3>
                    Location ID #{item.id}: {item.title}
                  </h3>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) =>
                      handleInputChange(item.docId, "title", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />
                  <label>Description:</label>
                  <textarea
                    rows="4"
                    value={item.desc || ""}
                    onChange={(e) =>
                      handleInputChange(item.docId, "desc", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />
                  <button
                    onClick={() =>
                      handleSave(item.docId, {
                        title: item.title,
                        desc: item.desc,
                      })
                    }
                  >
                    Save Description
                  </button>
                </>
              )}

              {/* 2. CLUBS */}
              {category === "clubs" && (
                <>
                  <h3>Club: {item.name}</h3>
                  <label>Club Name:</label>
                  <input
                    type="text"
                    value={item.name || ""}
                    onChange={(e) =>
                      handleInputChange(item.docId, "name", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />
                  <label>Meeting Room:</label>
                  <input
                    type="text"
                    value={item.meetingRoom || ""}
                    onChange={(e) =>
                      handleInputChange(
                        item.docId,
                        "meetingRoom",
                        e.target.value,
                      )
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />
                  <label>Instagram:</label>
                  <input
                    type="text"
                    value={item.instagram || ""}
                    onChange={(e) =>
                      handleInputChange(item.docId, "instagram", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />

                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <button
                      onClick={() =>
                        handleSave(item.docId, {
                          name: item.name,
                          meetingRoom: item.meetingRoom,
                          instagram: item.instagram,
                        })
                      }
                    >
                      Save Club
                    </button>
                    <button
                      onClick={() => handleDelete(item.docId, item.name)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Delete Club
                    </button>
                  </div>
                </>
              )}

              {/* 3. FAQS */}
              {category === "faqs" && (
                <>
                  <h3>Section: {item.category}</h3>
                  <label>Question:</label>
                  <input
                    type="text"
                    value={item.question || ""}
                    onChange={(e) =>
                      handleInputChange(item.docId, "question", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />
                  <label>Answer (Supports HTML/Links):</label>
                  <textarea
                    rows="5"
                    value={item.answer || ""}
                    onChange={(e) =>
                      handleInputChange(item.docId, "answer", e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "6px",
                    }}
                  />

                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <button
                      onClick={() =>
                        handleSave(item.docId, {
                          question: item.question,
                          answer: item.answer,
                        })
                      }
                    >
                      Save FAQ
                    </button>
                    <button
                      onClick={() => handleDelete(item.docId, item.question)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Delete FAQ
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
