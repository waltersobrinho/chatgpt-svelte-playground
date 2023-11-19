<script lang="ts">
import SvelteMarkdown from 'svelte-markdown';
import Layout from '$lib/layout.svelte';
import {
    flip
} from 'svelte/animate';
import LoadingDots from '$lib/loading-dots.svelte';
import {
    enhance
} from '$app/forms';
import {
    history,
    loading
} from '../store';
import type {
    Message
} from '../store';
import Robot from '$lib/assets/images/robot.png';
import User from '$lib/assets/images/user.png';
import {
    onDestroy
} from 'svelte';
import type {
    SubmitFunction
} from './$types';

let formElement: HTMLFormElement;

let isLoading: boolean;
const unsubscribeLoading = loading.subscribe((loading) => {
    isLoading = loading;
});

let query = '';
let error = '';
let messages: Message[];

const unsubscribeHistory = history.subscribe((history) => {
    messages = history;
});

const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query.length) {
        e.preventDefault();
        formElement.requestSubmit();
        history.update((hist) => [...hist, {
            text: query,
            type: 'user'
        }]);
        query = '';
    }
};

const handleEnhance: SubmitFunction = () => {
    loading.set(true);
    return ({
        update,
        result
    }) => {
        loading.set(false);
        history.update((hist) => [...hist, {
            text: result.data,
            type: 'api'
        }]);
        update();
    };
};

onDestroy(() => {
    unsubscribeLoading();
    unsubscribeHistory();
});
</script>

<Layout>
    <div class="mx-auto flex flex-col gap-4">
        <h1 class="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
            Chat With Your Favorite Philosopher
        </h1>
        <main class="flex flex-col justify-between items-center p-4">
            <div
                class="w-[75vw] h-[65vh] bg-[#ffffff] rounded-sm border flex justify-center items-center"
                >
                <div class="w-full h-full overflow-y-scroll rounded-sm">
                    {#each messages as message (message)}
                    <div animate:flip>
                        {#if message.type === 'api'}
                        <div
                            class="bg-[#f9fafb] p-1.5 text-black flex gap-8 bg-slate-100"
                            >
                            <img
                                src={Robot}
                                alt="bot"
                                class="h-[40px] w-[40px] rouned-sm h-full"
                                />
                            <div class="leading-7">
                                <SvelteMarkdown source={message.text} />
                            </div>
                        </div>
                        {:else}
                        <div class="p-1.5 flex gap-8 text-white bg-slate-400">
                            <img
                                src={User}
                                alt="user"
                                class="mr-4 rounded-sm h-[30px] w-[30px]"
                                />
                            <div class="leading-7">
                                <SvelteMarkdown source={message.text} />
                            </div>
                        </div>
                        {/if}
                    </div>
                    {/each}
                </div>
            </div>
            <div class="flex justify-center items-center relative py-4 px-0 flex-col">
                <div class="relative">
                    <form
                        method="post"
                        bind:this={formElement}
                        use:enhance={handleEnhance}
                        >
                        <textarea
                            disabled={isLoading}
                            on:keydown={handleEnter}
                            rows={1}
                            maxLength={512}
                            id="userInput"
                            name="userMessage"
                            placeholder={isLoading
                            ? 'Waiting for response...'
                            : 'What is this text about?'}
                            bind:value={query}
                            class="relative resize-none text-lg py-2 px-4 w-[75vw] rounded-lg border border-color-[#d9d9e3] bg-white text-black outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                class="absolute top-3 right-4 text-[#a5a2a2] bg-none p-1.5 flex border-none"
                                >
                                {#if isLoading}
                                <div class="absolute top-1 right-1">
                                    <LoadingDots />
                                </div>
                                {:else}
                                <svg
                                    viewBox="0 0 20 20"
                                    class="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                        />
                                        </svg>
                                        {/if}
                                        </button>
                                        </form>
                                        </div>
                                        </div>
                                        {#if error}
                                        <div class="border border-red-400 rounded-md p-4">
                                            <p class="text-red-500">{error}</p>
                                        </div>
                                        {/if}
                                        </main>
                                        </div></Layout
                                        >
