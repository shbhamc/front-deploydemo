import { useState } from "react";
import { logins } from "../services/axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {
            await logins({
                username: username,
                password: password
            });

            // Navigate after successful login
            navigate("/demo");

        } catch (error) {
            console.log(error);
        }
    };
    const label: React.CSSProperties = {
        fontSize: "14px",
        color: "#555",
    };

    const input: React.CSSProperties = {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    };

    const btn: React.CSSProperties = {
        width: "100%",
        padding: "10px",
        background: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
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
                    <h2 style={{ marginBottom: "25px" }}>Login</h2>

                    {/* Username */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={label}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                            style={input}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={input}
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={login}
                        style={btn}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;