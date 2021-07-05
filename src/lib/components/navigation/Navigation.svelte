<script>
	import { categories, name, source, version } from '$lib/constants';
	import { search, group } from '$lib/search';
	import Icon from '../layout/Icon.svelte';
	import NavItem from './NavItem.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { page } from '$app/stores';
	import { debug } from 'svelte/internal';

	// Properties
	export let docs;
	// Internal statae
	let open = false;
	let term = '';
	// Derived state
	$: icon = open ? 'x' : 'menu';
	$: filteredDocs = group(search(docs, term));
	$: path = $page.path === '' ? '/' : $page.path;
</script>

<nav class="p-1 flex-col items-start bg-back text-front" data-open={open}>
	<div class="flex-row items-center full-width">
		<button
			class="text-front flex-grow text-left flex-row items-center"
			on:click={() => (open = !open)}
		>
			<Icon name={icon} />
		</button>
		<div class="flex-row items-center">
			<a href="/" class="name | no-underline bold text-1">{name}</a>
			<a
				href={source}
				class="monospace lh-1 text-000 p-000 radius-000 border-hover border-w-1 ml-0"
			>
				v{version}
			</a>
		</div>
	</div>

	<ul role="list" class="pt-2 flow-y flow-g-000 full-width bg-back">
		<input bind:value={term} placeholder="Search..." class="mb-2" />

		{#each Object.keys(filteredDocs) as category, i}
			<li class:mt-2={i > 0} class="flow-x flow-g-00 items-center pb-000">
				<Icon name={categories[category] || 'circle'} class="text-accent" attrs={{ height: 20 }} />
				<span class="text-00 monospace uppercase text-accent">{category}</span>
			</li>

			{#each filteredDocs[category] as { title, slug, icon }, j}
				<NavItem
					{title}
					href="/{slug}"
					{icon}
					on:click={() => (open = false)}
					selected={(i === 0 && j === 0 && path === '/') || path === `/${slug}`}
				/>
			{/each}
		{/each}

		<ThemeSwitch class={open ? 'mt-2' : 'flow-grow pt-2'} />
		<li class="text-00 text-left py-1">
			Made with ♥️ by <a href="https://crinkles.io">Crinkles</a>
		</li>
	</ul>
</nav>

<style>
	.name {
		text-transform: capitalize;
	}

	li {
		border-bottom: 1px solid var(--color-hover);
	}

	nav {
		position: sticky;
		top: 0;
		z-index: 100;
	}

	ul {
		list-style: none;
	}

	@media (min-width: 50rem) {
		nav {
			height: 100vh;
			overflow-y: auto;
		}

		button {
			display: none;
		}

		ul {
			height: 100%;
		}
	}

	@media (max-width: 50rem) {
		nav {
			border-bottom: 1px solid var(--color-hover);
		}

		nav[data-open='true'] {
			height: 100vh;
		}

		ul {
			position: absolute;
			top: 3.5rem;
			left: 0;
			max-height: 0;
			overflow-y: hidden;
			width: 100%;
		}

		nav[data-open='true'] ul {
			max-height: calc(100vh - 4.5rem);
			height: 100%;
			overflow-y: auto;
			border-bottom: 1px solid var(--color-hover);
			padding: var(--spacing-0);
		}
	}
</style>
