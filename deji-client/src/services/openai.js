// import OpenAI from 'openai';

// let openai = null;

// export const initializeOpenAI = (apiKey) => {
//   openai = new OpenAI({
//     apiKey,
//     dangerouslyAllowBrowser: true // ⚠️ For demo/testing only — not secure for production
//   });
//   return openai;
// };

// export const getOpenAIClient = () => {
//   if (!openai) {
//     throw new Error('OpenAI client not initialized. Call initializeOpenAI first.');
//   }
//   return openai;
// };

// export const askChatbot = async (messages) => {
//   const client = getOpenAIClient();

//   try {
//     const response = await client.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages,
//       temperature: 0.7,
//       max_tokens: 1000
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error('Error calling OpenAI API:', error);
//     throw error;
//   }
// };
