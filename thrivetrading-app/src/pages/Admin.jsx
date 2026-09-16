import React, { useState, useEffect, useCallback } from "react";

const API_BASE = (import.meta.env.VITE_API_URL || "https://thrivetradingllc.onrender.com") + "/api";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [apiOnline, setApiOnline] = useState(false);

  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const [capitalInputs, setCapitalInputs] = useState({
    balance: "",
    profit: "",
    grandTotal: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const usersRes = await fetch(`${API_BASE}/users`);
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        const apiUsers = Array.isArray(usersData) ? usersData : [];
        
        const formattedUsers = apiUsers.map((u) => {
          const initialBal = parseFloat(u.balance || 0);
          const prof = parseFloat(u.profit || 0);
          const calculatedGrandTotal = initialBal + prof;

          return {
            id: u.id,
            name: u.name || "New Trader",
            email: u.email || "",
            balance: initialBal,
            profit: prof,
            grandTotal: calculatedGrandTotal,
            status: u.status || "Pending",
          };
        });

        setUsers(formattedUsers);
        setApiOnline(true);
      } else {
        setApiOnline(false);
      }
    } catch (err) {
      console.error("Failed to connect to backend API:", err);
      setApiOnline(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      fetchData();
      const interval = setInterval(() => {
        if (isMounted) fetchData();
      }, 4000);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }
  }, [isAuthenticated, fetchData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setLoginError("Invalid admin credentials. Use admin@example.com / admin123");
      }
    } catch (err) {
      setLoginError("Server connection failed. Make sure backend is running.");
    }
  };

  const toggleApproval = async (id, currentStatus) => {
    const newStatus = currentStatus === "Approved" ? "Pending" : "Approved";

    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
        );
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    const bal = user.balance.toString();
    const prof = user.profit.toString();
    const total = (user.balance + user.profit).toString();

    setCapitalInputs({
      balance: bal,
      profit: prof,
      grandTotal: total,
    });
  };

  const handleInputChange = (field, value) => {
    const updatedInputs = { ...capitalInputs, [field]: value };
    const bal = parseFloat(field === "balance" ? value : updatedInputs.balance) || 0;
    const prof = parseFloat(field === "profit" ? value : updatedInputs.profit) || 0;

    updatedInputs.grandTotal = (bal + prof).toString();
    setCapitalInputs(updatedInputs);
  };

  const handleSaveCapital = async (id) => {
    const newBalance = parseFloat(capitalInputs.balance) || 0;
    const newProfit = parseFloat(capitalInputs.profit) || 0;
    const newGrandTotal = newBalance + newProfit;

    const payload = {
      balance: newBalance,
      profit: newProfit,
      grandTotal: newGrandTotal,
    };

    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === id
              ? { ...u, balance: newBalance, profit: newProfit, grandTotal: newGrandTotal }
              : u
          )
        );
        setEditingUserId(null);
      }
    } catch (err) {
      console.error("Error saving user capital figures:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "4rem 2rem", maxWidth: "420px", margin: "0 auto", color: "#f8fafc" }}>
        <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#38bdf8", marginBottom: "0.5rem", textAlign: "center" }}>
            Admin Control Portal
          </h2>
          {loginError && (
            <div style={{ background: "#7f1d1d", color: "#fca5a5", padding: "0.75rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{ width: "100%", padding: "0.6rem", background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
                required
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                style={{ width: "100%", padding: "0.6rem", background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
                required
              />
            </div>
            <button
              type="submit"
              style={{ padding: "0.75rem", background: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginTop: "0.5rem" }}
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", color: "#f8fafc", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.75rem", color: "#38bdf8", margin: 0 }}>
            Capital & Account Management
          </h2>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem" }}>
            Adjust balances, profit figures, and user approval statuses directly in PostgreSQL.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.8rem",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              background: apiOnline ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              color: apiOnline ? "#34d399" : "#f87171",
              border: `1px solid ${apiOnline ? "#10b981" : "#ef4444"}`,
            }}
          >
            {apiOnline ? "● API Live" : "● API Disconnected"}
          </span>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{ padding: "0.5rem 1rem", background: "#334155", color: "#f8fafc", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ background: "#334155", textAlign: "left" }}>
              <th style={{ padding: "0.75rem 1rem" }}>User</th>
              <th style={{ padding: "0.75rem 1rem" }}>Balance ($)</th>
              <th style={{ padding: "0.75rem 1rem" }}>Profit ($)</th>
              <th style={{ padding: "0.75rem 1rem" }}>Grand Total ($)</th>
              <th style={{ padding: "0.75rem 1rem" }}>Status</th>
              <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "1.5rem", textAlign: "center", color: "#94a3b8" }}>
                  No registered accounts found in the database.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ fontWeight: "bold" }}>{u.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{u.email}</div>
                  </td>

                  <td style={{ padding: "0.75rem 1rem" }}>
                    {editingUserId === u.id ? (
                      <input
                        type="number"
                        value={capitalInputs.balance}
                        onChange={(e) => handleInputChange("balance", e.target.value)}
                        style={{ width: "80px", padding: "0.3rem", borderRadius: "4px", border: "1px solid #38bdf8", background: "#0f172a", color: "#fff" }}
                      />
                    ) : (
                      <span>${u.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 1rem" }}>
                    {editingUserId === u.id ? (
                      <input
                        type="number"
                        value={capitalInputs.profit}
                        onChange={(e) => handleInputChange("profit", e.target.value)}
                        style={{ width: "80px", padding: "0.3rem", borderRadius: "4px", border: "1px solid #38bdf8", background: "#0f172a", color: "#fff" }}
                      />
                    ) : (
                      <span style={{ color: u.profit >= 0 ? "#34d399" : "#f87171" }}>
                        {u.profit >= 0 ? "+" : ""}${u.profit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 1rem", fontWeight: "bold" }}>
                    {editingUserId === u.id ? (
                      <input
                        type="number"
                        value={capitalInputs.grandTotal}
                        readOnly
                        style={{ width: "85px", padding: "0.3rem", borderRadius: "4px", border: "1px solid #334155", background: "#1e293b", color: "#10b981" }}
                      />
                    ) : (
                      <span>${u.grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        background: u.status === "Approved" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                        color: u.status === "Approved" ? "#34d399" : "#fbbf24",
                      }}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                    {editingUserId === u.id ? (
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => handleSaveCapital(u.id)}
                          style={{ padding: "0.35rem 0.65rem", background: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          style={{ padding: "0.35rem 0.5rem", background: "#475569", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => startEditing(u)}
                          style={{ padding: "0.35rem 0.65rem", background: "transparent", border: "1px solid #38bdf8", color: "#38bdf8", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleApproval(u.id, u.status)}
                          style={{
                            padding: "0.35rem 0.65rem",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            background: u.status === "Approved" ? "#ef4444" : "#10b981",
                            color: "#fff",
                          }}
                        >
                          {u.status === "Approved" ? "Revoke" : "Approve"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}