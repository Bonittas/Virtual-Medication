import React, { useState } from "react";
import axios from "axios";

function VerifyPayment() {
  const [txRef, setTxRef] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/payment/verify/${txRef}`
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
      setError({
        error:
          error.response.data.message ||
          "An error occurred during verification.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Payment Verification
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="tx_ref"
              className="block text-sm font-medium text-gray-700"
            >
              Transaction ID:
            </label>
            <input
              type="text"
              id="tx_ref"
              value={txRef}
              onChange={(e) => setTxRef(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Payment"}
          </button>
        </form>
        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result:</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : result && result.data ? (
              <div className="bg-gray-100 p-4 rounded-md mt-2">
                <div className="mt-4">
                  <h3 className="font-semibold">Payment Details:</h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <strong>Name:</strong> {result.data.first_name}{" "}
                      {result.data.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {result.data.email}
                    </p>
                    <p>
                      <strong>Amount:</strong> {result.data.amount}{" "}
                      {result.data.currency}
                    </p>
                    <p>
                      <strong>Charge:</strong> {result.data.charge}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {result.data.method}
                    </p>
                    <p>
                      <strong>Transaction Reference:</strong>{" "}
                      {result.data.reference}
                    </p>
                    <p>
                      <strong>Transaction Status:</strong> {result.data.status}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500">
                No payment details found for the provided transaction ID.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyPayment;
