  import React, { useEffect, useState } from "react";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import SplashScreen from "./components/SplashScreen";
  import CampusSlideshow from "./components/CampusSlideshow";
  import HeroSection from "./components/HeroSection";
  import CoursesSection from "./components/CoursesSection";
  import ApplyModal from "./components/ApplyModal";
  import AuthModal from "./components/AuthModal";
  import UpcomingTrainings from "./components/UpcomingTrainings";
  import ProfileEditModal from "./components/ProfileEditModal";
  import ContactPanel from "./components/ContactPanel";
  import ToastContainer from "./components/ToastContainer";
  import {
  loginUser,
  registerUser,
  submitApplicationAPI,
} from "./services/api";
import { getProfile } from "./services/api";


/* ============================================================
   GLOBAL CSS – injected once into <head>
   (Existing CSS preserved; added profile card & edit modal styles)
============================================================ */

/* ============================================================
   MAIN APP COMPONENT
============================================================ */
export default function App() {  /* TABLE CELL STYLES (for schedule table) */
  const th = {
    padding: "10px",
    fontSize: "13px",
    color: "#064e3b",
    whiteSpace: "nowrap",
  };

  const td = {
    padding: "10px",
    fontSize: "13px",
    color: "#374151",
    verticalAlign: "top",
  };

  // inject CSS once
    // useEffect(() => {
    //   const style = document.createElement("style");
    //   style.innerHTML = globalCSS;
    //   document.head.appendChild(style);
    // }, []);

  /* TOASTS */
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = "success") => {
  const id = Date.now() + Math.random();
  setToasts((prev) => [...prev, { id, msg, type }]);

  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 3000);
};

  /* GLOBAL / UI STATES */
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
const [showSplash, setShowSplash] = useState(true);





  /* LOGIN / REGISTER STATES */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");

  /* USER PROFILE */
  const [userProfile, setUserProfile] = useState(null);

  /* Profile edit modal & temporary state */
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    avatar: "", // base64 data
  });
  const [avatarFileName, setAvatarFileName] = useState("");
  const [avatarUploadSuccess, setAvatarUploadSuccess] = useState(false);

  /* UPCOMING TRAININGS ANIM FLAG */
  const [trainingsVisible, setTrainingsVisible] = useState(false);

  /* APPLY MODAL */
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* APPLY FORM STATE */
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    degree: "",
    country: "",
    state: "",
    organisation: "",
    category: "",
    phone: "",
    notes: "",
  });
