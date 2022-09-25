import React from "react";
import { AuthContext } from "../../providers/auth";
import { useContext } from "react";
import { formatCurrency } from "../../utils/utils";
import { BiTrash } from "react-icons/bi";
import './style.css'
const imageUrl = import.meta.env.VITE_IMG;
const ItensCheckout = () => {
  const { removeToCart, carrinho } = useContext(AuthContext);
  return (
    <table className="tableCheckout">
      <thead>
        <tr>
          <th>Imagem</th>
          <th>Nome do Filme</th>
          <th>Qtd</th>
          <th>Valor</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="itensTable">
        {carrinho.map((item) => {
          return (
            <tr>
              <td className="imgTable">
                <img
                  src={imageUrl + item.movie.poster_path}
                  alt={item.movie.title}
                />
              </td>
              <td className="titleProduct">{item.movie.title}</td>
              <td>1</td>
              <td>
                {formatCurrency(item.movie.vote_count / item.movie.popularity)}
              </td>
              <td className="actionsBtn">
                <button onClick={() => removeToCart(item.id_cart)}>
                  <BiTrash size={30} color="#ff3636" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ItensCheckout;
