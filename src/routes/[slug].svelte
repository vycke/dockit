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
	import Page from '$lib/components/Page.svelte';
	export let doc;

	$: modifiedAt = new Date(doc.modifiedAt).toLocaleString();
	$: createdAt = new Date(doc.createdAt).toLocaleString();
</script>

<Page title={doc.title}>
	<div class="center center-w-2 | shadow bg-gray-100 radius-000 p-1">{@html doc.html}</div>

	<div class="p-1 flex-col">
		<span class="text-00 monospace uppercase">Category:</span>
		<span class="capitalize">{doc.category}</span>
		{#if doc.source}
			<span class="text-00 monospace uppercase mt-1">Source:</span>
			<a class="underline" href={doc.source}>{doc.source}</a>
		{/if}
		<span class="text-00 monospace uppercase mt-1">Last modified:</span>
		<span>{modifiedAt}</span>
		<span class="text-00 monospace uppercase mt-1">Created:</span>
		<span>{createdAt}</span>
	</div>
</Page>

<style>
	.capitalize {
		text-transform: capitalize;
	}

	a.underline {
		text-decoration: underline;
	}
</style>
