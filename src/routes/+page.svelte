<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Layout from '$lib/layout.svelte';
	import { flip } from 'svelte/animate';

	type Message = {
		type: 'apiMessage' | 'userMessage';
		message: string;
		isStreaming?: boolean;
		sourceDocs?: Document[];
	};
	interface MessageSate {
		messages: Message[];
		pending?: string;
		history: [string, string][];
		pendingSourceDocs?: Document[];
	}

	let query = '';
	let loading = '';
	let error = '';
	let messageState: MessageSate = {
		messages: [
			{
				message:
					'Hi, what would you like to learn about this intriguing article?',
				type: 'apiMessage',
			},
		],
		history: [],
	};

	const { messages, history } = messageState;
</script>

<Layout>
	<div class="mx-auto flex flex-col gap-4">
		<h1 class="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
			Chat With Your Favorite Philosopher
		</h1>
		<main class="flex flex-col justify-between items-center p-4">
			<div class="relative">
				<div class="w-full h-full overflow-y-scroll rounded-sm">
					{#each messages as message (message)}
						<div animate:flip>
							{#if message.type === 'apiMessage'}
								<div class="bg-[#f9fafb] p-1.5 text-white flex" />
								<img
									src=""
									alt="bot"
									class="h-[40px] w-[40px] rouned-sm h-full"
								/>
								<div class="leading-7">
									<SvelteMarkdown source={message.message} />
								</div>
							{:else}
								<div class="p-6 flex text-white bg-black">
									<img
										src=""
										alt="user"
										class="mr-4 rounded-sm h-[30px] w-[30px]"
									/>
									<div class="leading-7">
										<SvelteMarkdown source={message.message} />
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</main>
	</div></Layout
>
