const f = ({
  type: o,
  data: e,
  themeColors: c,
  textColor: a,
  lineColor: b,
  lineSmooth: m,
  stack: y
}) => {
  const l = a ? {
    color: a
  } : {}, n = a ? {
    lineStyle: {
      color: a
    }
  } : void 0, t = a ? {
    color: a
  } : void 0, u = b ? {
    lineStyle: {
      color: b
    }
  } : {}, p = e.series.length > 1 ? {
    top: "bottom",
    textStyle: l
  } : void 0;
  if (o === "bar")
    return {
      color: c,
      textStyle: l,
      legend: p,
      xAxis: {
        type: "category",
        data: e.labels,
        axisLine: n,
        axisLabel: t
      },
      yAxis: {
        type: "value",
        axisLine: n,
        axisLabel: t,
        splitLine: u
      },
      series: e.series.map((s, r) => {
        const i = {
          data: s,
          name: e.legends[r],
          type: "bar",
          label: {
            show: !0
          },
          itemStyle: {
            borderRadius: [2, 2, 0, 0]
          }
        };
        return y && (i.stack = "A"), i;
      })
    };
  if (o === "column")
    return {
      color: c,
      textStyle: l,
      legend: p,
      yAxis: {
        type: "category",
        data: e.labels,
        axisLine: n,
        axisLabel: t
      },
      xAxis: {
        type: "value",
        axisLine: n,
        axisLabel: t,
        splitLine: u
      },
      series: e.series.map((s, r) => {
        const i = {
          data: s,
          name: e.legends[r],
          type: "bar",
          label: {
            show: !0
          },
          itemStyle: {
            borderRadius: [0, 2, 2, 0]
          }
        };
        return y && (i.stack = "A"), i;
      })
    };
  if (o === "line")
    return {
      color: c,
      textStyle: l,
      legend: p,
      xAxis: {
        type: "category",
        data: e.labels,
        axisLine: n,
        axisLabel: t
      },
      yAxis: {
        type: "value",
        axisLine: n,
        axisLabel: t,
        splitLine: u
      },
      series: e.series.map((s, r) => {
        const i = {
          data: s,
          name: e.legends[r],
          type: "line",
          smooth: m,
          label: {
            show: !0
          }
        };
        return y && (i.stack = "A"), i;
      })
    };
  if (o === "pie")
    return {
      color: c,
      textStyle: l,
      legend: {
        top: "bottom",
        textStyle: l
      },
      series: [
        {
          data: e.series[0].map((s, r) => ({
            value: s,
            name: e.labels[r]
          })),
          label: a ? {
            color: a
          } : {},
          type: "pie",
          radius: "70%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            label: {
              show: !0,
              fontSize: 14,
              fontWeight: "bold"
            }
          }
        }
      ]
    };
  if (o === "ring")
    return {
      color: c,
      textStyle: l,
      legend: {
        top: "bottom",
        textStyle: l
      },
      series: [
        {
          data: e.series[0].map((s, r) => ({
            value: s,
            name: e.labels[r]
          })),
          label: a ? {
            color: a
          } : {},
          type: "pie",
          radius: ["40%", "70%"],
          padAngle: 1,
          avoidLabelOverlap: !1,
          itemStyle: {
            borderRadius: 4
          },
          emphasis: {
            label: {
              show: !0,
              fontSize: 14,
              fontWeight: "bold"
            }
          }
        }
      ]
    };
  if (o === "area")
    return {
      color: c,
      textStyle: l,
      legend: p,
      xAxis: {
        type: "category",
        boundaryGap: !1,
        data: e.labels,
        axisLine: n,
        axisLabel: t
      },
      yAxis: {
        type: "value",
        axisLine: n,
        axisLabel: t,
        splitLine: u
      },
      series: e.series.map((s, r) => {
        const i = {
          data: s,
          name: e.legends[r],
          type: "line",
          areaStyle: {},
          label: {
            show: !0
          }
        };
        return y && (i.stack = "A"), i;
      })
    };
  if (o === "radar")
    return {
      color: c,
      textStyle: l,
      legend: p,
      radar: {
        indicator: e.labels.map((s) => ({ name: s })),
        splitLine: u,
        axisLine: b ? {
          lineStyle: {
            color: b
          }
        } : void 0
      },
      series: [
        {
          data: e.series.map((s, r) => ({
            value: s,
            name: e.legends[r]
          })),
          type: "radar"
        }
      ]
    };
  if (o === "scatter") {
    const s = [];
    for (let r = 0; r < e.series[0].length; r++) {
      const i = e.series[0][r], d = e.series[1] ? e.series[1][r] : i;
      s.push([i, d]);
    }
    return {
      color: c,
      textStyle: l,
      xAxis: {
        axisLine: n,
        axisLabel: t,
        splitLine: u
      },
      yAxis: {
        axisLine: n,
        axisLabel: t,
        splitLine: u
      },
      series: [
        {
          symbolSize: 12,
          data: s,
          type: "scatter"
        }
      ]
    };
  }
  return null;
};
export {
  f as getChartOption
};
//# sourceMappingURL=chartOption.js.map
