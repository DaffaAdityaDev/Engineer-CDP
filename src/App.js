import './App.scss';
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CardNumber from './components/Card/Number';
import BrushBarChart from './components/Graph/BrushBarChart';
import PieChartDistribution from './components/Graph/PieChart';

function App() {
  const [data, setData] = useState([]);
  const [dataSentiment, setDataSentiment] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [dataSentimentCount, setDataSentimentCount] = useState({})
  const monthNamesToNumber = {
    "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, 
    "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
  };

  const sentimentBarChart = [
    {
      name: 'Positive',
      color: '#96e072'
    },
    {
      name: 'Negative',
      color: '#da2c38'
    },
    {
      name: 'Neutral',
      color: '#808080'
    },
    {
      name: 'Relevant',
      color: '#8080ff'
    }
  ];
  

  const getSentiment = (element) => {
    let sentiment = [...new Set(element.map(item => item.sentiment))];

    return sentiment;
  };

  
  const getDataSource = (element) => {
    let source = [...new Set(element.map(item => item.source))];
    return source;
  };

  const getWeekOfMonth = (date) => {
    const dayOfMonth = date.getDate();
    return Math.ceil(dayOfMonth / 7);
  };
  
  const convertDataForSentimentOverTime = (element) => {
    const convertedData = element.reduce((acc, item) => {
      // Extract the date from the datetime
      const date = new Date(item.datetime);
      
      // Get the month and week of the month
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = monthNames[date.getMonth()];
      const weekOfMonth = getWeekOfMonth(date);
      
      // Combine the month and week of the month into a string
      const datetime = `${month} week ${weekOfMonth}`;
  
      // Initialize the object for the datetime if it doesn't exist
      if (!acc[datetime]) {
        acc[datetime] = {
          datetime: datetime,
          Positive: 0,
          Negative: 0,
          Neutral: 0,
          Relevant: 0
        };
      }
  
      // Increment the sentiment counts based on the sentiment of the item
      switch (item.sentiment) {
        case 'Positive':
          acc[datetime].Positive += 1;
          break;
        case 'Negative':
          acc[datetime].Negative += 1;
          break;
        case 'Neutral':
          acc[datetime].Neutral += 1;
          break;
        case 'Relevant':
          acc[datetime].Relevant += 1;
          break;
        default:
          break;
      }
  
      return acc;
    }, {});
  
    // Convert the object to an array of objects for use with the BrushBarChart component
    const dataForBarChart = Object.values(convertedData);

    dataForBarChart.sort((a, b) => {
      const aParts = a.datetime.split(' ');
      const bParts = b.datetime.split(' ');
    
      const aMonth = monthNamesToNumber[aParts[0]];
      const bMonth = monthNamesToNumber[bParts[0]];
    
      const aWeek = parseInt(aParts[2]);
      const bWeek = parseInt(bParts[2]);
    
      // Compare by month first
      if (aMonth !== bMonth) {
        return aMonth - bMonth;
      }
    
      // If the month is the same, compare by week
      return aWeek - bWeek;
    });

  
    setDataChart(dataForBarChart);
    
  }

  const convertDataForSentimentCount = (element) => {
    let sentimentCount = {
      positive: 0,
      negative: 0,
      neutral: 0,
      relevant: 0
    }

    element.forEach(item => {
      switch (item.sentiment) {
        case 'Positive':
          sentimentCount.positive += 1;
          break;
        case 'Negative':
          sentimentCount.negative += 1;
          break;
        case 'Neutral':
          sentimentCount.neutral += 1;
          break;
        case 'Relevant':
          sentimentCount.relevant += 1;
          break;
        default:
          break;
      }
    })

    setDataSentimentCount(sentimentCount);
    // console.log(sentimentCount.positive);
    
  }

  const compareSourceMostPost = (element) => {
    let source = [...new Set(element.map(item => item.source))];
    let sourceCount = [];

    source.forEach(item => {
      let count = 0;
      element.forEach(element => {
        if (item === element.source) {
          count += 1;
        }
      })
      sourceCount.push({
        name: item,
        count: count
      })
    })

    console.log(sourceCount);
  }

  useEffect(() => {
    fetch('https://ivanbudianto.github.io/test-json/test.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        let sentiment = getSentiment(data);
        let source = getDataSource(data);
      
        setDataSentiment(sentiment);
        setDataSource(source);
        convertDataForSentimentOverTime(data);
        convertDataForSentimentCount(data);
        compareSourceMostPost(data)
    });
  
  }, []);

  return (
    <div className="container__main">
     <Navbar />
     <section className='container__content--card'>
      <CardNumber 
        title={dataSentiment.length}
        desc="source"
      /> 
      <CardNumber 
        title={dataSource.length}
        desc="sentiment"
      /> 
     </section>
     <div className='container__graph'>
      <section className='container__content--graphbar'>
        <p className='container__content--graphbar-title'>Sentiment Data</p>
        <BrushBarChart 
          data={dataChart} 
          dataKey={sentimentBarChart}
          xAxis={dataSentiment}
          yAxis={dataSource}
        />
      </section>
      <section className='cotaniner__content--graphpie'>
          <p>Sentiment Distribution</p>
          <PieChartDistribution 
            positive={dataSentimentCount.positive}
            negative={dataSentimentCount.negative}
            neutral={dataSentimentCount.neutral}
            relevant={dataSentimentCount.relevant}
          />
      </section>
     </div>

    </div>
  );
}

export default App;
