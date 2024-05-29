import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users/${page}/next`
      );
      const response = await data.json();
      setUsers(response.users.slice(0, 10));
    };
    fetchData();
    return;
  }, [page]);
  const handlePageChange = (event) => {
    const { name } = event.target;
    name === "prev"
      ? setPage((prevState) => setPage(prevState - 10))
      : setPage((prevState) => setPage(prevState + 10));
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>JobTitle</th>
            <th>EmailAddress</th>
            <th>FirstNameLastName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data) => (
            <tr key={data.id}>
              <td>{data.JobTitle}</td>
              <td>{data.EmailAddress}</td>
              <td>{data.FirstNameLastName}</td>
              <td>{data.Email}</td>
              <td>{data.Phone}</td>
              <td>{data.Company}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginationwrapper">
        <button
          name="prev"
          onClick={handlePageChange}
          disabled={page === 0 ? true : false}
        >
          Prev
        </button>
        <button name="next" onClick={handlePageChange}>
          Next
        </button>
      </div>
    </>
  );
}

export default App;
