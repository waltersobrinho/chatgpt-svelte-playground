import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CustomPDFLoader } from '../utils/pdf-loader';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { pinecone } from '../utils/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PINECONE_INDEX_NAME } from '../config/pinecone';
const filepath = 'static';

export const run = async () => {
	try {
		const directoryLoader = new DirectoryLoader(filepath, {
			'.pdf': (path) => new CustomPDFLoader(path),
		});

		const rawDocs = await directoryLoader.load();

		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 200,
		});

		const docs = await textSplitter.splitDocuments(rawDocs);
		console.log('%c SPLITTING DOCS', 'background: #222; color: #bada55');
		console.log(docs);

		console.log(
			'%c creating vector store...',
			'background: #222; color: #bada55'
		);
		const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });

		const index = pinecone.Index(PINECONE_INDEX_NAME);

		//embed the PDF documents
		await PineconeStore.fromDocuments(docs, embeddings, {
			pineconeIndex: index,
			// namespace: PINECONE_NAME_SPACE,
			textKey: 'text',
		});
	} catch (error) {
		console.log('error', error);
		throw new Error('Failed to ingest your data');
	}
};

(async () => {
	await run();
	console.log('ingestion complete');
})();
