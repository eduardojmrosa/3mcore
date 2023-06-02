import React, { useContext } from "react";
import { CardContext } from "../../../contexts/CardContext";
import { BoardContext } from "../../../contexts/BoardContext";
import { Chart } from "react-google-charts";
import _ from "lodash";

// STYLE
import "./style.css";

function ChartValueEstadoColumn() {
  const { listaCards } = useContext(CardContext);
  const { listaColumns } = useContext(BoardContext);

  // Filtro de data
  const { startDate, endDate } = useContext(BoardContext);
  const filteredCards = listaCards.filter((card) => {
    const dateString = card.modification_date;
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const modificationDate = new Date(year, month, day);

    return modificationDate >= startDate && modificationDate <= endDate;
  });
  // Fim do filtro de data

  const totalValue = filteredCards.reduce(
    (total, card) => total + card.valor,
    0
  );

  const dataWithPercentage = _.chain(filteredCards)
    .filter((card) => card.id_column !== "Leads")
    .groupBy("estado")
    .map((cards, estado) => {
      const valorTotal = _.sumBy(cards, "valor");
      const porcentagem = ((valorTotal / totalValue) * 100).toFixed(2) + "%";
      return [estado, valorTotal, porcentagem];
    })
    .orderBy(1, "desc")
    .value();

  const chartData = [
    ["Estado", "Valor Total", "Porcentagem"],
    ...dataWithPercentage,
  ];

  const options = {
    is3D: false,
    legend: { position: "bottom" },
    fontSize: 12,
    pieSliceTextStyle: {
      color: "white",
      bold: true,
    },
    tooltip: { text: "value" },
    colors: [
      "#FF4069",
      "#FFC233",
      "#069BFF",
      "#C749EF",
      "#01BA02",
      "#F7A24D",
      "#F66DB0",
      "#8FB1CE",
      "#FF9696",
      "#FFB396",
      "#FFD996",
      "#FFFF96",
      "#C0FF96",
      "#96FFAE",
      "#96FFD4",
      "#96FFFF",
      "#96B6FF",
      "#B996FF",
      "#D696FF",
      "#FF96F9",
      "#FF96D2",
    ],
    pieHole: 0.3,
    dataLabels: {
      textStyle: {
        color: "white",
        fontSize: 12,
      },
      display: "none",
      formatter: (value, _, row) =>
        `${row[0]}\nValor: ${row[1]}\nPorcentagem: ${row[2]}`,
    },
  };

  return (
    <div className="charts-container">
      {listaColumns
        .filter((item) => item.title !== "Leads")
        .map((column) => {
          const cardsByState = _.groupBy(
            filteredCards.filter((card) => card.id_column === column.id),
            "estado"
          );

          const data = Object.entries(cardsByState).map(
            ([estado, cards]) => {
              const valorTotal = cards.reduce(
                (total, card) => total + card.valor,
                0
              );
              return [estado, valorTotal];
            }
          );

          const sortedData = _.orderBy(data, [1], ["desc"]);

          const chartData = [
            ["Estado", "Valor Total"],
            ...sortedData,
          ];

          return (
            <div key={column.id} className="chart-wrapper">
              <Chart
                className="chart"
                chartType="PieChart"
                data={chartData}
                options={{
                  ...options,
                  title: `VALOR TOTAL POR ESTADO - ${column.title}`,
                }}
              />
            </div>
          );
        })}
    </div>
  );
}

export default ChartValueEstadoColumn;
