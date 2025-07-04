"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user data after successful login
  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Example: Fetch additional user data from your API
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {session.user.name}!
        </h2>
        <p className="text-gray-600">{session.user.email}</p>
      </div>

      {session.user.image && (
        <div className="text-center mb-6">
          <img
            src={session.user.image}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500"
          />
        </div>
      )}

      {/* Display fetched user data */}
      {loading && (
        <div className="text-center p-4">
          <p className="text-blue-600">Fetching your data...</p>
        </div>
      )}

      {userData && (
        <div className="space-y-4">
          {/* Facebook Profile Link */}
          {userData.facebookData?.link && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Facebook Profile:</h3>
              <a 
                href={userData.facebookData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {userData.facebookData.link}
              </a>
            </div>
          )}

          {/* Full Profile Data */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Your Profile Data:</h3>
            <pre className="text-sm text-gray-600 overflow-auto max-h-40">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Facebook specific data */}
      {session.provider === "facebook" && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-blue-800 mb-2">Facebook Info:</h3>
          <p className="text-sm text-blue-700">
            Provider: {session.provider}
          </p>
          {session.accessToken && (
            <p className="text-sm text-blue-700 mt-1">
              Access Token: {session.accessToken.substring(0, 20)}...
            </p>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={fetchUserData}
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Refresh Data"}
        </button>
        <button
          onClick={() => signOut()}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 