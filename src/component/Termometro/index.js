import React, { useState} from 'react';

// STYLE
import './style.css';

function Termometro() {

    const [nivel, setNivel] = useState(2); // Estado inicial: nível 2 (morno)


  const handleNivelChange = (event) => {
    const novoNivel = parseInt(event.target.value);
    setNivel(novoNivel);
  };

  return (
    <div className="termometro-vendas">
       <label className='title-termometro'>Termômetro de Venda</label>
      <input
        type="range"
        min="1"
        max="3"
        value={nivel}
        onChange={handleNivelChange}
        className="termometro-range"
        style={{  }}
      />
      <div className="termometro-opcoes">
        <div className="opcao-frio">Frio</div>
        <div className="opcao-morno">Morno</div>
        <div className="opcao-quente">Quente</div>
      </div>
    </div>
  );
};
export default Termometro;
