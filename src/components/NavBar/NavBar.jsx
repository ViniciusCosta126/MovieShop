import { Link,useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2, BiCart,BiHeart } from "react-icons/bi";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth";
import { useContext } from "react";
import ItensCart from "../itensCart/ItensCart";
import {somaTotal,formatCurrency} from '../../utils/utils'

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [cartopen,setCartOpen] = useState(false)
  const [total,setTotal] = useState(0)
  const { carrinho,favoritos } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(()=>{
    setTotal(somaTotal(carrinho))
  },[carrinho])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!search) return
    navigate(`/search?q=${search}`)
    setSearch('')
    if(cartopen){
      setCartOpen(!cartopen)
    }
  }
  
  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie />
          MoviesLib
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
      <div className="actionsNav">
        <Link to='/favoritos'>
          <span>{favoritos.length}</span>
          <BiHeart size={40}/>
        </Link>
        <button onClick={()=>{setCartOpen(!cartopen)}}>
          <span>{carrinho.length}</span>
          <BiCart size={40}/>
        </button>
        <div className={`cartItens ${cartopen ? 'open' : 'closed'}`}>
          <div className="cartTitle">
          <BiCart size={30}/>
          <p className="">Meu Carrinho!</p>
          </div>
            {
            carrinho.length > 0 &&(
            carrinho.map(item=>{
              return <ItensCart key={item.id_cart} item={item}/>
            })
            )}
            <p className="total">{total === 0 ? "Sem itens no carrinho" : "Total:" + formatCurrency(total)}</p>
            {
              carrinho.length > 0 &&(
                <Link className="btn-call-to-action" to="/checkout">Finalizar compras</Link>
              )
            }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
