import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart, Line, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import { getHistoryData } from '../redux/covid_data/covidHistory';
import '../styles/Details.css';

const Details = () => {
  const dispatch = useDispatch();
  const confirmedCases = useSelector((state) => state.covidHistory.history.confirmedHistory);
  const deathCases = useSelector((state) => state.covidHistory.history.deathHistory);
  const isFetched = useSelector((state) => state.covidHistory.fetched);
  const error = useSelector((state) => state.covidHistory.error);
  const location = useLocation();
  const { category } = location.state;
  const navigate = useNavigate();
  const [toShow, setToShow] = useState(true);
  const data = [];

  useEffect(() => {
    setToShow(true);
    dispatch(getHistoryData(category.country));
    document.querySelector('.header').style.display = 'none';
    if (isFetched) {
      const BB = document.querySelector('.details-mapG').getBBox();
      document.querySelector('.details-map').setAttributeNS(null, 'viewBox', `${BB.x} ${BB.y} ${BB.width} ${BB.height}`);
    }
  }, []);

  useEffect(() => {
    if (isFetched) {
      const BB = document.querySelector('.details-mapG').getBBox();
      document.querySelector('.details-map').setAttributeNS(null, 'viewBox', `${BB.x} ${BB.y} ${BB.width} ${BB.height}`);
    }
  }, [isFetched]);

  const filter = (e) => {
    switch (e.target.id) {
      case 'deaths':
        document.querySelector('.type-selected')?.classList.remove('type-selected');
        document.getElementById('deaths').classList.add('type-selected');
        setToShow(false);
        break;
      default:
        document.querySelector('.type-selected')?.classList.remove('type-selected');
        document.getElementById('confirmed').classList.add('type-selected');
        setToShow(true);
    }
  };

  if (isFetched) {
    Object.keys(confirmedCases).forEach((key) => data.push({
      name: key,
      'Confirmed cases': confirmedCases[key],
      'Death cases': deathCases[key],
    }));
    return (
      <div>
        <div className="details-header">
          <button
            type="button"
            className="back-arrow"
            onClick={() => {
              navigate(-1);
              document.querySelector('.header').style.display = 'block';
            }}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" /></svg>
          </button>
          <h2 className="details-title">{category.country}</h2>
          <svg viewBox="0 0 470 470" height="1em" width="1em" fill="white">
            <g>
              <path d="M235,302.296c47.177,0,85.423-38.245,85.423-85.423V85.423C320.423,38.245,282.177,0,235,0s-85.423,38.245-85.423,85.423v131.451C149.577,264.051,187.823,302.296,235,302.296z" />
              <path d="M350.423,136.148v30h15v50.726c0,71.915-58.508,130.423-130.423,130.423s-130.423-58.507-130.423-130.423v-50.726h15v-30h-45v80.726C74.577,300.273,138.551,369,220,376.589V440h-90.444v30h210.889v-30H250v-63.411c81.449-7.589,145.423-76.317,145.423-159.716v-80.726H350.423z" />
            </g>
          </svg>
          <svg fill="#fff" viewBox="0 0 50 50" width="1em" height="1em">
            <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
          </svg>
        </div>
        <div className="general-stats-container">
          <div className="details-map-container">
            <svg className="details-map" height="7.5rem" width="8rem">
              <g className="details-mapG">
                <path fill="#2D4573" d={category.map} />
              </g>
            </svg>
          </div>
          <div className="general-stats">
            <h2>Today&apos;s stats</h2>
            <h3 className="lato">{`Cases: ${category.confirmed}`}</h3>
            <h3 className="lato">{`Deaths: ${category.deaths}`}</h3>
          </div>
        </div>
        <div className="chart-type">
          <h3>Charts:</h3>
          <button type="button" className="type-button type-selected" id="confirmed" onClick={filter}>Cases</button>
          <button type="button" className="type-button" id="deaths" onClick={filter}>Deaths</button>
        </div>
        <div className="details-chart">
          {toShow
            && (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={data.splice(0, 600).reverse()}
                  margin={{
                    top: 5, right: 7, bottom: 10, left: 7,
                  }}
                >
                  <Tooltip />
                  <Legend />
                  <Line dot={false} type="monotone" dataKey="Confirmed cases" stroke="green" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            )}
          {!toShow
            && (
              <ResponsiveContainer width="100%">
                <LineChart
                  data={data.splice(0, 600).reverse()}
                  margin={{
                    top: 5, right: 7, bottom: 10, left: 7,
                  }}
                >
                  <Tooltip />
                  <Legend />
                  <Line dot={false} type="monotone" dataKey="Death cases" stroke="red" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            )}
        </div>
      </div>
    );
  }
  if (error.length > 0) {
    return (
      <div className="main">
        <div className="details-header">
          <button
            type="button"
            className="back-arrow"
            onClick={() => {
              navigate(-1);
              document.querySelector('.header').style.display = 'block';
            }}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" /></svg>
          </button>
          <h2 className="details-title">{category.country}</h2>
          <svg viewBox="0 0 470 470" height="1em" width="1em" fill="white">
            <g>
              <path d="M235,302.296c47.177,0,85.423-38.245,85.423-85.423V85.423C320.423,38.245,282.177,0,235,0s-85.423,38.245-85.423,85.423v131.451C149.577,264.051,187.823,302.296,235,302.296z" />
              <path d="M350.423,136.148v30h15v50.726c0,71.915-58.508,130.423-130.423,130.423s-130.423-58.507-130.423-130.423v-50.726h15v-30h-45v80.726C74.577,300.273,138.551,369,220,376.589V440h-90.444v30h210.889v-30H250v-63.411c81.449-7.589,145.423-76.317,145.423-159.716v-80.726H350.423z" />
            </g>
          </svg>
          <svg fill="#fff" viewBox="0 0 50 50" width="1em" height="1em">
            <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
          </svg>
        </div>
        <div className="error-container">
          <h2 className="error-message">Oops!!</h2>
          <h3>The covid tracker has encountered an error.</h3>
          <p>Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="details-header">
        <button
          type="button"
          className="back-arrow"
          onClick={() => {
            navigate(-1);
            document.querySelector('.header').style.display = 'block';
          }}
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" /></svg>
        </button>
        <h2 className="details-title">{category.country}</h2>
        <svg viewBox="0 0 470 470" height="1em" width="1em" fill="white">
          <g>
            <path d="M235,302.296c47.177,0,85.423-38.245,85.423-85.423V85.423C320.423,38.245,282.177,0,235,0s-85.423,38.245-85.423,85.423v131.451C149.577,264.051,187.823,302.296,235,302.296z" />
            <path d="M350.423,136.148v30h15v50.726c0,71.915-58.508,130.423-130.423,130.423s-130.423-58.507-130.423-130.423v-50.726h15v-30h-45v80.726C74.577,300.273,138.551,369,220,376.589V440h-90.444v30h210.889v-30H250v-63.411c81.449-7.589,145.423-76.317,145.423-159.716v-80.726H350.423z" />
          </g>
        </svg>
        <svg fill="#fff" viewBox="0 0 50 50" width="1em" height="1em">
          <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
        </svg>
      </div>
      <div className="loading">
        <svg viewBox="0 0 100 100" width="10rem">
          <g>
            <path
              className="st0"
              d="M39.3,59.9c-3.7,0-6.7-3-6.7-6.7c0-3.7,3-6.7,6.7-6.7c3.7,0,6.7,3,6.7,6.7C46.1,56.9,43.1,59.9,39.3,59.9z
              M39.3,49.8c-1.9,0-3.4,1.5-3.4,3.4s1.5,3.4,3.4,3.4s3.4-1.5,3.4-3.4S41.2,49.8,39.3,49.8z"
            />
            <path
              className="st0"
              d="M56.2,64.9c-3.7,0-6.7-3-6.7-6.7s3-6.7,6.7-6.7s6.7,3,6.7,6.7S59.9,64.9,56.2,64.9z M56.2,54.8
              c-1.9,0-3.4,1.5-3.4,3.4s1.5,3.4,3.4,3.4s3.4-1.5,3.4-3.4S58.1,54.8,56.2,54.8z"
            />
            <path
              className="st0"
              d="M52.8,46.4c-2.8,0-5.1-2.3-5.1-5.1c0-2.8,2.3-5.1,5.1-5.1c2.8,0,5.1,2.3,5.1,5.1
              C57.9,44.1,55.6,46.4,52.8,46.4z M52.8,39.6c-0.9,0-1.7,0.8-1.7,1.7s0.8,1.7,1.7,1.7s1.7-0.8,1.7-1.7S53.8,39.6,52.8,39.6z"
            />
            <path
              className="st1"
              d="M49.5,93.6c-3.7,0-6.7-3-6.7-6.7c0-2.1,1-4,2.6-5.3l-1-7.1c-0.6-0.1-1.3-0.3-1.9-0.5L38,79.6
              c0.8,1.9,0.6,4.1-0.4,5.9c-0.9,1.6-2.4,2.7-4.1,3.1c-1.7,0.5-3.6,0.2-5.1-0.7c-1.6-0.9-2.7-2.4-3.1-4.1c-0.5-1.7-0.2-3.6,0.7-5.1
              c1-1.8,2.9-3,4.9-3.3l2.7-6.6c-0.5-0.4-0.9-0.9-1.4-1.4l-6.6,2.7c-0.3,2-1.5,3.9-3.3,4.9c-3.2,1.9-7.4,0.8-9.2-2.5
              c-0.9-1.6-1.1-3.4-0.7-5.1s1.6-3.2,3.1-4.1c1.8-1,4-1.2,5.9-0.4l5.6-4.4c-0.2-0.6-0.4-1.2-0.5-1.9l-7.1-1c-1.3,1.6-3.2,2.6-5.3,2.6
              c-3.7,0-6.7-3-6.7-6.7s3-6.7,6.7-6.7c2.1,0,4,1,5.3,2.6l7.1-1c0.1-0.6,0.3-1.3,0.5-1.9L21.3,40c-1.9,0.8-4.1,0.6-5.9-0.4
              c-1.6-0.9-2.7-2.4-3.1-4.1s-0.2-3.6,0.7-5.1c0.9-1.6,2.4-2.7,4.1-3.1c1.7-0.5,3.6-0.2,5.1,0.7c1.8,1,3,2.9,3.3,4.9l6.6,2.7
              c0.4-0.5,0.9-0.9,1.4-1.4l-2.7-6.6c-2-0.3-3.9-1.5-4.9-3.3c-0.9-1.6-1.1-3.4-0.7-5.1s1.6-3.2,3.1-4.1c1.6-0.9,3.4-1.1,5.1-0.7
              c1.7,0.5,3.2,1.6,4.1,3.1c1,1.8,1.2,4,0.4,5.9l4.4,5.6c0.6-0.2,1.2-0.4,1.9-0.5l1-7.1c-1.6-1.3-2.6-3.2-2.6-5.3
              c0-3.7,3-6.7,6.7-6.7s6.7,3,6.7,6.7c0,2.1-1,4-2.6,5.3l1,7.1c0.6,0.1,1.3,0.3,1.9,0.5l4.4-5.6c-0.8-1.9-0.6-4.1,0.4-5.9
              c1.9-3.2,6-4.3,9.2-2.5c3.2,1.9,4.3,6,2.5,9.2c-1,1.8-2.9,3-4.9,3.3l-2.7,6.6c0.5,0.4,0.9,0.9,1.4,1.4l6.6-2.7
              c0.3-2,1.5-3.9,3.3-4.9c1.6-0.9,3.4-1.1,5.1-0.7c1.7,0.5,3.2,1.6,4.1,3.1c1.9,3.2,0.8,7.4-2.5,9.2c-1.8,1-4,1.2-5.9,0.4L72,44.4
              c0.2,0.6,0.4,1.2,0.5,1.9l7.1,1c1.3-1.6,3.2-2.6,5.3-2.6c3.7,0,6.7,3,6.7,6.7s-3,6.7-6.7,6.7c-2.1,0-4-1-5.3-2.6l-7.1,1
              c-0.1,0.6-0.3,1.3-0.5,1.9l5.6,4.4c1.9-0.8,4.1-0.6,5.9,0.4c3.2,1.9,4.3,6,2.5,9.2c-1.9,3.2-6,4.3-9.2,2.5c-1.8-1-3-2.9-3.3-4.9
              l-6.6-2.7c-0.4,0.5-0.9,0.9-1.4,1.4l2.7,6.6c2,0.3,3.9,1.5,4.9,3.3c0.9,1.6,1.1,3.4,0.7,5.1c-0.5,1.7-1.6,3.2-3.1,4.1
              c-1.6,0.9-3.4,1.1-5.1,0.7c-1.7-0.5-3.2-1.6-4.1-3.1c-1-1.8-1.2-4-0.4-5.9L56.5,74c-0.6,0.2-1.2,0.4-1.9,0.5l-1,7.1
              c1.6,1.3,2.6,3.2,2.6,5.3C56.2,90.6,53.2,93.6,49.5,93.6z M41.8,70.3c0.2,0,0.4,0,0.6,0.1c1.2,0.4,2.4,0.8,3.7,1
              c0.7,0.1,1.3,0.7,1.4,1.4l1.3,9.4c0.1,0.7-0.3,1.4-0.9,1.7c-1.1,0.6-1.8,1.7-1.8,3c0,1.9,1.5,3.4,3.4,3.4c1.9,0,3.4-1.5,3.4-3.4
              c0-1.2-0.7-2.4-1.8-3c-0.6-0.3-1-1-0.9-1.7l1.3-9.4c0.1-0.7,0.7-1.3,1.4-1.4c1.2-0.2,2.5-0.5,3.7-1c0.7-0.3,1.5,0,1.9,0.5l5.8,7.4
              c0.4,0.6,0.5,1.3,0.1,1.9c-0.7,1.1-0.7,2.4-0.1,3.5c0.5,0.8,1.2,1.3,2,1.6c0.9,0.2,1.8,0.1,2.6-0.3c0.8-0.5,1.3-1.2,1.6-2
              c0.2-0.9,0.1-1.8-0.3-2.6c-0.6-1.1-1.8-1.7-3.1-1.7c-0.7,0-1.4-0.4-1.6-1.1L61.9,69c-0.3-0.7-0.1-1.5,0.5-1.9
              c1-0.8,1.9-1.7,2.7-2.7c0.5-0.6,1.2-0.8,1.9-0.5l8.7,3.5c0.7,0.3,1.1,0.9,1.1,1.6c-0.1,1.3,0.6,2.4,1.7,3.1
              c0.8,0.5,1.7,0.6,2.6,0.3c0.9-0.2,1.6-0.8,2-1.6c0.9-1.6,0.4-3.7-1.2-4.6c-1.1-0.6-2.4-0.6-3.5,0.1c-0.6,0.4-1.4,0.3-1.9-0.1
              l-7.4-5.8c-0.6-0.5-0.8-1.2-0.5-1.9c0.4-1.2,0.8-2.4,1-3.7c0.1-0.7,0.7-1.3,1.4-1.4l9.4-1.3c0.7-0.1,1.4,0.3,1.7,0.9
              c0.6,1.1,1.7,1.8,3,1.8c1.9,0,3.4-1.5,3.4-3.4s-1.5-3.4-3.4-3.4c-1.2,0-2.4,0.7-3,1.8c-0.3,0.6-1,1-1.7,0.9l-9.4-1.3
              c-0.7-0.1-1.3-0.7-1.4-1.4c-0.2-1.2-0.5-2.5-1-3.7c-0.3-0.7,0-1.5,0.5-1.9l7.4-5.8c0.6-0.4,1.3-0.5,1.9-0.1
              c1.1,0.7,2.4,0.7,3.5,0.1c1.6-0.9,2.2-3,1.2-4.6c-0.5-0.8-1.2-1.3-2-1.6c-0.9-0.2-1.8-0.1-2.6,0.3c-1.1,0.6-1.7,1.8-1.7,3.1
              c0,0.7-0.4,1.4-1.1,1.6L67,39c-0.7,0.3-1.5,0.1-1.9-0.5c-0.8-1-1.7-1.9-2.7-2.7c-0.6-0.5-0.8-1.2-0.5-1.9l3.5-8.7
              c0.3-0.7,0.9-1.1,1.6-1.1c1.3,0.1,2.4-0.6,3.1-1.7c0.9-1.6,0.4-3.7-1.2-4.6s-3.7-0.4-4.6,1.2c-0.6,1.1-0.6,2.4,0.1,3.5
              c0.4,0.6,0.3,1.4-0.1,1.9L58.4,32c-0.5,0.6-1.2,0.8-1.9,0.5c-1.2-0.4-2.4-0.8-3.7-1c-0.7-0.1-1.3-0.7-1.4-1.4l-1.3-9.4
              C50,20,50.4,19.3,51,19c1.1-0.6,1.8-1.7,1.8-3c0-1.9-1.5-3.4-3.4-3.4c-1.9,0-3.4,1.5-3.4,3.4c0,1.2,0.7,2.4,1.8,3
              c0.6,0.3,1,1,0.9,1.7l-1.3,9.4c-0.1,0.7-0.7,1.3-1.4,1.4c-1.2,0.2-2.5,0.5-3.7,1c-0.7,0.3-1.5,0-1.9-0.5l-5.8-7.4
              c-0.4-0.6-0.5-1.3-0.1-1.9c0.7-1.1,0.7-2.4,0.1-3.5c-0.5-0.8-1.2-1.3-2-1.6c-0.9-0.2-1.8-0.1-2.6,0.3c-0.8,0.5-1.3,1.2-1.6,2
              c-0.2,0.9-0.1,1.8,0.3,2.6c0.6,1.1,1.8,1.7,3.1,1.7c0.7,0,1.4,0.4,1.6,1.1l3.5,8.7c0.3,0.7,0.1,1.5-0.5,1.9c-1,0.8-1.9,1.7-2.7,2.7
              c-0.5,0.6-1.2,0.8-1.9,0.5l-8.7-3.5c-0.7-0.3-1.1-0.9-1.1-1.6c0.1-1.3-0.6-2.4-1.7-3.1c-1.6-0.9-3.7-0.4-4.6,1.2
              c-0.5,0.8-0.6,1.7-0.3,2.6c0.2,0.9,0.8,1.6,1.6,2c1.1,0.6,2.4,0.6,3.5-0.1c0.6-0.4,1.4-0.3,1.9,0.1l7.4,5.8
              c0.6,0.5,0.8,1.2,0.5,1.9c-0.4,1.2-0.8,2.4-1,3.7c-0.1,0.7-0.7,1.3-1.4,1.4l-9.4,1.3c-0.7,0.1-1.4-0.3-1.7-0.9
              c-0.6-1.1-1.7-1.8-3-1.8c-1.9,0-3.4,1.5-3.4,3.4s1.5,3.4,3.4,3.4c1.2,0,2.4-0.7,3-1.8c0.3-0.6,1-1,1.7-0.9l9.4,1.3
              c0.7,0.1,1.3,0.7,1.4,1.4c0.2,1.2,0.5,2.5,1,3.7c0.3,0.7,0,1.5-0.5,1.9l-7.4,5.8c-0.6,0.4-1.3,0.5-1.9,0.1
              c-1.1-0.7-2.4-0.7-3.5-0.1c-0.8,0.5-1.3,1.2-1.6,2c-0.2,0.9-0.1,1.8,0.3,2.6c0.9,1.6,3,2.2,4.6,1.2c1.1-0.6,1.7-1.8,1.7-3.1
              c0-0.7,0.4-1.4,1.1-1.6l8.7-3.5c0.7-0.3,1.5-0.1,1.9,0.5c0.8,1,1.7,1.9,2.7,2.7c0.6,0.5,0.8,1.2,0.5,1.9l-3.5,8.7
              c-0.3,0.7-0.9,1.1-1.6,1.1c-1.3,0-2.4,0.6-3.1,1.7c-0.5,0.8-0.6,1.7-0.3,2.6c0.2,0.9,0.8,1.6,1.6,2s1.7,0.6,2.6,0.3
              c0.9-0.2,1.6-0.8,2-1.6c0.6-1.1,0.6-2.4-0.1-3.5c-0.4-0.6-0.3-1.4,0.1-1.9l5.8-7.4C40.8,70.5,41.3,70.3,41.8,70.3z"
            />
          </g>
        </svg>
      </div>
      <p className="wait">Covid-19 is mutating please wait...</p>
    </div>
  );
};

export default Details;
