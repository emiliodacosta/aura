import { ResponsiveLine } from '@nivo/line';

export default function LineChart({ tempReadings, ...props }) {
  if (tempReadings.length === 0) {
    return <div className="p-10">No readings were found. Try selecting a longer period.</div>;
  }

  const tempReadingCoords = tempReadings.map((tempReading) => {
    return { x: tempReading.date, y: +tempReading.temperature };
  });


  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Temperature',
            data: tempReadingCoords,
          },
        ]}
        margin={{ top: 10, right: 2.5, bottom: 15, left: 20 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: () => '',
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 10,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 6,
          tickPadding: 1,
          // legend: 'Temperature (°C)',
          // legendPosition: 'middle',
          // legendOffset: -35,
        }}
        colors={['#e11d48']}
        pointSize={7}
        pointLabelYOffset={-8}
        useMesh={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: 'white',
                fontSize: 10,
              },
            },
            legend: {
              text: {
                fill: 'white',
                fontSize: 12,
              },
            },
          },
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
              color: 'black',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role='application'
      />
    </div>
  );
}
