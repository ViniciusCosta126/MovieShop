import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  function addToCart(item) {
    setCarrinho([...carrinho, item]);
  }
  function zerarCart(){
    setCarrinho([])
  }
  function removeToCart(id) {
    var newCart = carrinho.filter((item) => item.id_cart !== id);
    setCarrinho(newCart);
  } 
  function addToFavorite(novo) {
    const found = favoritos.find(filme => filme.movie.id === novo.movie.id);
    if(found){
        let novoFilmes = favoritos.map(filme=>{
            return filme.movie.id === novo.movie.id ? {...filme,is_favorite:!filme.is_favorite} : filme
        })
        novoFilmes = novoFilmes.filter(filme=>{
          return filme.is_favorite ? filme : ''
        })
        return setFavoritos(novoFilmes)
    }
   
    setFavoritos([...favoritos,novo])


  }

  return (
    <AuthContext.Provider
      value={{ carrinho, addToCart, removeToCart, addToFavorite, favoritos,zerarCart }}
    >
      {children}
    </AuthContext.Provider>
  );
}
