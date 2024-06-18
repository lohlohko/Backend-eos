const transformLineChart = (data, title, tooltip, xKey) => {
  if (!data || data.length === 0) {
    return {
      title,
      tooltip,
      labels: [],
      series: []
    };
  }
  const uniqueKey = [...new Set(data.flatMap(item => Object.keys(item)))];
  const labels = data.map(item => item[uniqueKey[uniqueKey.indexOf(xKey)]]);
  const uniqueSeriesNames = [...new Set(uniqueKey.filter(element => element !== xKey))];
  const series = uniqueSeriesNames.map(seriesName => ({
    name: seriesName?.replace(/_/g, ' ') || '',
    data: data.map(entry => entry[seriesName] || 0),
  }));
  return {
    title,
    tooltip,
    labels,
    series
  };
};
  
const transformBarChart = (data, title, tooltip, valueKey) => {
  const uniqueKeys = [...new Set(data.flatMap(item => Object.keys(item)))];
  const uniqueTags = uniqueKeys.filter(key => key !== valueKey);
  const uniqueLabels = [...new Set(data.map(item => item[uniqueTags[0]]))];
  const uniqueSeriesNames = [...new Set(data.map(item => item[uniqueTags[1]]))];
  const result = {
    title: title,
    tooltip: tooltip,
    labels: uniqueLabels,
    series: uniqueSeriesNames.map(seriesName => ({
      name: seriesName,
      data: uniqueLabels.map(label => {
        const matchingItem = data.find(item => item[uniqueTags[0]] === label && item[uniqueTags[1]] === seriesName);
        return matchingItem ? matchingItem[valueKey] : 0;
      }),
    })),
  };
  
  return result;
};

const transformPieChart = (data, title, tooltip) => {
  if (!data || data.length === 0) {
    return {
      title,
      tooltip,
      labels: [],
      series: []
    };
  }
  const labels = [];
  const series = [];
  const keys = Object.keys(data[0]);
  data.map((data) => {
    labels.push(data[keys[1]]);
    series.push(data[keys[2]]);
    return true;
  });
  const response = {
    title: title,
    tooltip: tooltip,
    labels: labels,
    series: series,
  };
  return response;
};

const transformDoughnutChart = (data, title, tooltip) => {
  if (!data || data.length === 0) {
    return {
      title,
      tooltip,
      labels: [],
      series: []
    };
  }
  const labels = [];
  const series = [];
  const keys = Object.keys(data[0]);
  data.map((data) => {
    labels.push(data[keys[1]]);
    series.push(data[keys[2]]);
    return true;
  });
  const response = {
    title: title,
    tooltip: tooltip,
    labels: labels,
    series: series,
  };
  return response;
};

const  transfromNormalTable = (data, title, tooltip) => {
  const response = {
    title: title,
    tooltip: tooltip,
    data: data,
  };
  return response;
};

const transdormHeatmapChart = (data, title, tooltip, label) => {
  const months = Object.keys(data).filter(key => key !== '_id' && key !== 'category'); // Mendapatkan nama-nama bulan
  const transformData = {
    title:title,
    tooltip: tooltip,
    label:label,
    series: months.map(month=> ({
      name: month,
      data: [data[month]]
    }))
  };
  return transformData;
};
const generateData = (count, options) => {
  const {min,max} = options;
  const data = [];
  for (let i = 0; i < count; i++){
    data.push(Math.floor(Math.random() * (max - min +1)) +min);
  }
  return data;
};


// const transformedData = {
//   title: title,
//   series: data.map((monthData,name) => ({
//     nama: name,
//     data: monthData
//   })),
//   ranges: [{
//     from: -30,
//     to: 5,
//     name: 'low',
//   },
//   {
//     from: 6,
//     to: 20,
//     name: 'medium',
//   },
//   {
//     from: 21,
//     to: 45,
//     name: 'high',
//   },
//   {
//     from: 46,
//     to: 55,
//     name: 'extreme',
//   }
//   ],
// };
// return transformedData;

const transdormHeatmapWithModel = (data, model, title, tooltip) => {
  const findDayIndex = (dayName, model) => {
    const index =  model.findIndex(day => day.name === dayName);
    return index !== -1 ? index : null;
  };
  const findHourIndex = (hourName, model) => {
    return model.findIndex(hour => hour.x === hourName);
  };
  data.map(data => {
    const findDay = findDayIndex(data.weekday, model);
    if (findDay !== null){
      const findHour = findHourIndex(data.hour, model[findDay].data);
      if (findHour !== -1){
        model[findDay].data[findHour].y = data.avg_eksalasi;
      }
    }
    return true;
  });
  const response = {
    title: title,
    tooltip: tooltip,
    data: model,
  };
  return response;
};

const transformTreeMapChart = (data, title, tooltip, label, xAxis, yAxis) => {
  const name = [...new Set(data.map((item) => item[label]))];
  const series = name.map((item) => {
    return {
      name: item,
      data: data.filter((point) => point[label] === item).map((point) => {
        return [point[xAxis], point[yAxis]];
      })
    };
  });
  return {
    title,
    tooltip,
    series
  };
};

const transformScatterChart = (data, title, tooltip, label, xAxis, yAxis) => {
  const name = [...new Set(data.map((item) => item[label]))];
  const series = name.map((item) => {
    return {
      name: item,
      data: data.filter((point) => point[label] === item).map((point) => {
        return [point[xAxis], point[yAxis]];
      })
    };
  });
  return {
    title,
    tooltip,
    series
  };
};

const transformStackeBarChart = (data, title, tooltip, xKey) => {
  if (!data || data.length === 0) {
    return {
      title,
      tooltip,
      labels: [],
      series: []
    };
  }
  const uniqueKey = [...new Set(data.flatMap(item => Object.keys(item)))];
  const labels = data.map(item => item[uniqueKey[uniqueKey.indexOf(xKey)]]);
  const uniqueSeriesNames = [...new Set(uniqueKey.filter(element => element !== xKey))];
  const series = uniqueSeriesNames.map(seriesName => ({
    name: seriesName?.replace(/_/g, ' ') || '',
    data: data.map(entry => entry[seriesName] || 0),
  }));
  return {
    title,
    tooltip,
    labels,
    series
  };
};

const transformGroupedBarChart = (data, title, tooltip, xKey) => {
  if (!data || data.length === 0) {
    return {
      title,
      tooltip,
      labels: [],
      series: []
    };
  }
  const uniqueKey = [...new Set(data.flatMap(item => Object.keys(item)))];
  const labels = data.map(item => item[uniqueKey[uniqueKey.indexOf(xKey)]]);
  const uniqueSeriesNames = [...new Set(uniqueKey.filter(element => element !== xKey))];
  const series = uniqueSeriesNames.map(seriesName => ({
    name: seriesName?.replace(/_/g, ' ') || '',
    data: data.map(entry => entry[seriesName] || 0),
  }));
  return {
    title,
    tooltip,
    labels,
    series
  };
};


module.exports = {
  transformLineChart,
  transformBarChart,
  transformPieChart,
  transfromNormalTable,
  transdormHeatmapChart,
  transdormHeatmapWithModel,
  transformTreeMapChart,
  transformScatterChart,
  transformDoughnutChart,
  transformStackeBarChart,
  transformGroupedBarChart,
};