/* USER APPLICATIONS */
const [applications, setApplications] = useState(
  JSON.parse(localStorage.getItem("cftri_applications") || "[]")
);

  const updateApplyForm = (field, value) => {
    setApplyForm((prev) => ({ ...prev, [field]: value }));
  };

  /* Load profile, set scroll / animation */
  useEffect(() => {
    const stored = localStorage.getItem("cftri_user_profile");
    if (stored) {
      const p = JSON.parse(stored);
      setUserProfile(p);
      setApplyForm((prev) => ({
        ...prev,
        fullName: p.name || "",
        email: p.email || "",
        phone: p.phone || "",
      }));
    }

    setTimeout(() => setTrainingsVisible(true), 300);

    const onScroll = () => {
      setShowTopBtn(window.scrollY > 260);

      document.querySelectorAll(".fade").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
useEffect(() => {
  const restoreSession = async () => {
    try {
      const data = await getProfile();

      const profile = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
        avatar: data.user.avatar || "",
        address: data.user.address || "",
        nationality: data.user.nationality || "",
        lastLogin: new Date().toLocaleString(),
      };

      setUserProfile(profile);
      localStorage.setItem("cftri_user_profile", JSON.stringify(profile));
    } catch (err) {
      console.warn("Session restore failed:", err.message);
      setUserProfile(null);
    }
  };

  restoreSession();
}, []);

  /* SAVE PROFILE */
  const saveProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem("cftri_user_profile", JSON.stringify(profile));
    showToast("Profile updated successfully.", "success");
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cftri_user_profile");
    setUserProfile(null);
    showToast("Logged out successfully.", "success");
  };

  /* ---------------- LOGIN API ---------------- */
 const handleLogin = async () => {
  if (!loginEmail || !loginPassword) {
    showToast("Please enter email and password.", "error");
    return;
  }

  try {
    const data = await loginUser(loginEmail, loginPassword);

    localStorage.setItem("token", data.token);

    const profile = {
      _id: data.user?._id,
      name: data.user?.name || loginEmail.split("@")[0],
      email: data.user?.email || loginEmail,
      phone: data.user?.phone || "",
      avatar: data.user?.avatar || "",
      address: data.user?.address || "",
      nationality: data.user?.nationality || "",
      lastLogin: new Date().toLocaleString(),
    };

    saveProfile(profile);
    setAuthOpen(false);
    showToast("Login successful.", "success");
  } catch (err) {
    showToast(err.msg || "Login failed.", "error");
  }
};

  /* -------------- REGISTER API --------------- */
  const handleRegister = async () => {
    if (!fullName || !regEmail || !regPassword) {
      showToast("Please fill Full Name, Email and Password.", "error");
      return;
    }
    if (regPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
  await registerUser({
    name: fullName,
    email: regEmail,
    password: regPassword,
    address,
    phone,
    nationality,
  });

  showToast("Registration successful! Please login to continue.", "success");

      setAuthMode("login");
      setFullName("");
      setRegEmail("");
      setRegPassword("");
      setConfirmPassword("");
      setAddress("");
      setPhone("");
      setNationality("");
    } catch (err) {
      console.error(err);
      showToast("Registration failed. Check backend.", "error");
    }
  };

  /* NAV HELPERS */
  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
    setNavOpen(false);
  };
  const openRegister = () => {
    setAuthMode("register");
    setAuthOpen(true);
    setNavOpen(false);
  };

  /* APPLY BUTTON CLICK */
  const handleApplyClick = (course) => {
    if (!userProfile) {
      showToast("Please login or register before applying.", "error");
      openLogin();
      return;
    }
    setSelectedCourse(course);
    setApplyOpen(true);
  };

  const getApplyButtonLabel = () =>
    userProfile ? "Apply for this Training" : "Register / Sign in to Apply";

  /* SUBMIT APPLICATION → BACKEND */
 const submitApplication = async () => {
  const required = [
    "fullName",
    "email",
    "degree",
    "country",
    "state",
    "organisation",
    "category",
    "phone",
  ];

  for (let f of required) {
    if (!applyForm[f] || !applyForm[f].trim()) {
      showToast("Please fill all required fields (*)", "error");
      return;
    }
  }

  try {
   await submitApplicationAPI({
  userId: userProfile?._id,
  courseTitle: selectedCourse?.title || "Unknown Course",
  ...applyForm,
});

    showToast("Application submitted successfully!", "success");
    // Save application locally
const newApp = {
  course: selectedCourse?.title,
  date: new Date().toLocaleDateString(),
  status: "Submitted",
  payment: "Pending",
};

const updatedApps = [...applications, newApp];
setApplications(updatedApps);
localStorage.setItem("cftri_applications", JSON.stringify(updatedApps));

    setApplyOpen(false);

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    showToast("Cannot reach backend. Check URL.", "error");
  }
};

  /* SCROLL TO TOP */
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* UPCOMING TRAININGS */
  const upcomingTrainings = [
    {
      title: "Dairy Technology & Quality",
      dates: "Feb 2025",
      mode: "Hybrid",
      code: "STC-01",
    },
    {
      title: "Bakery & Confectionery",
      dates: "Mar 2025",
      mode: "On-Campus",
      code: "STC-02",
    },
    {
      title: "Food Safety & Standards",
      dates: "Apr 2025",
      mode: "Online",
      code: "STC-03",
    },
    {
      title: "Cereal Processing & Fortification",
      dates: "Jun 2025",
      mode: "On-Campus",
      code: "STC-04",
    },
  ];
