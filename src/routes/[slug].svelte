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
	$: createdAt = new Date(doc.createdAt).toLocaleString();
</script>

<Page title={doc.title}>
	<div>
		<article class="center center-g-1 center-w-3 py-1 shadow bg-gray-100 flow-y flow-g-1">
			{@html doc.html}
		</article>
	</div>

	<div class="p-1 flex-col">
		<span class="text-00 monospace uppercase text-green-200">Category:</span>
		<div class="flex-row items-center">
			<Icon
				class="text-gray-400"
				name={categories[doc.category] || 'circle'}
				attrs={{ height: 18 }}
			/>
			<span class="capitalize ml-00">{doc.category}</span>
		</div>

		{#if doc.source}
			<span class="text-00 monospace uppercase mt-1 text-green-200">Source:</span>
			<div class="flex-row items-center">
				<Icon class="text-gray-400" name="github" attrs={{ height: 18 }} />
				<a class="underline ml-00" href={doc.source}>{doc.source}</a>
			</div>
		{/if}
		<span class="text-00 monospace uppercase mt-1 text-green-200">Last modified:</span>
		<div class="flex-row items-center">
			<Icon class="text-gray-400" name="calendar" attrs={{ height: 18 }} />
			<span class="capitalize ml-00">{modifiedAt}</span>
		</div>
	</div>
</Page>

<style>
	article {
		max-width: var(--size-3);
	}

	.capitalize {
		text-transform: capitalize;
	}

	a.underline {
		text-decoration: underline;
	}
</style>
