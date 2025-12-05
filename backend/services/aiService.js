const { GoogleGenerativeAI } = require('@google/generative-ai');

// make ai client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// function to summarize text
async function summarizeText(text) {
  try {
    console.log('starting to summarize text');
    
    // check if text is empty
    if (!text || text.trim().length === 0) {
      console.log('text is empty');
      throw new Error('No text content to summarize');
    }
    
    // check if api key exists
    if (!process.env.GEMINI_API_KEY) {
      console.log('api key not found');
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }
    
    // try to get model
    let model = null;
    try {
      console.log('trying gemini-1.5-flash');
      model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      console.log('got model gemini-1.5-flash');
    } catch (e) {
      console.log('failed to get gemini-1.5-flash, trying gemini-pro');
      model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      console.log('got model gemini-pro');
    }
    
    // limit text length
    let textToSummarize = text;
    if (text.length > 100000) {
      console.log('text is too long, cutting it');
      textToSummarize = text.substring(0, 100000);
    }
    
    // make prompt
    const prompt = 'Please provide a concise summary (2-3 paragraphs) of the following document. Focus on the key points and main ideas:\n\n' + textToSummarize;
    
    // get summary
    console.log('calling ai to generate summary');
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    console.log('got summary, length: ' + summary.length);
    
    return summary;
  } catch (error) {
    console.log('error in summarizeText: ' + error);
    if (error.message.includes('API_KEY')) {
      throw new Error('Gemini API key is invalid or missing. Please check your .env file.');
    }
    throw new Error('Failed to generate summary: ' + error.message);
  }
}

module.exports = {
  summarizeText: summarizeText
};
