import Papa, { parse } from 'papaparse';
import { useState } from 'react';

const App = () => {
  const [maxX, setMaxX] = useState(null);
  const [minX, setMinX] = useState(null);
  const [minY, setMinY] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [minZ, setMinZ] = useState(null);
  const [maxZ, setMaxZ] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // parse data csv to json 
    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data;
        // retrieve x row data 


        const getRowValues = (columnName) => {
          return parsedData
            .map((row) => parseFloat(row[columnName]))
            .filter(value => !isNaN(value))
        }

        const getMax = (columnName) => {
          return Math.max(...getRowValues(columnName));
        }
        const getMin = (columnMin) => {
          return Math.min(...getRowValues(columnMin));
        }


        setMaxX(getMax('X'));
        setMinX(getMin('X'));

        setMaxY(getMax('Y'));
        setMinY(getMin('Y'));

        setMaxZ(getMax('Z'));
        setMinZ(getMin('Z'));

      },
      header: true, // Set this to true if your CSV file has a header row
    });

  };

  return (
    <div>
      <h1>Home page</h1>
      <div>
        <label htmlFor="">X max</label>
        <input type="text" defaultValue={maxX} readOnly />
      </div>
      <div>
        <label htmlFor="">X min</label>
        <input type="text" defaultValue={minX} readOnly />
      </div>
      <div>
        <label htmlFor="">Y max</label>
        <input type="text" defaultValue={maxY} readOnly />
      </div>
      <div>
        <label htmlFor="">Y min</label>
        <input type="text" defaultValue={minY} readOnly />
      </div>
      <div>
        <label htmlFor="">Z min</label>
        <input type="text" defaultValue={minZ} readOnly />
      </div>
      <div>
        <label htmlFor="">Z max</label>
        <input type="text" defaultValue={maxZ} readOnly />
      </div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default App;