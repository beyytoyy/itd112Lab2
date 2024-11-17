import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import DistributionNat from "./DonutChart.js";  // Import the DistributionNat component
import ComparisonNat from "./Histogram.js"; // Import the ComparisonNat component
import RelationshipNat from "./DensityPlot.js"; // Import the RelationshipNat component
import BarChartComponents from "./DoughnutChart.js";
import ViolinPlot from "./violinPlot.js";

const COLORS = ["#1ABC9C", "#16A085", "#2C3E50"];

function Dashboard() {
const [NATData, setNATData] = useState([]);
  
useEffect(() => {
  const fetchData = async () => {
    const NATCollection = collection(db, "NATData");
    const NATSnapshot = await getDocs(NATCollection);
    const dataList = NATSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNATData(dataList);
  };

  fetchData();
}, []);

const totalRecords = NATData.length;
  const averageNATScore =
    NATData.length > 0
      ? NATData.reduce((acc, item) => acc + item.natResults, 0) / NATData.length
      : 0;

  const maxNATScore = Math.max(...NATData.map((item) => item.natResults), 0);
  const minNATScore = Math.min(...NATData.map((item) => item.natResults));


  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        width: "calc(100vw - 300px)",
        minHeight: "100vh",
        backgroundColor: "#F5FAFA",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          marginTop: "-20px",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#0A3A4A",
        }}
      >
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} style={{ marginBottom: "30px", width: '100%'}}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              backgroundColor: "#0A3A4A",
              padding: "10px 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "white" }}
              >
                Total Records
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {totalRecords}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              backgroundColor: "#0A3A4A",
              padding: "10px 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "white" }}
              >
                Average NAT Score
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {averageNATScore.toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              backgroundColor: "#0A3A4A",
              padding: "10px 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "white" }}
              >
                Maximum NAT Score
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {maxNATScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            style={{
              backgroundColor: "#0A3A4A",
              padding: "10px 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "white" }}
              >
                Minimum NAT Score
              </Typography>
              <Typography variant="h4" style={{ color: "white" }}>
                {minNATScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} style={{ marginBottom: "30px" }}>
        {/* DistributionNat Chart */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", fontWeight: "bold", color: "#0A3A4A" }}
          >
            Distribution of NAT Results by Socio-Economic Status
          </Typography>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              height: '350px',
              width: '790px'
            }}
          >
            <ComparisonNat data={NATData} />
          </Card>
        </Grid>

        {/* ComparisonNat Chart */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", fontWeight: "bold", color: "#0A3A4A" }}
          >
          </Typography>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              width: '246.562px',
              height: '350px',
              marginLeft: '261px',
              marginTop: '40px'
            }}
          >
            <DistributionNat data={NATData} />
          </Card>
        </Grid>

        {/* RelationshipNat Chart */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", fontWeight: "bold", color: "#0A3A4A" }}
          >
            Academic Performance vs NAT Results
          </Typography>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              height: '400px',
              width: '790px'
            }}
          >
            <RelationshipNat data={NATData}/>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", fontWeight: "bold", color: "#0A3A4A" }}
          >
          </Typography>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              width: '246.562px',
              height: '400px',
              marginLeft: '261px',
              marginTop: '40px'
            }}
          >
            <BarChartComponents data={NATData} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "10px", fontWeight: "bold", color: "#0A3A4A" }}
          >
            Distribution of NAT Results between Gender
          </Typography>
          <Card
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              height: '500px',
              width: '790px'
            }}
          >
            <ViolinPlot 
              data={NATData} 
              style={{ width: '100%', height: '400px' }}
              margin={{ top: 10, right: 10, bottom: 30, left: 40 }}  // Adjust margin as needed
              innerWidth={500}  // Adjust the inner width of the plot
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
