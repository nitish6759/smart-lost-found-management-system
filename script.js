// 1. Initialize Supabase (Get these from your Supabase Project Settings > API)
const supabaseUrl = 'https://abnzrayocxbnlssjunbh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibnpyYXlvY3hibmxzc2p1bmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjczNDcsImV4cCI6MjA5MTkwMzM0N30.WVxojJMkNDXjlsUPHCAPviPBd4OP6Q3rSDvS_hV0BwI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const reportsGrid = document.getElementById('reportsGrid');

    // 2. Function to fetch items from Database
    async function fetchItems() {
        const { data: items, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching:', error);
            return;
        }

        renderItems(items);
    }

    // 3. Function to display items in HTML
    function renderItems(items) {
        reportsGrid.innerHTML = ''; // Clear loader
        items.forEach(item => {
            reportsGrid.innerHTML += `
                <div class="card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div class="bg-gray-50 rounded-xl h-32 flex items-center justify-center mb-4 text-4xl">
                        ${item.type === 'lost' ? '❓' : '📱'}
                    </div>
                    <span class="badge-${item.status}">${item.status}</span>
                    <h4 class="font-bold text-gray-800 mt-2">${item.title}</h4>
                </div>
            `;
        });
    }

    fetchItems();
});
