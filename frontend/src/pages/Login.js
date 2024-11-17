import { SignIn, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      if (isSignedIn) {
        // Fetch user role from backend
        const token = await user.getToken(); // Mendapatkan token Clerk
        const response = await fetch('/api/getUserRole', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.role === 'Admin') {
          navigate('/countries'); // Arahkan ke halaman CMS jika Admin
        } else {
          navigate('/'); // Arahkan ke halaman home jika User biasa
        }
      }
    };

    checkUserRole();
  }, [isSignedIn, user, navigate]);

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default Login;
