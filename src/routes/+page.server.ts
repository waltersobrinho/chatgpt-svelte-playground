import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OPENAI_API_KEY, PINECONE_INDEX_NAME } from '$env/static/private';
import { makeChain } from '../../utils/make-chain';
import { pinecone } from '../../utils/pinecone';
import type { ActionResult, Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event): Promise<ActionResult> => {
		const reponse = await event.request.formData();
		const message: string | null = reponse.get('userMessage') as string;

		const response = await makeRequest({ message });

		return response;
	},
};

async function makeRequest({ message }: { message: string }) {
	console.log('Message sent');
	if (!message) {
		return new Response(
			JSON.stringify({ message: 'No question in the request' }),
			{
				status: 400,
			}
		);
	}
	// OpenAI recommends replacing newlines with spaces for best results
	const sanitizedQuestion = message.trim().replaceAll('\n', ' ');

	try {
		const index = await pinecone.Index(PINECONE_INDEX_NAME);
		/* create vectorstore*/

		const vectorStore = await PineconeStore.fromExistingIndex(
			new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
			{
				pineconeIndex: index,
				textKey: 'text',
			}
		);

		//create chain
		const chain = makeChain(vectorStore);
		//Ask a question using chat history
		const response = await chain.call({
			question: sanitizedQuestion,
			chat_history: [],
		});

		return response.text;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log('error', error);
		new Response(
			JSON.stringify({ error: error.message || 'Something went wrong' }),
			{ status: 500 }
		);
	}
}
