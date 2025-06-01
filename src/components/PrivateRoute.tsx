import { useAuth } from './auth/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { JSX, useEffect, useRef } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated && !hasShownToast.current) {
      hasShownToast.current = true;
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "You do not have permission to view this page.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    }
  }, [authLoading, isAuthenticated]);

  // 🔒 Don't render route content or redirect until loading is done
  if (authLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


export default PrivateRoute;
