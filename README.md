
# ChatGPT Svelte Playground Documentation

## Overview

Welcome to the ChatGPT Svelte Playground, a single-page app for chatting with your favorite philosopher! This documentation provides an overview of the app structure, its components, and how it interacts with external services.

## App Structure

The app consists of two main parts: the Svelte page (`/src/routes/$page.svelte`) and the form action (`/src/routes/$page/[...action].ts`). Let's break down each part:

### Svelte Page

#### Imports and Dependencies

- **SvelteMarkdown:** A Svelte component for rendering Markdown.
- **Layout:** A custom Svelte layout component.
- **Svelte/animate:** Provides animations for Svelte components.
- **LoadingDots:** A custom loading dots component.
- **$app/forms:** Form utilities for Svelte apps.
- **$lib/assets/images:** Image assets for the app.
- **$lib/layout.svelte:** Custom layout styles for the app.
- **$lib/loading-dots.svelte:** Loading dots component implementation.
- **$types:** TypeScript types for the app.

#### State Management

- **loading:** A store indicating whether the app is currently loading.
- **history:** A store containing chat history.
- **Message:** TypeScript type representing a chat message.

#### Functions

- **handleEnter:** Event handler for handling the 'Enter' key press.
- **handleEnhance:** Function to handle form submission and API interaction.
- **makeRequest:** Function to make requests to external APIs.

#### Lifecycle Events

- **onDestroy:** Cleanup function to unsubscribe from stores on component destruction.

#### HTML Template

The Svelte template renders the chat interface, including user and bot messages, a form for user input, and loading indicators.

### Form Action

The form action (`/src/routes/$page/[...action].ts`) handles form submissions and API interactions. It utilizes external services for language embeddings and vector stores.

#### Imports and Dependencies

- **langchain/embeddings/openai:** OpenAI embeddings for language processing.
- **langchain/vectorstores/pinecone:** Pinecone vector store for efficient storage and retrieval of vectors.
- **@sveltejs/kit:** SvelteKit actions and ActionResult.

#### Actions

- **default:** The default action handles form submissions, processes user input, and interacts with external services.

#### makeChain Function

- **makeChain:** Function to create a language model chain using OpenAI and Pinecone.

## Running the App

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

## Additional Information

- **Environment Variables:** Ensure that the required environment variables (e.g., OpenAI API key) are set for external service interactions.
- **Configurations:** Modify configuration options as needed, such as adjusting the temperature for OpenAI models.

## Running the `ingest-data` Script

The `ingest-data` script is responsible for loading and processing documents to be used in the language model. Follow the steps below to run the script:

### Prerequisites

Before running the script, ensure you have Node.js and npm installed on your machine.

### Steps

1. **Navigate to the Project Directory:**

   Open a terminal and navigate to the root directory of your Svelte project where the `package.json` file is located.

   ```bash
   cd /path/to/your/svelte-project
   ```

2. **Install Dependencies:**

   Ensure you have all the necessary dependencies by running:

   ```bash
   npm install
   ```

3. **Set Up Configuration:**

   Open the `ingest-data.ts` file located in the `scripts` directory. Verify that the `filePath` variable is correctly set to the directory containing your documents.

   ```typescript
   const filePath = 'docs'; // Change to your directory path
   ```

4. **Run the Script:**

   Execute the script by running:

   ```bash
   ts-node scripts/ingest-data.ts
   ```

   This command will ingest and process the documents, splitting them into chunks and creating embeddings for each document.

5. **Verify Successful Ingestion:**

   Ensure that the script runs without errors, and check the console for logs indicating the successful completion of ingestion.

   ```bash
   ingestion complete
   ```

### Additional Notes

- The `ingest-data` script uses the `DirectoryLoader` to load documents from the specified directory, and the `RecursiveCharacterTextSplitter` to split the text into chunks.
- Adjust the script according to your specific document structure and requirements.

Now, your language model is ready to use the ingested data for improved performance and accuracy.
