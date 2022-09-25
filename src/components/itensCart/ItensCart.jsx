import React from "react"
import { formatCurrency } from "../../utils/utils"
import {BiTrash} from 'react-icons/bi'
import './style.css'
import { AuthContext } from "../../providers/auth";
import { useContext } from "react";


const ItensCart = ({item}) => { 
    const { removeToCart } = useContext(AuthContext);
  return (
    <div className="itemContainer">
        <p className="title">{item.movie.title}</p>
        <p>{item.movie.qtd}</p>
        <p>{formatCurrency(item.movie.vote_count / item.movie.popularity)}</p>
        <button onClick={()=>removeToCart(item.id_cart)}><BiTrash size={30} color="#ff3636"/></button>
    </div>
  )
}

export default ItensCart