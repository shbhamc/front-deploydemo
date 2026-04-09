import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { loginRequest } from "../msalConfig";

function Login() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const signIn = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("MSAL login failed", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/demo" replace />;
  }

  const btn: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    background: "#0078d4",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

    return (
        <div
            style={{
                height: "90vh",
                display: "flex",
                fontFamily: "Segoe UI, sans-serif",
            }}
        >
            {/* LEFT SIDE (Branding / Visual) */}
            <div
                style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #2c3e50, #3498db)",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "60px",
                }}
            >
                <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
                    Deploy System
                </h1>
                <p style={{ fontSize: "18px", opacity: 0.9 }}>
                    Manage your deployments efficiently with a clean and powerful dashboard.
                </p>
            </div>

            {/* RIGHT SIDE (Login Form) */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f4f6f8",
                }}
            >
                <div
                    style={{
                        width: "350px",
                        background: "#fff",
                        padding: "40px",
                        borderRadius: "10px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2 style={{ marginBottom: "25px" }}>Azure Entra ID Login</h2>

                    <p style={{ marginBottom: "30px", color: "#444" }}>
                        Click the button below and sign in with your Entra ID account.
                    </p>

                    <button onClick={signIn} style={btn}>
                        Sign in with Entra ID
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;