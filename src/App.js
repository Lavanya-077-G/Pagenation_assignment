import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [apiData, setapiData] = useState([]);
  const [pageData, setpageData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setpageData(data.slice(0, 10));
        setapiData(data);
      });
  }, []);

  const totalPages = Math.ceil(apiData.length / 10);
  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <button key={page} onClick={() => onPageChange(page)}>
        {page}
      </button>
    );
  }

  const onPageChange = (pageNum) => {
    const startIndex = (pageNum - 1) * 10;
    const endIndex = startIndex + 10;
    setpageData(apiData.slice(startIndex, endIndex));
  };

  return (
    <>
      {pageData.map((obj, index) => {
        return (
          <div key={index}>
            <span>{obj.id} .</span>
            {obj.name}
          </div>
        );
      })}
      <div className="App">{pages}</div>
    </>
  );
}
