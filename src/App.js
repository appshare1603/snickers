import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  People,
  Assessment
} from '@mui/icons-material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './App.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'User Growth',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: '#4caf50',
      tension: 0.1,
    },
  ],
};

const doughnutData = {
  labels: ['Vegetables', 'Fruits', 'Grains', 'Proteins'],
  datasets: [
    {
      data: [300, 250, 200, 150],
      backgroundColor: [
        '#4caf50',
        '#2196f3',
        '#ff9800',
        '#f44336',
      ],
    },
  ],
};

function StatCard({ title, value, icon }) {
  return (
    <Card className="card">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {icon}
          <Box textAlign="right">
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="lg" className="dashboard">
          <Typography variant="h4" gutterBottom>
            Vegan Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Users"
                value="1,234"
                icon={<People fontSize="large" color="primary" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Growth"
                value="+15%"
                icon={<TrendingUp fontSize="large" color="secondary" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Activities"
                value="892"
                icon={<Timeline fontSize="large" color="primary" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Reports"
                value="56"
                icon={<Assessment fontSize="large" color="secondary" />}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  User Growth Over Time
                </Typography>
                <div className="chart-container">
                  <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Food Categories
                </Typography>
                <div className="chart-container">
                  <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
