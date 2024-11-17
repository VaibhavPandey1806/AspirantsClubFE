// src/constants.js
// export const BASE_URL = 'http://localhost:8081/api';
// export const BASE_URL = 'http://192.168.31.38:8081/api';
export const BASE_URL = 'https://aspirantsclub-production.up.railway.app/api';
// useEffect(() => {
  //   // Function to check login status
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8081/public/isLogin', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include', // Include credentials like cookies if required
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         if (!data) {
  //           navigate('/Login'); // Redirect to Login if not logged in
  //         }
  //       } else {
  //         console.error('Failed to verify login status:', response.statusText);
  //         navigate('/Login'); // Redirect to Login on API failure
  //       }
  //     } catch (error) {
  //       console.error('Error occurred while checking login status:', error);
  //       navigate('/Login'); // Redirect to Login on error
  //     }
  //   };

  //   checkLoginStatus(); // Call the function on component mount
  // }, [navigate]);