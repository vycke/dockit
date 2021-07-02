function group(docs) {
	let _docs = {};

	for (let i = 0; i < docs.length; i++) {
		const { category } = docs[i];

		if (!_docs[category]) _docs[category] = [];
		_docs[category].push(docs[i]);
		_docs[category].sort((a, b) => (a.label < b.label ? -1 : 1));
	}

	return _docs;
}

export default function search(docs, search = '') {
	if (!search) return docs;
	let _docs = [];
	Object.keys(docs).forEach((k) => _docs.push(...docs[k]));

	const tokens = search
		.toLowerCase()
		.split(' ')
		.map((s) => s.trim());

	let _filteredDocs = _docs.filter((d) => {
		return tokens.every(
			(t) =>
				d.label?.toLowerCase().includes(t) ||
				d.headers?.some((h) => h.label?.toLowerCase().includes(t))
		);
	});
	return group(_filteredDocs);
}
