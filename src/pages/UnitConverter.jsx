import React, { useState } from "react";

function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState(null);

  const convert = (e) => {
    e.preventDefault();
    const inputValue = parseFloat(value);

    if (isNaN(inputValue)) {
      setResult('Please enter a valid number');
      return;
    }

    let convertedValue;

    if (fromUnit === 'm' && toUnit === 'ft') {
      convertedValue = inputValue * 3.28084;
    } else if (fromUnit === 'ft' && toUnit === 'm') {
      convertedValue = inputValue / 3.28084;
    } else {
      convertedValue = inputValue;
    }

    setResult(`${inputValue} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Unit Converter</h1>
      <form onSubmit={convert} className="w-full max-w-sm">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="m">Meters</option>
          <option value="ft">Feet</option>
        </select>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="m">Meters</option>
          <option value="ft">Feet</option>
        </select>
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Convert
        </button>
      </form>
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </div>
  );
}

export default UnitConverter;
