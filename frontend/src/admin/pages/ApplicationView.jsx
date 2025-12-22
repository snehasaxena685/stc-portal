import { useParams } from "react-router-dom";

export default function ApplicationView() {
  const { id } = useParams();

  return (
    <div>
      <h1>Application Details</h1>
      <p>Application ID: {id}</p>
    </div>
  );
}
