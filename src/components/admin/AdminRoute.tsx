import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import AdminDashboard from './AdminDashboard';
import { PropertyData } from '../../App';

interface AdminRouteProps {
  propertyData: PropertyData;
  updatePropertyData: (data: PropertyData, shouldSave?: boolean) => void;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ propertyData, updatePropertyData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <AdminDashboard 
          propertyData={propertyData} 
          updatePropertyData={updatePropertyData}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default AdminRoute;