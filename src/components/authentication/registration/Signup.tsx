import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUpMutation } from "@/redux/api/api"; // Import your mutation hook

const Reg: React.FC = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // Role is set to user by default
    address: "",
  });

  // Local state to handle error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hook for signing up a user
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMessage(null); // Reset error message before submission
      await signUp({ user: formData }).unwrap(); // Send form data to backend
      alert("User registered successfully!");
    } catch (err: any) {
      // Check the error response and display appropriate error message
      if (err?.data?.message) {
        setErrorMessage(err.data.message);
      } else if (err?.error) {
        setErrorMessage(err.error);
      } else {
        setErrorMessage("Failed to register user. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white pt-6 min-lg:h-[900px] shadow-xl lg:w-[800px] sm:w-[500px] md:w-[700px] mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="divider"></div>
        <div className="space-y-6 w-full flex flex-col items-center">
          <h1 className="text-2xl font-medium" style={{ color: "#4F5C6E" }}>
            Create an Account to Escrow.com
          </h1>

          {/* Name Input */}
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="space-y-2 w-full">
              <h1 className="text-sm">
                PLEASE ENTER YOUR NAME
                <span style={{ color: "red" }}>* </span>
              </h1>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ border: "1px solid #A4B0B1", borderRadius: "4px" }}
                type="text"
                placeholder="Your name"
                className="hover:border-sky-700 input-bordered h-9 w-full"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="space-y-2 w-full">
              <h1 className="text-sm">
                PLEASE ENTER YOUR EMAIL ADDRESS
                <span style={{ color: "red" }}>* </span>
              </h1>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ border: "1px solid #A4B0B1", borderRadius: "4px" }}
                type="email"
                placeholder="Your email"
                className="hover:border-sky-700 input-bordered h-9 w-full"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="space-y-2 w-full">
              <h1 className="text-sm">
                PLEASE ENTER YOUR PASSWORD
                <span style={{ color: "red" }}>* </span>
              </h1>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ border: "1px solid #A4B0B1", borderRadius: "4px" }}
                type="password"
                placeholder="Your password"
                className="hover:border-sky-500 input-bordered h-9 w-full"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="space-y-2 w-full">
              <h1 className="text-sm">
                PLEASE ENTER YOUR PHONE NUMBER
                <span style={{ color: "red" }}>* </span>
              </h1>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ border: "1px solid #A4B0B1", borderRadius: "4px" }}
                type="tel"
                placeholder="Your phone number"
                className="hover:border-sky-500 input-bordered h-9 w-full"
              />
            </div>
          </div>

          {/* Address Input */}
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="space-y-2 w-full">
              <h1 className="text-sm">
                PLEASE ENTER YOUR ADDRESS
                <span style={{ color: "red" }}>* </span>
              </h1>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{ border: "1px solid #A4B0B1", borderRadius: "4px" }}
                type="text"
                placeholder="Your address"
                className="hover:border-sky-500 input-bordered h-9 w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full lg:w-[500px] flex flex-col items-center">
            <div className="relative w-full">
              <input
                type="submit"
                value={isLoading ? "Signing Up..." : "Sign Up"}
                disabled={isLoading}
                className="input hover:bg-sky-500 h-9 font-semibold text-white w-full pl-10"
                style={{
                  backgroundColor: "#3CB95D",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 w-full lg:w-[500px] text-center">
              {errorMessage}
            </p>
          )}

          {/* Success Message */}
          {isSuccess && (
            <p className="text-green-600 w-full lg:w-[500px] text-center">
              User registered successfully!
            </p>
          )}

          {/* Link to Login */}
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full text-center">
              <Link
                className="text-xs font-bold underline underline-offset-4"
                to="/login"
                style={{ color: "#3CB95D" }}
              >
                LOGIN TO ESCROW.COM
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reg;
