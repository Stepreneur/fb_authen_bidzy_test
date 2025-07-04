import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Example: Fetch additional data from Facebook API using the access token
    let facebookData = null;
    
    if (session.accessToken) {
      try {
        // Fetch user's Facebook profile data
        const fbResponse = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture,link&access_token=${session.accessToken}`
        );
        
        if (fbResponse.ok) {
          facebookData = await fbResponse.json();
        }
      } catch (error) {
        console.error("Error fetching Facebook data:", error);
      }
    }

    // You can also fetch data from your database here
    const userProfile = {
      id: session.facebookId || session.user.id || session.user.email,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      provider: session.provider || "facebook",
      facebookId: session.facebookId,
      loginTime: new Date().toISOString(),
      facebookData: facebookData,
      // Add any additional user data you want to fetch
      preferences: {
        theme: "light",
        notifications: true,
      },
      stats: {
        loginCount: 1,
        lastActive: new Date().toISOString(),
      }
    };

    return new Response(JSON.stringify(userProfile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in profile API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 