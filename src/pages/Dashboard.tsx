import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";

import { useEffect, useState } from "react";
import {
  getMonthlySummary,
  getCategoryExpense,
  getBudgetVsActual,
} from "../api/dashboardApi";

import type {
  MonthlySummary,
  CategoryExpense,
  BudgetVsActual,
} from "../types/dashboard";

import { CategoryExpenseChart } from "../components/dashboard/CategoryExpenseChart";
import BudgetVsActualChart from "../components/dashboard/BudgetVsActualChart";

const drawerWidth = 220;

const Dashboard = () => {
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryExpense[]>([]);
  const [budgetData, setBudgetData] = useState<BudgetVsActual[]>([]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    getMonthlySummary(year, month).then(setSummary);
    getCategoryExpense(year, month).then(setCategoryData);
    getBudgetVsActual(year, month).then(setBudgetData);
  }, [year, month]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 🔝 Top Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Finance Tracker
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 📚 Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* 📊 Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {/* 🔢 Summary Cards */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Paper sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Income</Typography>
                <Typography variant="h5">
                  ₹{summary?.totalIncome ?? 0}
                </Typography>
              </CardContent>
            </Card>
          </Paper>

          <Paper sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Expense</Typography>
                <Typography variant="h5">
                  ₹{summary?.totalExpense ?? 0}
                </Typography>
              </CardContent>
            </Card>
          </Paper>

          <Paper sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Net</Typography>
                <Typography
                  variant="h5"
                  color={(summary?.net ?? 0) >= 0 ? "green" : "error"}
                >
                  ₹{summary?.net ?? 0}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Stack>

        {/* 📈 Charts */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mt: 4 }}
        >
          <Paper sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Category-wise Expense
                </Typography>
                <CategoryExpenseChart data={categoryData} />
              </CardContent>
            </Card>
          </Paper>

          <Paper sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Budget vs Actual
                </Typography>
                <BudgetVsActualChart data={budgetData} />
              </CardContent>
            </Card>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
