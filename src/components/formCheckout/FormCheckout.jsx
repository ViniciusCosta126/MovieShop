import React, { useEffect, useState } from "react";
import "./style.css";

import { IMaskInput } from "react-imask";
import MaskedInput from "react-text-mask";
import emailMask from "text-mask-addons/dist/emailMask";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth";
import { somaTotal, formatCurrency, ValidarInputs } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const FormCheckout = () => {
  const [total, setTotal] = useState(0);
  const { carrinho, zerarCart } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState("hidden");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    numero: "",
    email: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    setTotal(somaTotal(carrinho));
  }, [carrinho]);

  const handleInput = (e) => {
    let key = e.target.getAttribute("name");
    let newState = form;
    newState[key] = e.target.value;
    setForm(newState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let vazio = ValidarInputs(form);
    if (vazio) {
      alert("Existem campos vazios");
    } else {
      setModalOpen("");
      zerarCart();
    }
  };
  const handleClose = () => {
    setModalOpen("hidden");
    let zerarForm = {
      nome: "",
      cpf: "",
      numero: "",
      email: "",
      cep: "",
      endereco: "",
      cidade: "",
      estado: "",
    };
    setForm(zerarForm);

    navigate("/");
  };
  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <input
            type="text"
            className="input"
            name="nome"
            placeholder=" "
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">Nome Completo</label>
        </div>
        <div className="input-group inline">
          <IMaskInput
            mask="000.000.000-00"
            type="text"
            name="cpf"
            className="input"
            placeholder=" "
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">CPF</label>
        </div>
        <div className="input-group inline">
          <IMaskInput
            mask="(00) 00000-0000"
            type="text"
            name="numero"
            className="input"
            placeholder=" "
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">Celular</label>
        </div>
        <div className="input-group">
          <MaskedInput
            type="text"
            mask={emailMask}
            className="input"
            name="email"
            placeholder=" "
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">Email</label>
        </div>
        <div className="input-group inline">
          <IMaskInput
            mask="00000-000"
            type="text"
            className="input"
            name="cep"
            placeholder=" "
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">CEP</label>
        </div>
        <div className="input-group inline">
          <input
            type="text"
            className="input"
            placeholder=" "
            name="endereco"
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">Endereço</label>
        </div>
        <div className="input-group inline">
          <input
            type="text"
            className="input"
            placeholder=" "
            name="cidade"
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">Cidade</label>
        </div>
        <div className="input-group inline">
          <input
            type="text"
            className="input"
            placeholder=" "
            name="estado"
            onChange={(e) => handleInput(e)}
          />
          <label className="placeholder">Estado</label>
        </div>
        <button type="submit">Finalizar Compra</button>
      </form>

      <h3 className="totalItens">Total: {formatCurrency(total)}</h3>

      <aside id="modal-overlay" class={modalOpen}>
        <section id="modal-content">
          <button onClick={handleClose} class="close-modal">
            &#10005;
          </button>
          <h2 class="modal-content-title">Ola {form.nome}</h2>
          <p>
            Compra realizada no valor de {formatCurrency(total)}, um email foi
            enviado para {form.email} contendo todas as informações sobre seu
            pedido
          </p>
        </section>
      </aside>
    </>
  );
};

export default FormCheckout;
