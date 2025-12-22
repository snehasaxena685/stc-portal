import { useEffect, useState } from "react";
import { getApplications } from "../../services/adminApi";
import { Link } from "react-router-dom";

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApplications().then(setApps);
  }, []);

  return (
    <>
      <h1>Applications</h1>
      {apps.map(a => (
        <div key={a._id}>
          {a.fullName} - {a.courseTitle}
          <Link to={`/admin/applications/${a._id}`}>View</Link>
        </div>
      ))}
    </>
  );
}
