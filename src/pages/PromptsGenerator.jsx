import React, { useState } from "react";
import OpenAI from "openai";

function PromptsGenerator() {
  const [userPrompt, setUserPrompt] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApiKeyChange = (e) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("openai_api_key", newApiKey);
  };

  const enhancePrompt = async () => {
    if (!userPrompt) {
      setError("Please enter a prompt");
      return;
    }

    if (!apiKey) {
      setError("Please enter your OpenAI API key");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "Transform the user's basic prompt into a detailed, well-structured prompt. Only provide the enhanced prompt with no explanations or additional details."
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.7,
      });

      setEnhancedPrompt(completion.choices[0].message.content);
    } catch (err) {
      setError(err.message || "Failed to enhance prompt");
      console.error("OpenAI API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Prompt Enhancer</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={handleApiKeyChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your OpenAI API key"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Prompt
          </label>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter your basic prompt"
          />
        </div>
        <button
          onClick={enhancePrompt}
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Enhancing...' : 'Enhance Prompt'}
        </button>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        {enhancedPrompt && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Enhanced Prompt:</h2>
            <div className="relative">
              <p className="text-gray-800 whitespace-pre-wrap">{enhancedPrompt}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(enhancedPrompt);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                  Copy
                </button>
                <button
                  onClick={() => {
                    setUserPrompt("");
                    setEnhancedPrompt("");
                  }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromptsGenerator;
