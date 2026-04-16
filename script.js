// 1. Initialize Supabase (Get these from your Supabase Project Settings > API)
const supabaseUrl = 'https://abnzrayocxbnlssjunbh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibnpyYXlvY3hibmxzc2p1bmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjczNDcsImV4cCI6MjA5MTkwMzM0N30.WVxojJMkNDXjlsUPHCAPviPBd4OP6Q3rSDvS_hV0BwI';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const modal = document.getElementById('reportModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const itemForm = document.getElementById('itemForm');
const reportsGrid = document.getElementById('reportsGrid');

// Modal Logic
openBtn.onclick = () => modal.classList.remove('hidden');
closeBtn.onclick = () => modal.classList.add('hidden');

// Fetch Items from Supabase
async function fetchItems() {
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch error:', error);
        return;
    }

    reportsGrid.innerHTML = data.map(item => `
        <div class="card bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div class="bg-gray-50 rounded-2xl h-32 flex items-center justify-center mb-4">
                <i class="fas ${item.type === 'lost' ? 'fa-search' : 'fa-bullhorn'} text-4xl text-blue-400"></i>
            </div>
            <div class="flex justify-between items-start">
                <div>
                    <span class="badge ${item.type === 'lost' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}">
                        ${item.type}
                    </span>
                    <h4 class="font-bold text-gray-800 mt-2">${item.title}</h4>
                    <p class="text-xs text-gray-400 font-medium"><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle Form Submission
itemForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = itemForm.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Uploading...';

    const newItem = {
        title: document.getElementById('itemTitle').value,
        type: document.getElementById('itemType').value,
        location: document.getElementById('itemLocation').value,
        description: document.getElementById('itemDesc').value,
        status: 'Active'
    };

    const { error } = await supabase.from('items').insert([newItem]);

    if (error) {
        alert("Error: " + error.message);
    } else {
        itemForm.reset();
        modal.classList.add('hidden');
        fetchItems(); // Refresh view
    }
    submitBtn.innerText = 'Submit';
};

// Initial Load
fetchItems();
