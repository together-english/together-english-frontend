import React, { useState } from "react";

interface EmailInputProps {
  onEmailChange: (email: string, isValid: boolean) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onEmailChange }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;

    if (inputEmail.trim() === "") {
      setEmail(inputEmail);
      setError(""); // 에러 메시지 제거
      onEmailChange(inputEmail, true); // 공백일 경우 유효하다고 처리
      return;
    }

    const isValid = validateEmail(inputEmail);

    setEmail(inputEmail);
    setError(isValid ? "" : "이메일 형식이 잘못되었습니다.");

    onEmailChange(inputEmail, isValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error === "") {
      alert("Email submitted: " + email);
    }
  };

  return (
    <div>
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
  );
};

export default EmailInput;
