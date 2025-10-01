import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

const AdminLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="card-glass p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Access your admin dashboard
          </p>
        </div>

        <form
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <div className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-full py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold mt-6"
          >
            Sign In
          </button>
        </form>

        {error && (
          <div className="alert-error mt-6">
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminLogin;
