import React from "react";
import FormCheckout from "../components/formCheckout/FormCheckout";
import ItensCheckout from "../components/ItensCheckout/ItensCheckout";
import "./checkout.css";
const Checkout = () => {
  return (
    <div className="container containerCheckout">
      <div className="formContainer">
        <h2>Finalizar Compra</h2>
       <FormCheckout/>
      </div>
      <div className="itensCheckout">
        <ItensCheckout/>
      </div>
    </div>
  );
};

export default Checkout;
