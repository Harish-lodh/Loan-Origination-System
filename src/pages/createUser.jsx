// src/pages/SuperadminCreateUser.jsx
import { useState } from "react";
import { createUser } from "../api/api"; // Assumes this returns response.data

const ROLE_OPTIONS = ["SuperAdmin", "Admin", "Manager", "Agent", "User"]; // Title Case as requested

export default function CreateUser() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "User", // Default to "User"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() })); // Trim to avoid accidental spaces
  };

  const validateForm = () => {
    if (!form.full_name.trim()) return "Full name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email format";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!ROLE_OPTIONS.includes(form.role)) return "Invalid role selected";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Sends body: { full_name, email, password, role }
      console.log(form)
      const data = await createUser(form);
      setSuccess(`User created: ${data.email || form.email} ${data.id ? `(ID: ${data.id})` : ""}`);
      setForm({ full_name: "", email: "", password: "", role: "User" });
    } catch (err) {
      const raw = err?.response?.data;
      const messages = Array.isArray(raw?.message) ? raw.message.join("\n") : raw?.message || err.message || "Failed to create user";
      setError(messages);
      console.error("Error creating user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create User (SuperAdmin)</h1>

      {error && (
        <pre
          className="mb-3 text-red-600 text-sm whitespace-pre-wrap"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </pre>
      )}
      {success && (
        <div
          className="mb-3 text-green-600 text-sm"
          role="status"
          aria-live="polite"
        >
          {success}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col">
          <label htmlFor="full_name" className="text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={onChange}
            placeholder="Enter full name"
            className="border rounded p-2 w-full"
            required
            aria-required="true"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter email"
            className="border rounded p-2 w-full"
            required
            aria-required="true"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter password (min 6 chars)"
            className="border rounded p-2 w-full"
            required
            minLength={6}
            aria-required="true"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="role" className="text-sm font-medium mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={onChange}
            className="border rounded p-2"
            aria-required="true"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-60"
          aria-busy={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}