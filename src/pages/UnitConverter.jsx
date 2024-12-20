import React, { useState } from "react";

function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState('length');

  const convert = (e) => {
    e.preventDefault();
    const inputValue = parseFloat(value);

    if (isNaN(inputValue)) {
      setResult('Please enter a valid number');
      return;
    }

    let convertedValue;

    switch (category) {
      case 'length':
        if (fromUnit === 'm' && toUnit === 'km') convertedValue = inputValue / 1000;
        else if (fromUnit === 'm' && toUnit === 'ft') convertedValue = inputValue * 3.28084;
        else if (fromUnit === 'km' && toUnit === 'm') convertedValue = inputValue * 1000;
        else if (fromUnit === 'ft' && toUnit === 'm') convertedValue = inputValue / 3.28084;
        else convertedValue = inputValue;
        break;

      case 'temperature':
        if (fromUnit === 'c' && toUnit === 'f') convertedValue = (inputValue * 9/5) + 32;
        else if (fromUnit === 'f' && toUnit === 'c') convertedValue = (inputValue - 32) * 5/9;
        else if (fromUnit === 'c' && toUnit === 'k') convertedValue = inputValue + 273.15;
        else if (fromUnit === 'k' && toUnit === 'c') convertedValue = inputValue - 273.15;
        else convertedValue = inputValue;
        break;

      case 'weight':
        if (fromUnit === 'kg' && toUnit === 'lb') convertedValue = inputValue * 2.20462;
        else if (fromUnit === 'lb' && toUnit === 'kg') convertedValue = inputValue / 2.20462;
        else if (fromUnit === 'g' && toUnit === 'kg') convertedValue = inputValue / 1000;
        else if (fromUnit === 'kg' && toUnit === 'g') convertedValue = inputValue * 1000;
        else convertedValue = inputValue;
        break;

      case 'volume':
        if (fromUnit === 'l' && toUnit === 'gal') convertedValue = inputValue * 0.264172;
        else if (fromUnit === 'gal' && toUnit === 'l') convertedValue = inputValue / 0.264172;
        else if (fromUnit === 'ml' && toUnit === 'l') convertedValue = inputValue / 1000;
        else if (fromUnit === 'l' && toUnit === 'ml') convertedValue = inputValue * 1000;
        else convertedValue = inputValue;
        break;

      case 'speed':
        if (fromUnit === 'kph' && toUnit === 'mph') convertedValue = inputValue * 0.621371;
        else if (fromUnit === 'mph' && toUnit === 'kph') convertedValue = inputValue / 0.621371;
        else if (fromUnit === 'ms' && toUnit === 'kph') convertedValue = inputValue * 3.6;
        else if (fromUnit === 'kph' && toUnit === 'ms') convertedValue = inputValue / 3.6;
        else convertedValue = inputValue;
        break;

      case 'area':
        if (fromUnit === 'm2' && toUnit === 'ft2') convertedValue = inputValue * 10.7639;
        else if (fromUnit === 'ft2' && toUnit === 'm2') convertedValue = inputValue / 10.7639;
        else if (fromUnit === 'm2' && toUnit === 'km2') convertedValue = inputValue / 1000000;
        else if (fromUnit === 'km2' && toUnit === 'm2') convertedValue = inputValue * 1000000;
        else convertedValue = inputValue;
        break;

      case 'time':
        if (fromUnit === 'min' && toUnit === 'hr') convertedValue = inputValue / 60;
        else if (fromUnit === 'hr' && toUnit === 'min') convertedValue = inputValue * 60;
        else if (fromUnit === 'sec' && toUnit === 'min') convertedValue = inputValue / 60;
        else if (fromUnit === 'min' && toUnit === 'sec') convertedValue = inputValue * 60;
        else convertedValue = inputValue;
        break;

      case 'pressure':
        if (fromUnit === 'pa' && toUnit === 'bar') convertedValue = inputValue / 100000;
        else if (fromUnit === 'bar' && toUnit === 'pa') convertedValue = inputValue * 100000;
        else if (fromUnit === 'pa' && toUnit === 'psi') convertedValue = inputValue * 0.000145038;
        else if (fromUnit === 'psi' && toUnit === 'pa') convertedValue = inputValue / 0.000145038;
        else convertedValue = inputValue;
        break;

      case 'energy':
        if (fromUnit === 'j' && toUnit === 'cal') convertedValue = inputValue * 0.239006;
        else if (fromUnit === 'cal' && toUnit === 'j') convertedValue = inputValue / 0.239006;
        else if (fromUnit === 'j' && toUnit === 'kwh') convertedValue = inputValue / 3600000;
        else if (fromUnit === 'kwh' && toUnit === 'j') convertedValue = inputValue * 3600000;
        else convertedValue = inputValue;
        break;

      case 'data':
        if (fromUnit === 'b' && toUnit === 'kb') convertedValue = inputValue / 1024;
        else if (fromUnit === 'kb' && toUnit === 'b') convertedValue = inputValue * 1024;
        else if (fromUnit === 'mb' && toUnit === 'kb') convertedValue = inputValue * 1024;
        else if (fromUnit === 'kb' && toUnit === 'mb') convertedValue = inputValue / 1024;
        else convertedValue = inputValue;
        break;

      case 'frequency':
        if (fromUnit === 'hz' && toUnit === 'khz') convertedValue = inputValue / 1000;
        else if (fromUnit === 'khz' && toUnit === 'hz') convertedValue = inputValue * 1000;
        else if (fromUnit === 'mhz' && toUnit === 'khz') convertedValue = inputValue * 1000;
        else if (fromUnit === 'khz' && toUnit === 'mhz') convertedValue = inputValue / 1000;
        else convertedValue = inputValue;
        break;

      case 'angle':
        if (fromUnit === 'deg' && toUnit === 'rad') convertedValue = inputValue * (Math.PI / 180);
        else if (fromUnit === 'rad' && toUnit === 'deg') convertedValue = inputValue * (180 / Math.PI);
        else convertedValue = inputValue;
        break;

      case 'power':
        if (fromUnit === 'w' && toUnit === 'kw') convertedValue = inputValue / 1000;
        else if (fromUnit === 'kw' && toUnit === 'w') convertedValue = inputValue * 1000;
        else convertedValue = inputValue;
        break;

      default:
        convertedValue = inputValue;
    }

    let precision = 2;
    if (category === 'temperature') {
      precision = 1;
    } else if (category === 'time') {
      precision = 0;
    } else if (category === 'data') {
      precision = 0;
    }

    if (fromUnit === toUnit) {
      setResult(`${inputValue} ${fromUnit}`);
    } else {
      setResult(`${inputValue} ${fromUnit} = ${convertedValue.toFixed(precision)} ${toUnit}`);
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
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            switch (e.target.value) {
              case 'length':
                setFromUnit('m');
                setToUnit('km');
                break;
              case 'temperature':
                setFromUnit('c');
                setToUnit('f');
                break;
              case 'weight':
                setFromUnit('kg');
                setToUnit('lb');
                break;
              case 'volume':
                setFromUnit('l');
                setToUnit('gal');
                break;
              case 'speed':
                setFromUnit('kph');
                setToUnit('mph');
                break;
              case 'area':
                setFromUnit('m2');
                setToUnit('ft2');
                break;
              case 'time':
                setFromUnit('min');
                setToUnit('hr');
                break;
              case 'pressure':
                setFromUnit('pa');
                setToUnit('bar');
                break;
              case 'energy':
                setFromUnit('j');
                setToUnit('cal');
                break;
              case 'data':
                setFromUnit('b');
                setToUnit('kb');
                break;
              case 'frequency':
                setFromUnit('hz');
                setToUnit('khz');
                break;
              case 'angle':
                setFromUnit('deg');
                setToUnit('rad');
                break;
              case 'power':
                setFromUnit('w');
                setToUnit('kw');
                break;
            }
          }}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="length">Length</option>
          <option value="temperature">Temperature</option>
          <option value="weight">Weight</option>
          <option value="volume">Volume</option>
          <option value="speed">Speed</option>
          <option value="area">Area</option>
          <option value="time">Time</option>
          <option value="pressure">Pressure</option>
          <option value="energy">Energy</option>
          <option value="data">Data Storage</option>
          <option value="frequency">Frequency</option>
          <option value="angle">Angle</option>
          <option value="power">Power</option>
        </select>
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          {category === 'length' && (
            <>
              <option value="m">Meters</option>
              <option value="km">Kilometers</option>
              <option value="ft">Feet</option>
            </>
          )}
          {category === 'temperature' && (
            <>
              <option value="c">Celsius</option>
              <option value="f">Fahrenheit</option>
              <option value="k">Kelvin</option>
            </>
          )}
          {category === 'weight' && (
            <>
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="lb">Pounds</option>
            </>
          )}
          {category === 'volume' && (
            <>
              <option value="l">Liters</option>
              <option value="ml">Milliliters</option>
              <option value="gal">Gallons</option>
            </>
          )}
          {category === 'speed' && (
            <>
              <option value="kph">Kilometers per hour</option>
              <option value="mph">Miles per hour</option>
              <option value="ms">Meters per second</option>
            </>
          )}
          {category === 'area' && (
            <>
              <option value="m2">Square meters</option>
              <option value="km2">Square kilometers</option>
              <option value="ft2">Square feet</option>
            </>
          )}
          {category === 'time' && (
            <>
              <option value="sec">Seconds</option>
              <option value="min">Minutes</option>
              <option value="hr">Hours</option>
            </>
          )}
          {category === 'pressure' && (
            <>
              <option value="pa">Pascal</option>
              <option value="bar">Bar</option>
              <option value="psi">PSI</option>
            </>
          )}
          {category === 'energy' && (
            <>
              <option value="j">Joules</option>
              <option value="cal">Calories</option>
              <option value="kwh">Kilowatt Hours</option>
            </>
          )}
          {category === 'data' && (
            <>
              <option value="b">Bytes</option>
              <option value="kb">Kilobytes</option>
              <option value="mb">Megabytes</option>
            </>
          )}
          {category === 'frequency' && (
            <>
              <option value="hz">Hertz</option>
              <option value="khz">Kilohertz</option>
              <option value="mhz">Megahertz</option>
            </>
          )}
          {category === 'angle' && (
            <>
              <option value="deg">Degrees</option>
              <option value="rad">Radians</option>
            </>
          )}
          {category === 'power' && (
            <>
              <option value="w">Watts</option>
              <option value="kw">Kilowatts</option>
            </>
          )}
        </select>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          {category === 'length' && (
            <>
              <option value="m">Meters</option>
              <option value="km">Kilometers</option>
              <option value="ft">Feet</option>
            </>
          )}
          {category === 'temperature' && (
            <>
              <option value="c">Celsius</option>
              <option value="f">Fahrenheit</option>
              <option value="k">Kelvin</option>
            </>
          )}
          {category === 'weight' && (
            <>
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="lb">Pounds</option>
            </>
          )}
          {category === 'volume' && (
            <>
              <option value="l">Liters</option>
              <option value="ml">Milliliters</option>
              <option value="gal">Gallons</option>
            </>
          )}
          {category === 'speed' && (
            <>
              <option value="kph">Kilometers per hour</option>
              <option value="mph">Miles per hour</option>
              <option value="ms">Meters per second</option>
            </>
          )}
          {category === 'area' && (
            <>
              <option value="m2">Square meters</option>
              <option value="km2">Square kilometers</option>
              <option value="ft2">Square feet</option>
            </>
          )}
          {category === 'time' && (
            <>
              <option value="sec">Seconds</option>
              <option value="min">Minutes</option>
              <option value="hr">Hours</option>
            </>
          )}
          {category === 'pressure' && (
            <>
              <option value="pa">Pascal</option>
              <option value="bar">Bar</option>
              <option value="psi">PSI</option>
            </>
          )}
          {category === 'energy' && (
            <>
              <option value="j">Joules</option>
              <option value="cal">Calories</option>
              <option value="kwh">Kilowatt Hours</option>
            </>
          )}
          {category === 'data' && (
            <>
              <option value="b">Bytes</option>
              <option value="kb">Kilobytes</option>
              <option value="mb">Megabytes</option>
            </>
          )}
          {category === 'frequency' && (
            <>
              <option value="hz">Hertz</option>
              <option value="khz">Kilohertz</option>
              <option value="mhz">Megahertz</option>
            </>
          )}
          {category === 'angle' && (
            <>
              <option value="deg">Degrees</option>
              <option value="rad">Radians</option>
            </>
          )}
          {category === 'power' && (
            <>
              <option value="w">Watts</option>
              <option value="kw">Kilowatts</option>
            </>
          )}
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