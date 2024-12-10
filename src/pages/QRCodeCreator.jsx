import React, { useState } from "react";
import QRCode from "qrcode.react";

function QRCodeCreator() {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">QR Code Creator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-sm px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <div className="mt-8">
        <QRCode value={text || 'https://cooltools.com'} size={256} />
      </div>
    </div>
  );
}

export default QRCodeCreator;
