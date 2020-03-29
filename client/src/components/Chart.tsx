import React, { useRef, useEffect } from 'react'
import { createChart } from 'lightweight-charts'

const Chart = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    // let lightweightCharts;

    useEffect(() => {
        // eslint-disable-next-line global-require
        // lightweightCharts = require('lightweight-charts');
        // const { createChart } = lightweightCharts;
        const chart = createChart(chartRef.current!, {
            width: 600,
            height: 250,
            layout: {
                textColor: '#d1d4dc',
                backgroundColor: '#000000',
            },
            priceScale: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25,
                },
            },
            crosshair: {
                vertLine: {
                    // width: 5,
                    color: 'rgba(224, 227, 235, 0.1)',
                    style: 0,
                },
                horzLine: {
                    visible: false,
                    labelVisible: false,
                },
            },
            grid: {
                vertLines: {
                    color: 'rgba(42, 46, 57, 0)',
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0)',
                },
            },
        })
        // const lineSeries = chart.addLineSeries();
        const areaSeries = chart.addAreaSeries({
            topColor: 'rgba(38, 198, 218, 0.56)',
            bottomColor: 'rgba(38, 198, 218, 0.04)',
            lineColor: 'rgba(38, 198, 218, 1)',
            lineWidth: 2,
            // crossHairMarkerVisible: false,
        })
        areaSeries.setData([
            { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 },
            { time: '2019-04-21', value: 80.01 },
            { time: '2019-04-22', value: 96.63 },
            { time: '2019-04-23', value: 76.64 },
            { time: '2019-04-24', value: 81.89 },
            { time: '2019-04-25', value: 74.43 },
            { time: '2019-04-26', value: 80.01 },
            { time: '2019-04-27', value: 96.63 },
            { time: '2019-04-28', value: 76.64 },
            { time: '2019-04-29', value: 81.89 },
            { time: '2019-04-30', value: 74.43 },
        ]);
    }, []);

    return (
        <>
            <div ref={chartRef}></div>
        </>
    );
};

export default Chart;