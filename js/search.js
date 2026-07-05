const searchIndex = [
    { title: "CS Khatian Guide", desc: "Understanding Cadastral Survey records in Bangladesh", url: "/index.html#topics" },
    { title: "SA Porcha Verification", desc: "State Acquisition survey documentation steps", url: "/index.html#topics" },
    { title: "RS Record Verification", desc: "Revisional Survey maps and ledger instructions", url: "/index.html#topics" },
    { title: "Namjari / Mutation Process", desc: "Step by step guide to update land ownership title", url: "/index.html#topics" },
    { title: "Land Development Tax Payment", description: "Online registration and tax processing system", url: "/index.html#topics" },
    { title: "Rangpur District Land Office", desc: "Contact details and service matrix for Rangpur sadar", url: "/index.html#districts" },
    { title: "Dinajpur Registry Office Rules", desc: "Deed processing rules and cost estimation", url: "/index.html#districts" }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');

    if (searchBox && searchResults) {
        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const filtered = searchIndex.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                searchResults.innerHTML = `<div class="search-result-item" style="color:var(--text-muted)">No matching records found.</div>`;
            } else {
                filtered.forEach(item => {
                    const div = document.createElement('a');
                    div.href = item.url;
                    div.className = 'search-result-item';
                    div.innerHTML = `<strong>${item.title}</strong><br><small style="color:var(--text-muted)">${item.desc}</small>`;
                    searchResults.appendChild(div);
                });
            }
            searchResults.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
});