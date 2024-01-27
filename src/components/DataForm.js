import React, { useState } from 'react';
import JSONViewer from './DataView';
const ExpressionEngineUI = () => {
  const [expressions, setExpressions] = useState([
    { key: '', output: { value: '', operator: '', score: '' } },
  ]);

  const [combinator, setCombinator] = useState('and');
  const [jsonData, setJsonData] = useState(null)

  const handleFormChange = (index, field, value) => {
    const newExpressions = [...expressions];
    // If the field is part of the 'output' object, update it accordingly
    if (field.startsWith('output.')) {
      const outputField = field.split('.')[1]; // Get the output field (value, operator, score)
      newExpressions[index].output[outputField] = value;
    } else {
      // If the field is not part of 'output', update it directly
      newExpressions[index][field] = value;
    }
    setExpressions(newExpressions);
  };
  

  const addExpression = () => {
    setExpressions([...expressions, { key: '', output: { value: '', operator: '', score: '' } }]);
  };

  const deleteExpression = (index) => {
    const newExpressions = [...expressions];
    newExpressions.splice(index, 1);
    setExpressions(newExpressions);
  };

  const handleCombinatorChange = (event) => {
    setCombinator(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const output = {
      rules: expressions.map((exp) => ({
        key: exp.key,
        output: {
          value: exp.output.value,
          operator: exp.output.operator,
          score: exp.output.score,
        },
      })),
      combinator,
    };

    console.log(output);
    setJsonData(output);
  };

  return (
    <div className="container mt-5">
      {expressions.map((expression, index) => (
        <div key={index} className="row mb-3 justify-content-center">
          <div className="col-md-2">
            <label className="fs-5 font-weight-bold">Rule Type</label>
            <select
              className="form-control"
              value={expression.key}
              onChange={(e) => handleFormChange(index, 'key', e.target.value)}
            >
              <option value="">Select Rule Type</option>
              <option value="age">Age</option>
              <option value="credit_score">Credit Score</option>
              <option value="account_balance">Account Balance</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="fs-5 font-weight-bold">Operator</label>
            <select
              className="form-control"
              value={expression.output.operator}
              onChange={(e) => handleFormChange(index, 'output.operator', e.target.value)}
            >
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value=">=">{'>='}</option>
              <option value="<=">{'<='}</option>
              <option value="=">{'='}</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="fs-5 font-weight-bold">Value</label>
            <input
              type="number"
              className="form-control"
              value={expression.output.value}
              onChange={(e) => handleFormChange(index, 'output.value', e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="fs-5 font-weight-bold">Score</label>
            <input
              type="number"
              className="form-control"
              value={expression.output.score}
              onChange={(e) => handleFormChange(index, 'output.score', e.target.value)}
            />
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-danger" onClick={() => deleteExpression(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="row mb-3 justify-content-center">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={addExpression}>
            Add Expression
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-2">
          <div className="form-group">
            <label className="font-weight-bold">Connector Type</label>
            <select
              className="form-control"
              onChange={handleCombinatorChange}
              value={combinator}
            >
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-2">
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {/* Display JSON data using JSONViewer component */}
      <h2>JSON Data:</h2>
      {jsonData && <JSONViewer jsonData={jsonData} />}
    </div>
  );
};

export default ExpressionEngineUI;
