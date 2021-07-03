<script>
	import { categories, name, source, version } from '$lib/constants';
	import { search, group } from '$lib/search';
	import Icon from '../layout/Icon.svelte';
	import NavGroup from './NavGroup.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	export let docs;

	let open = false;
	let term = '';
	$: icon = open ? 'x' : 'menu';

	$: filteredDocs = group(search(docs, term));
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
			<NavGroup
				on:click={() => (open = false)}
				icon={categories[category]}
				title={category}
				items={filteredDocs[category]}
				class={i > 0 ? 'mt-2' : ''}
			/>
		{/each}

		<ThemeSwitch class={open ? 'mt-2' : 'flow-grow pt-2'} />
		<li class="text-00 text-left py-1">
			Made with ♥️ by <a href="https://crinkles.io">Crinkles</a>
		</li>
	</ul>
</nav>

<style>
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
