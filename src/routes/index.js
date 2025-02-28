import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Layout from '../Layout';
import ResolvedQuery from '../pages/ResolvedQuery';
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Users from '../pages/Users';
import Admins from '../pages/Admins';
import Subscriptions from '../pages/Subscriptions';
import Compliance from '../pages/Compliance';
import EngagementMetrics from '../pages/EngagementMetrics';
import OperationalMetrics from '../pages/OperationalMetrics';
import FinancialOverview from '../pages/FinancialOverview';
import SupportQueries from '../pages/SupportQueries';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="subscriptions" element={<Subscriptions/>} />
          <Route path="engagement-metrics" element={<EngagementMetrics/>} />
          <Route path="operational-metrics" element={<OperationalMetrics/>} />
          <Route path="compliance-security" element={<Compliance/>} />
          <Route path="users" element={<Users/>} />
          <Route path="admins" element={<Admins/>} />
          <Route path="support-queries" element={<SupportQueries/> } />
          <Route path="/resolved-query/:complaintId" element={<ResolvedQuery />} />
          <Route path="financial-overview" element={<FinancialOverview/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
