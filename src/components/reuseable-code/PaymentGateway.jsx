import webLogo from "../../assets/images/images-removebg-preview.png";

export const getRazorpayOptions = (
  finalAmount,
  checkout,
  navigate,  // Make sure navigate is passed here
  resetForm,
  setLoading
) => {
  return {
    key: "rzp_test_4yosHYDduPYmKN",
    amount: finalAmount * 100, 
    currency: "INR", 
    name: "Trendy Footwear", 
    image: webLogo, 
    description: "Complete your payment", 
    handler: async function (response) {
      try {
        setLoading(true); 

        if (response?.razorpay_payment_id) {
          console.log("Payment successful, navigating to Thank You page...");

          // Reset form and navigate
          resetForm(); 
          navigate("/thankyou"); // Should now work
        } else {
          throw new Error("Payment ID not found in response.");
        }
      } catch (error) {
        console.error("Error during payment:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false); 
      }
    },
    prefill: {
      name: `${checkout?.firstname || ""} ${checkout?.lastname || ""}`.trim(),
      email: checkout?.email || "",
    },
    notes: {
      address: checkout?.address || "No address provided",
    },
    theme: {
      color: "#88C8BC",
    },
    "payment.failed": function (response) {
      console.error("Payment failed", response.error);
      alert("Payment failed. Please try again later.");
    }
  };
};
