import React, { useState } from "react";

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error === "") {
      alert("Email submitted: " + email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="you@example.com"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default EmailInput;
