import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import {
  getAllDeploys,
  getDeployById,
  createDeploy,
  updateDeploy,
  deleteDeploy,
  type DeployDemo,
} from "../services/deployService";

function Demo() {
  const { instance } = useMsal();
  const [data, setData] = useState<DeployDemo[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ✅ Load data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllDeploys();
      setData(res);
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ CRUD
  const fetchById = async () => {
    if (!searchId) return;
    try {
      const res = await getDeployById(searchId);
      setData([res]);
    } catch {
      setError("Record not found");
    }
  };

  const addData = async () => {
    if (!name.trim()) return;
    await createDeploy(name);
    setName("");
    fetchData();
  };

  const updateData = async () => {
    if (!name.trim() || editId === null) return;
    await updateDeploy(editId, name);
    setEditId(null);
    setName("");
    fetchData();
  };

  const deleteDataHandler = async (id: number) => {
    await deleteDeploy(id);
    fetchData();
  };

  const startEdit = (item: DeployDemo) => {
    setEditId(item.id);
    setName(item.name);
  };

  const handleLogout = async () => {
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  const panel: React.CSSProperties = {
    flex: 1,
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const tableCard: React.CSSProperties = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const input: React.CSSProperties = {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const btn = (bg: string): React.CSSProperties => ({
    padding: "8px 14px",
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  });

  const btnSmall = (bg: string): React.CSSProperties => ({
    padding: "6px 10px",
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
  });

  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "10px",
  };

  const td: React.CSSProperties = {
    padding: "10px",
    borderTop: "1px solid #eee",
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "20px 40px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Deploy Dashboard</h2>

        <button onClick={handleLogout} style={btn("#e74c3c")}>
          Logout
        </button>
      </div>

      {/* Top Controls Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Add / Update */}
        <div style={panel}>
          <h4>{editId ? "Update" : "Add"}</h4>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={input}
            />

            <button
              onClick={editId ? updateData : addData}
              style={btn(editId ? "#3498db" : "#2ecc71")}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={panel}>
          <h4>Search</h4>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              placeholder="Enter ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={input}
            />

            <button onClick={fetchById} style={btn("#9b59b6")}>
              Search
            </button>

            <button onClick={fetchData} style={btn("#7f8c8d")}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Table Section */}
      <div style={tableCard}>
        <h3 style={{ marginBottom: "10px" }}>Records</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#ecf0f1" }}>
              <th style={th}>ID</th>
              <th style={th}>Name</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.id}</td>
                <td style={td}>{item.name}</td>
                <td style={td}>
                  <button
                    onClick={() => startEdit(item)}
                    style={btnSmall("#f39c12")}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteDataHandler(item.id)}
                    style={{ ...btnSmall("#e74c3c"), marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Demo;