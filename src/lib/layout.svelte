<div class="mx-auto flex flex-col space-y-4">
	<header class="container sticky top-0 z-40 bg-white">
		<div class="h-16 border-b border-b-slate-200 py-4">
			<nav class="ml-4 pl-6">
				<a href="/" class="hover:text-slate-600 cursor-pointer"> Home </a>
			</nav>
		</div>
	</header>
	<div>
		<main class="flex w-full flex-1 flex-col overflow-hidden">
			<slot />
		</main>
	</div>
</div>
