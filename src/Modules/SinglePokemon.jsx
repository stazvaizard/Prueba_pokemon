import React from "react";
import "./SinglePokemon.css";
const SinglePokemon = ({ singlePokemon }) => {
  const { id, name, types, abilities } = singlePokemon;
  return (
    <div>
      <>
        <div className="fullContainerSinglePokemon">
          <div className="containerSinglePokemon">
            <div className="titleNumberCard">
              <div>{id}</div>
              <div>{name}</div>
            </div>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                style={{ height: "200px" }}
              ></img>
            </div>
            <div className="typesHabilities">
              <div className="typesTable">
                <div>Tipos</div>
                <div>
                  {types.map((typ) => {
                    return <div key={typ.slot}>{typ.type.name}</div>;
                  })}
                </div>
              </div>
              <div className="habiliTable">
                <div>Habilidades</div>
                <div>
                  {abilities.map((hab) => {
                    return <div key={hab.slot}>{hab.ability.name}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SinglePokemon;
