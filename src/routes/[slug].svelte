<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`/api/${page.params.slug}.json`);
		if (res.ok) {
			const doc = await res.json();
			return { props: { doc } };
		}

		return {
			status: res.status,
			error: new Error(`Could not find document '${page.params.slug}'`)
		};
	}
</script>

<script>
	import Icon from '$lib/components/Icon.svelte';
	import Page from '$lib/components/Page.svelte';
	import { categories } from '$lib/constants';
	export let doc;

	$: modifiedAt = new Date(doc.modifiedAt).toLocaleString();
</script>

<Page title="{doc.category} > {doc.title}">
	<div class="panel-r panel-s-00 panel-w-3 panel-g-1">
		<article class="border-hover border-w-1 bg-back-secondary flow-y flow-g-1 radius-00 py-2">
			{@html doc.html}
		</article>

		<aside class="p-1 flex-col text-00">
			<span class="monospace uppercase text-accent">Outline:</span>
			{#each doc.headers as header}
				<a class="header" href="#{header.id}">» {header.label}</a>
			{/each}

			<span class="monospace uppercase text-accent mt-3">Category:</span>
			<div class="flex-row items-center">
				<Icon
					class="text-gray-400"
					name={categories[doc.category] || 'circle'}
					attrs={{ height: 18 }}
				/>
				<span class="capitalize ml-00">{doc.category}</span>
			</div>

			{#if doc.source}
				<span class="monospace uppercase mt-1 text-accent">Source:</span>
				<div class="flex-row items-center">
					<Icon class="text-gray-400" name="github" attrs={{ height: 18 }} />
					<a class="ml-00" href={doc.source}>{doc.source}</a>
				</div>
			{/if}
			<span class="monospace uppercase mt-1 text-accent">Last modified:</span>
			<div class="flex-row items-center">
				<Icon class="text-gray-400" name="calendar" attrs={{ height: 18 }} />
				<span class="capitalize ml-00">{modifiedAt}</span>
			</div>
		</aside>
	</div>
</Page>

<style>
	a.header:hover {
		font-weight: 600;
	}

	.capitalize {
		text-transform: capitalize;
	}

	:global(article h2 + p) {
		margin-top: var(--spacing-00) !important;
	}

	:global(article img) {
		max-width: min(100%, var(--center-width));
		padding-left: 0;
		padding-right: 0;
	}

	:global(article > :not(pre)) {
		padding-left: var(--spacing-1);
		padding-right: var(--spacing-1);
	}
</style>
