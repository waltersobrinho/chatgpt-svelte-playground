import { OpenAI } from 'langchain/llms/openai';
import { LLMChain, loadQAChain, ChatVectorDBQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import type { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OPENAI_API_KEY } from '$env/static/private';

const CONDENSE_PROMPT =
	PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT =
	PromptTemplate.fromTemplate(`You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`);

export const makeChain = (vectorstore: PineconeStore) => {
	const questionGenerator = new LLMChain({
		llm: new OpenAI({ temperature: 0, openAIApiKey: OPENAI_API_KEY }),
		prompt: CONDENSE_PROMPT,
	});

	const docChain = loadQAChain(
		//change modelName to gpt-4 if you have access to it
		new OpenAI({
			temperature: 0,
			modelName: 'gpt-3.5-turbo',
			openAIApiKey: OPENAI_API_KEY,
		}),
		{
			prompt: QA_PROMPT,
		}
	);

	return new ChatVectorDBQAChain({
		vectorstore,
		combineDocumentsChain: docChain,
		questionGeneratorChain: questionGenerator,
	});
};
