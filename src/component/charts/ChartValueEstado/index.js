import React, { useContext } from "react";
import { CardContext } from '../../../contexts/CardContext';
import { BoardContext } from '../../../contexts/BoardContext';
import { Chart } from "react-google-charts";
import _ from "lodash";

import Style from './style.css';

function ChartValueEstado() {
    const { listaCards } = useContext(CardContext);
    const { listaColumns } = useContext(BoardContext);



    // filtro de data
    const { startDate, endDate } = useContext(BoardContext);
    const filteredCards = listaCards.filter((card) => {
        console.log(listaCards);

        // converte "30/05/2023" em padrão Date()
        const dateString = card.modification_date;
        const parts = dateString.split('/'); // Divide a string nos separadores '/'
        const day = parseInt(parts[0], 10); // Extrai o dia e converte para número inteiro
        const month = parseInt(parts[1], 10) - 1; // Extrai o mês (subtraindo 1, pois os meses em JavaScript são baseados em zero)
        const year = parseInt(parts[2], 10); // Extrai o ano

        const modificationDate = new Date(year, month, day);


        console.log(modificationDate);
        console.log(startDate);
        console.log(endDate);
        return modificationDate >= startDate && modificationDate <= endDate;
    });

    // fim filtro de data


    // Agrupar os cards por estado
    const cardsByState = _.groupBy(filteredCards, "estado");

    // Calcular o valor total por estado e formatar os dados para o gráfico
    const data = Object.entries(cardsByState).map(([estado, cards]) => {
        const valorTotal = cards.reduce((total, card) => total + card.valor, 0);
        return [estado, valorTotal];
    });

    // Calcular a porcentagem para cada estado
    const totalValue = filteredCards.reduce((total, card) => total + card.valor, 0);
    const dataWithPercentage = data.map(([estado, valorTotal]) => {
        const porcentagem = (valorTotal / totalValue) * 100;
        return [estado, valorTotal, porcentagem];
    });

    // Ordenar os dados por valor total decrescente
    const sortedData = _.orderBy(dataWithPercentage, [1], ["desc"]);

    const chartData = [["Estado", "Valor Total", "Porcentagem"], ...sortedData];

    const options = {
        title: "VALOR TOTAL POR ESTADO",
        is3D: false,
        legend: { position: "bottom" },
        fontSize: 12,
        pieSliceText: "value-and-percentage",
        pieSliceTextStyle: {
            color: "white",
            bold: true,
            textAlign: "center",
        },
        tooltip: { text: "value-and-percentage" },
        colors: [
            "#FF4069",
            "#FFC233",
            "#069BFF",
            "#C749EF",
            "#01BA02",
            "#F7A24D",
            "#F66DB0",
            "#8FB1CE",
            "#FF9696", // Vermelho claro
            "#FFB396", // Laranja claro
            "#FFD996", // Amarelo claro
            "#FFFF96", // Amarelo-esverdeado claro
            "#C0FF96", // Verde claro
            "#96FFAE", // Verde azulado claro
            "#96FFD4", // Ciano claro
            "#96FFFF", // Azul claro
            "#96B6FF", // Azul arroxeado claro
            "#B996FF", // Lilás claro
            "#D696FF", // Magenta claro
            "#FF96F9", // Rosa claro
            "#FF96D2", // Rosa arroxeado claro
            "#FF96AE", // Rosa alaranjado claro
            "#FF9696", // Vermelho claro (repetido)
            "#FFB396", // Laranja claro (repetido)
            "#FFD996", // Amarelo claro (repetido)
            "#FFFF96", // Amarelo-esverdeado claro (repetido)
            "#C0FF96", // Verde claro (repetido)
            "#96FFAE", // Verde azulado claro (repetido)
        ], // Define cores personalizadas
        pieHole: 0.3, // Define o tamanho do buraco no centro do gráfico (0.4 representa 40% do tamanho total)

    };

    return (

        <div className="chart-container">
            <Chart
            className="chart-a"
                chartType="PieChart"
                data={chartData}
                options={options} />
        </div>
    );
}

export default ChartValueEstado;
