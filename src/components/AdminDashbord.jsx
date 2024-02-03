import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import "./AdminDashboard.css";
import image1 from "../assets/stats2.webp";
import image2 from "../assets/stats3.webp";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const URL = "http://localhost:8080/";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [election, setElection] = useState({});

  const navigate = useNavigate();
  function updateChart(data) {
    //   //Remove existing chart if any
    //   d3.select("svg").remove();

    // // Set up the dimensions of the chart
    // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    // const width = 600 - margin.left - margin.right;
    // const height = 400 - margin.top - margin.bottom;

    // // Create SVG element
    // const svg = d3.select("#chart")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // // Set up scales
    // const x = d3.scaleBand()
    //     .domain(data.map(d => d.PartyName))
    //     .range([0, width])
    //     .padding(0.1);

    // const y = d3.scaleLinear()
    //     .domain([0, d3.max(data, d => d.Count)])
    //     .nice()
    //     .range([height, 0]);

    // // Draw bars
    // svg.selectAll(".bar")
    //     .data(data)
    //     .enter().append("rect")
    //     .attr("class", "bar")
    //     .attr("x", d => x(d.PartyName))
    //     .attr("y", d => y(d.Count))
    //     .attr("width", x.bandwidth())
    //     .attr("height", d => height - y(d.Count));

    // // Draw x-axis
    // svg.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x));

    // // Draw y-axis
    // svg.append("g")
    //     .call(d3.axisLeft(y));

    // Remove existing chart if any
    d3.select("svg").remove();

    // Set up dimensions of the chart
    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create SVG element
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Set up pie generator
    const pie = d3
      .pie()
      .value((d) => d.voteCount)
      .sort(null);

    // Set up arc generator
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    // Color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Generate arcs for each data entry
    const arcs = pie(data);

    // Draw slices
    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.name))
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(-80,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width / 2 - 18)
      .attr("y", -height / 2 + 9)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d) => colorScale(d.name));

    legend
      .append("text")
      .attr("x", width / 2 - 24)
      .attr("y", -height / 2 + 18)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .style("fill", "black")
      .text((d) => d.name);
  }
  const fetchData = async () => {
    const res = await fetch(URL + "data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    console.log(data);
    updateChart(data);
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Route to InitialForm.jsx
      }
      const voter = await fetch(URL + "voter/getVoterByToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const voterData = await voter.json();

      if (!voterData.isAdmin) {
        navigate("/main");
      }
    })();

    (async () => {
      const election = await fetch(URL + "election", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const electionData = await election.json();
      setElection(electionData);
      console.log(setElection);
    })();

    const interval = setInterval(() => {
      console.log("Here");
      fetchData()
        .then((e) => e)
        .catch((err) => console.error(err));
    }, 5000);

    setIsLoading(true);
    return () => clearInterval(interval);
  }, []);

  const handleCreateElection = () => {
    navigate("/auth-form"); // Navigate to AuthForm.jsx
  };
  setInterval(() => {
    fetchData()
      .then((e) => e)
      .catch((err) => console.error(err));
  }, 10000);
  return (
    <>
      {isLoading ? (
        <>
          <NavBar />
          <div className="create-election-container">
            {election._id !== undefined ? (
              <h1>Election already created</h1>
            ) : (
              <button
                className="create-election-button"
                onClick={handleCreateElection}
              >
                CREATE ELECTION
              </button>
            )}
          </div>
          <div className="admin-dashboard">
            {!election._id ? (
              <>
                <div className="analytics-container">
                  <img
                    src={image2}
                    alt="Previous Election"
                    className="election-image"
                  />
                </div>
                <div className="analytics-container">
                  <img
                    src={image2}
                    alt="Previous Election"
                    className="election-image"
                  />
                </div>
              </>
            ) : (
              <div id="chart"></div>
            )}
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default AdminDashboard;
