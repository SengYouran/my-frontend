import React, { useState } from "react";

function Security_Health({ OneEmp }) {
  const [password, setPassword] = useState("");

  const getPasswordStrength = (password) => {
    if (!OneEmp?.password)
      return { width: "0%", color: "bg-gray-300", text: "No password" };

    if (OneEmp?.password.length >= 12 && /[!@#$%^&*]/.test(password)) {
      return { width: "100%", color: "bg-green-500", text: "Strong" };
    } else if (OneEmp?.password.length >= 8) {
      return { width: "70%", color: "bg-yellow-500", text: "Medium" };
    } else {
      return { width: "40%", color: "bg-red-500", text: "Weak" };
    }
  };

  const strength = getPasswordStrength(password);

  const accountStatus = strength.text === "Strong" ? "Secure" : "At Risk";

  return (
    <div className="grid justify-center items-center gap-6 w-full">
      {/* RIGHT SIDE */}
      <div className="space-y-2">
        {/* PASSWORD INPUT */}

        {/* STRENGTH BAR */}
        <div >
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${strength.color}`}
              style={{ width: strength.width }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-gray-600">{strength.text}</p>
        </div>
        <h2
          className={`${strength.text === "Strong" ? "text-green-600" : "text-red-600"}`}
        >
          Your Password {accountStatus}
        </h2>
        {/* SECURITY TIPS */}
        <div className="p-3 bg-blue-50 border rounded-xl w-full">
          <p className="text-xs text-blue-700">
            🔐 Use at least 12 characters, include symbols, and avoid common
            words.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Security_Health;
