import React, { useState } from "react";

export default function PaymentModal({
  open,
  amount,
  onClose,
  onConfirmPayment,
  onPayLater,
}) {
  const [txnId, setTxnId] = useState("");

  if (!open) return null;

  const UPI_ID = "snehasaxena685@okicici";
  const PAYEE_NAME = "CSIR-CFTRI Training";

  const gpayUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${amount}&cu=INR`;

  const openGooglePay = () => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = gpayUrl;
    } else {
      alert("Please scan the QR code using your mobile UPI app.");
    }
  };

  const confirmPayment = () => {
    if (!txnId.trim()) {
      alert("Please enter UPI Transaction ID after payment.");
      return;
    }
    onConfirmPayment(txnId);
    setTxnId("");
  };

  return (
    <div className="apply-bg">
      <div className="apply-box">
        <h3 className="text-lg font-semibold text-green-900">
          Training Fee Payment
        </h3>

        <p style={{ marginTop: 6 }}>
          Amount to Pay: <strong>₹{amount}</strong>
        </p>

        <p className="text-sm text-gray-700 mt-2">
          Please pay the training fee manually using Google Pay / UPI.
        </p>

        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <img
            src="/images/qr.jpg"
            alt="CFTRI UPI QR"
            style={{ width: 180 }}
          />
          <p style={{ fontSize: 12, marginTop: 6 }}>
            Scan & pay using Google Pay / PhonePe
          </p>
        </div>

        <button className="btn-apply" onClick={openGooglePay}>
          Open Google Pay
        </button>

        <input
          type="text"
          placeholder="Enter UPI Transaction ID"
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
          style={{
            marginTop: 12,
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          style={{
            marginTop: 10,
            width: "100%",
            padding: 10,
            borderRadius: 10,
            background: "#0f7a45",
            color: "#fff",
            border: "none",
          }}
          onClick={confirmPayment}
        >
          Confirm Payment
        </button>

        <button
          style={{
            marginTop: 10,
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ccc",
            background: "#f8fafb",
          }}
          onClick={onPayLater}
        >
          Pay Later
        </button>

        <button
          style={{ marginTop: 12, fontSize: 12 }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
