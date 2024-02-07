import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import { Box, Button, Modal } from "@mui/material";
import SinglePokemon from "./Modules/SinglePokemon";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [singlePokemon, setsinglePokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${
          (currentPage - 1) * 12
        }`
      );
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / 10));
      const { results } = data;
      const pokemones = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();
        return poke;
      });
      const eachPokemones = await Promise.all(pokemones);
      setPokemons(eachPokemones);
    };

    fetchPokemons();
  }, [currentPage]);
  const funt = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const handleOpen = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setsinglePokemon(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="mainContainer">
        <div className="mainContainerCards">
          {pokemons.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="cardPokemon"
                onClick={() => {
                  handleOpen(pokemon.id);
                }}
              >
                <div>{pokemon.name}</div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                ></img>
              </div>
            );
          })}
        </div>
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          className="navegateBard"
          pageCount={totalPages}
          currentPage={currentPage}
          nextLabel="Next >"
          previousLabel="< Previous"
          onPageChange={(e) => {
            funt(e);
          }}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className="classes_modal"
        closeAfterTransition
      >
        <Box className="classes_paper">
          <div className="btnClose">
            <Button variant="outlined" color="error" onClick={handleClose}>
              CERRAR
            </Button>
          </div>
          <SinglePokemon singlePokemon={singlePokemon} />
        </Box>
      </Modal>
    </>
  );
};

export default App;
