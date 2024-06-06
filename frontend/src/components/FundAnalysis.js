import React, { useState, useEffect } from "react";
import axios from "axios";

const FundAnalysis = ({ symbol }) => {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/analyze/${symbol}`)
      .then((response) => {
        setAnalysis(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the analysis data!", error);
      });
  }, [symbol]);

  return (
    <div>
      <h2>Fund Analysis</h2>
      {analysis && <div>{/* 显示分析结果 */}</div>}
    </div>
  );
};

export default FundAnalysis;
