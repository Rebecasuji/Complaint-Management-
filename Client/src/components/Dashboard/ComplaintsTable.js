import React from "react";

const ComplaintsTable = () => {
  const complaints = [
    {
      id: "cpm02",
      user: "Test Subject One",
      subject: "Management",
      issued: "Dec. 15, 2022",
      status: "Pending",
    },
    {
      id: "cpm010",
      user: "Subject Six",
      subject: "Other",
      issued: "Dec. 15, 2022",
      status: "Pending",
    },
    // Add more complaints as needed
  ];

  return (
    <div className="complaints-table">
      <h3>Complaints Table</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Subject</th>
            <th>Issued</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.user}</td>
              <td>{complaint.subject}</td>
              <td>{complaint.issued}</td>
              <td>
                <span
                  className={`status ${
                    complaint.status === "Pending" ? "pending" : "solved"
                  }`}
                >
                  {complaint.status}
                </span>
              </td>
              <td>
                <button className="details-btn">Details</button>
                <button className="submit-btn">Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