/* ================= FULL TRAINING SCHEDULE (STATIC – 2025) ================= */
const fullSchedule = [
  {
    code: "STCH-01",
    title: "Training Programme on Fruits and Vegetable Products",
    dates: "15-04-2025 to 17-04-2025",
    duration: "3 Days",
    centre: "Hyderabad",
  },
  {
    code: "STCL-02",
    title: "Training Programme on Fruits & Vegetables Processing (Batch 1)",
    dates: "22-04-2025 to 24-04-2025",
    duration: "3 Days",
    centre: "Lucknow",
  },
  {
    code: "STC-06",
    title:
      "Fumigation, Prophylaxis and Pest Management Technique for Stored Food Commodities (Batch 1)",
    dates: "16-05-2025 to 30-05-2025",
    duration: "15 Days",
    centre: "CFTRI",
  },
  {
    code: "STCH-11",
    title: "Training Programme on Millet Products",
    dates: "11-06-2025 to 13-06-2025",
    duration: "3 Days",
    centre: "Hyderabad",
  },
  {
    code: "STC-12",
    title:
      "Integrated Solid Waste & Wastewater Management in the Food Industry",
    dates: "16-06-2025 to 20-06-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
  {
    code: "STC-21",
    title: "Spices Processing and Value Addition",
    dates: "04-08-2025 to 08-08-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
  {
    code: "STC-24",
    title: "Baking Science and Technology",
    dates: "18-08-2025 to 22-08-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
  {
    code: "STC-30",
    title: "Training Programme on Grain Processing and Machinery",
    dates: "10-11-2025 to 14-11-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
];
{/* ================= FULL SCHEDULE TABLE ================= */}
{/* <div className="card-stc" style={{ marginTop: 20 }}>
  <h3 className="text-lg font-semibold text-green-900 mb-2">
    Full Training Schedule – 2025
  </h3>

  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#e7f9ef", textAlign: "left" }}>
          <th style={th}>Code</th>
          <th style={th}>Course Title</th>
          <th style={th}>Dates</th>
          <th style={th}>Duration</th>
          <th style={th}>Centre</th>
        </tr>
      </thead>

      <tbody>
        {fullSchedule.map((row, i) => (
          <tr key={i} style={{ borderBottom: "1px solid #e5f4ea" }}>
            <td style={td}><strong>{row.code}</strong></td>
            <td style={td}>{row.title}</td>
            <td style={td}>{row.dates}</td>
            <td style={td}>{row.duration}</td>
            <td style={td}>{row.centre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div> */}

  /* COURSES LIST */
  const courses = [
    {
      title: "Fumigation",
      duration: "1 Week",
      fee: "₹9,500",
      image: "/images/courses/fumigation.webp",
      description:
        "Safe fumigation protocols for stored grains and food commodities.",
    },
    {
      title: "Fruits & Vegetables Products",
      duration: "2 Weeks",
      fee: "₹12,500",
      image: "/images/courses/fruits_veg.jpg",
      description:
        "Processing, dehydration and value-added products from fruits & vegetables.",
    },
    {
      title: "Spice Processing",
      duration: "10 Days",
      fee: "₹10,500",
      image: "/images/courses/spice.JPG",
      description:
        "Cleaning, grading, grinding, blending and essential oil extraction from spices.",
    },
    {
      title: "Millet Processing",
      duration: "1 Week",
      fee: "₹9,000",
      image: "/images/courses/millets.png",
      description:
        "Milling, decortication and development of millet-based health foods.",
    },
    {
      title: "Baking Technology",
      duration: "1 Week",
      fee: "₹9,500",
      image: "/images/courses/baking.jpg",
      description:
        "Training on breads, biscuits, cakes and speciality baked items.",
    },
    {
      title: "Food Safety Analysis",
      duration: "2 Weeks",
      fee: "₹15,000",
      image: "/images/courses/food_safety.jpg",
      description:
        "Chemical, microbiological and instrumental analysis for food safety.",
    },
    {
      title: "Business Opportunities in Food Processing",
      duration: "3 Days",
      fee: "₹5,000",
      image: "/images/courses/business.JPG",
      description:
        "Entrepreneurship opportunities, schemes, funding and market trends.",
    },
    {
      title: "Cell Culture Techniques",
      duration: "1 Week",
      fee: "₹14,000",
      image: "/images/courses/cell_culture.jpg",
      description:
        "Basics of cell culture, aseptic handling and food research applications.",
    },
    {
      title: "Packaging Technology",
      duration: "1 Week",
      fee: "₹9,000",
      image: "/images/courses/packaging.jpg",
      description:
        "Packaging materials, shelf-life improvement and standards.",
    },
    {
      title: "Solid Waste & Waste Water Management",
      duration: "5 Days",
      fee: "₹7,000",
      image: "/images/courses/waste.jpg",
      description:
        "Effluent treatment, by-product utilisation and waste management.",
    },
    {
      title: "Dairy Product Development",
      duration: "1 Week",
      fee: "₹9,000",
      image: "/images/courses/dairy_dev.jpg",
      description:
        "Ice cream, cheese, fermented milk and dairy innovations.",
    },
    {
      title: "Meat Processing",
      duration: "1 Week",
      fee: "₹10,500",
      image: "/images/courses/meat.png",
      description:
        "Processing, preservation and quality control of meat products.",
    },
  ];

  /* ------------------ PROFILE EDIT / UPLOAD HELPERS ------------------ */

  // open edit modal and prefill tempProfile
  const openProfileEdit = () => {
    setTempProfile({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
      nationality: userProfile?.nationality || "",
      avatar: userProfile?.avatar || "",
    });
    setAvatarUploadSuccess(false);
    setProfileEditOpen(true);
  };

  // handle avatar file selection, convert to base64 and store in tempProfile
 const handleAvatarChange = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowed.includes(f.type)) {
    showToast("Please upload a PNG / JPG / WEBP image.", "error");
    return;
  }

  setAvatarFileName(f.name);

  const reader = new FileReader();
  reader.onload = (ev) => {
    const b64 = ev.target.result;

    // Update temp modal preview
    setTempProfile((prev) => ({ ...prev, avatar: b64 }));

    // Update actual active profile
    const updated = { ...userProfile, avatar: b64 };
    setUserProfile(updated);
    localStorage.setItem("cftri_user_profile", JSON.stringify(updated));

    setAvatarUploadSuccess(true);
    showToast("Photo updated successfully!", "success");
  };

  reader.onerror = () => showToast("Failed to read file.", "error");

  reader.readAsDataURL(f);
};

  // save edits to localStorage and userProfile
  const saveProfileEdits = () => {
  if (!tempProfile.name || !tempProfile.email) {
    showToast("Please provide name and email.", "error");
    return;
  }

  const updated = {
    ...userProfile,
    name: tempProfile.name,
    email: tempProfile.email,
    phone: tempProfile.phone,
    address: tempProfile.address,
    nationality: tempProfile.nationality,
    avatar: tempProfile.avatar,   // 🔥 important
    lastLogin: new Date().toLocaleString(),
  };

  setUserProfile(updated);
  localStorage.setItem("cftri_user_profile", JSON.stringify(updated));

  showToast("Profile saved successfully.", "success");
  setProfileEditOpen(false);
};

  // quick remove avatar
 const removeAvatar = () => {
  setTempProfile((prev) => ({ ...prev, avatar: "" }));

  const updated = { ...userProfile, avatar: "" };
  setUserProfile(updated);
  localStorage.setItem("cftri_user_profile", JSON.stringify(updated));

  setAvatarFileName("");
  setAvatarUploadSuccess(false);

  showToast("Photo removed.", "success");
};
const markPaymentDone = (index) => {
  const updated = [...applications];
  updated[index].payment = "Completed";
  setApplications(updated);
  localStorage.setItem("cftri_applications", JSON.stringify(updated));
  showToast("Payment completed successfully!", "success");
};

  /* ============================================================
      JSX START
  ============================================================= */
  return (
    <>


    {/* ================= SPLASH SCREEN ================= */}
{showSplash && (
  <SplashScreen onFinish={() => setShowSplash(false)} />
)}


      <ToastContainer toasts={toasts} />

     {/* ================= NAVBAR (COMPONENT) ================= */}
<Navbar
  userProfile={userProfile}
  navOpen={navOpen}
  setNavOpen={setNavOpen}
  openLogin={openLogin}
  openRegister={openRegister}
  handleLogout={handleLogout}
/>

<CampusSlideshow />


    <HeroSection userProfile={userProfile} />
<UpcomingTrainings
  upcomingTrainings={upcomingTrainings}
  fullSchedule={fullSchedule}
  th={th}
  td={td}
  userProfile={userProfile}
  openLogin={openLogin}
  openRegister={openRegister}
  openProfileEdit={openProfileEdit}
  handleAvatarChange={handleAvatarChange}
  avatarFileName={avatarFileName}
/>

      <section id="about-section" className="section-shell fade">
 
  <h2 className="section-heading">About CSIR–CFTRI</h2>

  <div className="about-wrap">

    {/* LEFT IMAGE */}
    <div className="about-visual">
      <img
        src="/images/cftri-about-us1.jpg"
        alt="CSIR–CFTRI Campus"
      />
      <div className="about-badge">Established • 1950</div>
    </div>

    {/* RIGHT CONTENT */}
    <div className="about-content">

      <p className="text-sm text-gray-700" style={{ lineHeight: "1.8" }}>
        CSIR–Central Food Technological Research Institute (CFTRI), Mysore, a
        constituent laboratory of the Council of Scientific and Industrial
        Research (CSIR), under the Department of Science & Technology,
        Government of India, is a globally acclaimed R&amp;D organization in
        the area of food science and technology with innovative and sustainable
        solutions for national development. The institute came into existence
        in the year 1950.
      </p>

      {/* STATS */}
      <div className="about-stats">
        <div className="about-stat">
          <strong>1950</strong>
          <span>Year Established</span>
        </div>
        <div className="about-stat">
          <strong>Govt. of India</strong>
          <span>CSIR Laboratory</span>
        </div>
        <div className="about-stat">
          <strong>Global</strong>
          <span>R&amp;D Recognition</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-green-900 mb-2">
        Mission of CSIR Integrated Skill Initiative
      </h3>

      <p className="text-sm text-gray-700" style={{ lineHeight: "1.8" }}>
        Generate quality human resources with enhanced employability and
        entrepreneurial skills through diversified skill-oriented training
        programs for the food processing sector.
      </p>

      <h3 className="text-lg font-semibold text-green-900 mt-3 mb-2">
        Objectives
      </h3>

      <div className="objectives-grid">
        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Create a certified talent pool for national manpower needs
          </div>
        </div>

        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Utilize CSIR knowledgebase and infrastructure for skill mission
          </div>
        </div>

        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Implement special up-skilling and training programs
          </div>
        </div>

        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Align with NSDC and Sector Skill Councils
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<CoursesSection
  courses={courses}
  userProfile={userProfile}
  handleApplyClick={handleApplyClick}
  getApplyButtonLabel={getApplyButtonLabel}
/>




                
     <ApplyModal
  applyOpen={applyOpen}
  selectedCourse={selectedCourse}
  applyForm={applyForm}
  updateApplyForm={updateApplyForm}
  submitApplication={submitApplication}
  setApplyOpen={setApplyOpen}
/>

                <AuthModal
  authOpen={authOpen}
  authMode={authMode}
  setAuthMode={setAuthMode}
  setAuthOpen={setAuthOpen}
  loginEmail={loginEmail}
  setLoginEmail={setLoginEmail}
  loginPassword={loginPassword}
  setLoginPassword={setLoginPassword}
  fullName={fullName}
  setFullName={setFullName}
  regEmail={regEmail}
  setRegEmail={setRegEmail}
  regPassword={regPassword}
  setRegPassword={setRegPassword}
  confirmPassword={confirmPassword}
  setConfirmPassword={setConfirmPassword}
  address={address}
  setAddress={setAddress}
  phone={phone}
  setPhone={setPhone}
  nationality={nationality}
  setNationality={setNationality}
  handleLogin={handleLogin}
  handleRegister={handleRegister}
/>

      <ProfileEditModal
  profileEditOpen={profileEditOpen}
  setProfileEditOpen={setProfileEditOpen}
  tempProfile={tempProfile}
  setTempProfile={setTempProfile}
  avatarUploadSuccess={avatarUploadSuccess}
  handleAvatarChange={handleAvatarChange}
  removeAvatar={removeAvatar}
  saveProfileEdits={saveProfileEdits}
/>

<ContactPanel
  contactOpen={contactOpen}
  setContactOpen={setContactOpen}
/>

<Footer />

      {/* ================= SCROLL TOP ================= */}
      {showTopBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </>
  );
}  // <-- FINAL CLOSING BRACE (VERY IMPORTANT)