// Kite UI - JavaScript Functions

// Stock data for market watch
const stockData = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.80, change: 1.25 },
    { symbol: "TCS", name: "Tata Consultancy", price: 3892.45, change: -0.45 },
    { symbol: "INFY", name: "Infosys Ltd", price: 1523.60, change: 0.89 },
    { symbol: "SBIN", name: "State Bank", price: 612.30, change: -1.12 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1645.20, change: 0.56 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 945.75, change: -0.78 },
    { symbol: "WIPRO", name: "Wipro Ltd", price: 425.90, change: 1.45 },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2678.30, change: 0.32 },
    { symbol: "ITC", name: "ITC Ltd", price: 432.15, change: -0.25 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra", price: 1789.60, change: 0.67 }
];

// Holdings data
const holdingsData = [
    { symbol: "RELIANCE", name: "Reliance Industries", qty: 50, avg: 2350.00, ltp: 2456.80, chg: 1.25, val: 122840, pnl: 5340 },
    { symbol: "TCS", name: "Tata Consultancy", qty: 25, avg: 3750.00, ltp: 3892.45, chg: -0.45, val: 97311, pnl: 3561 },
    { symbol: "INFY", name: "Infosys Ltd", qty: 100, avg: 1450.00, ltp: 1523.60, chg: 0.89, val: 152360, pnl: 7360 },
    { symbol: "SBIN", name: "State Bank of India", qty: 200, avg: 580.00, ltp: 612.30, chg: -1.12, val: 122460, pnl: 6460 }
];

// Positions data
const positionsData = [
    { symbol: "RELIANCE", type: "Buy", qty: 50, avg: 2440.00, ltp: 2456.80, chg: 0.68, pnl: 840 },
    { symbol: "INFY", type: "Sell", qty: 50, avg: 1510.00, ltp: 1523.60, chg: 0.90, pnl: 680 },
    { symbol: "TCS", type: "Buy", qty: 25, avg: 3850.00, ltp: 3892.45, chg: 1.10, pnl: 1061 }
];

// Orders data
const ordersData = [
    { orderId: "ORD-001", symbol: "RELIANCE", type: "Buy", qty: 10, price: 2445.00, status: "Executed", time: "10:30:25" },
    { orderId: "ORD-002", symbol: "INFY", type: "Sell", qty: 25, price: 1520.00, status: "Executed", time: "11:15:42" },
    { orderId: "ORD-003", symbol: "TCS", type: "Buy", qty: 15, price: 3875.00, status: "Pending", time: "13:20:10" },
    { orderId: "ORD-004", symbol: "SBIN", type: "Sell", qty: 50, price: 615.00, status: "Cancelled", time: "14:45:30" }
];

// Login function
function login() {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    
    if (userId && password) {
        localStorage.setItem('kite_auth', 'true');
        localStorage.setItem('kite_user', userId);
        showApp();
    } else {
        alert('Please enter User ID and Password');
    }
}

// Show main app after login
function showApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appPage').classList.add('active');
    
    const user = localStorage.getItem('kite_user') || 'User';
    document.getElementById('userName').textContent = user;
    
    renderMarketWatch();
    renderHoldings();
    renderPositions();
    renderOrders();
    initChart();
}

// Logout function
function logout() {
    localStorage.removeItem('kite_auth');
    localStorage.removeItem('kite_user');
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('appPage').classList.remove('active');
}

// Render market watch sidebar
function renderMarketWatch() {
    const watchList = document.getElementById('watchList');
    watchList.innerHTML = '';
    
    stockData.forEach(stock => {
        const isPositive = stock.change >= 0;
        const item = document.createElement('div');
        item.className = 'stock-item';
        item.innerHTML = `
            <div>
                <div class="stock-name">${stock.symbol}</div>
                <div class="stock-symbol">${stock.name}</div>
            </div>
            <div class="stock-price">
                <div class="price">₹${stock.price.toFixed(2)}</div>
                <div class="change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '▲' : '▼'} ${Math.abs(stock.change).toFixed(2)}%
                </div>
            </div>
        `;
        watchList.appendChild(item);
    });
}

// Render holdings table
function renderHoldings() {
    const tbody = document.getElementById('holdingsTable');
    tbody.innerHTML = '';
    
    let totalVal = 0;
    let totalPnl = 0;
    
    holdingsData.forEach(holding => {
        totalVal += holding.val;
        totalPnl += holding.pnl;
        
        const isPositive = holding.chg >= 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="symbol-cell">${holding.symbol}<br><span style="color:#787b86;font-size:11px">${holding.name}</span></td>
            <td class="qty-cell">${holding.qty}</td>
            <td class="price-cell">₹${holding.avg.toFixed(2)}</td>
            <td class="price-cell">₹${holding.ltp.toFixed(2)}</td>
            <td class="chng-cell ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}${holding.chg.toFixed(2)}%</td>
            <td class="price-cell">₹${holding.val.toLocaleString()}</td>
            <td class="chng-cell ${holding.pnl >= 0 ? 'positive' : 'negative'}">₹${holding.pnl.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
    
    document.getElementById('totalValue').textContent = `₹${totalVal.toLocaleString()}`;
    const pnlEl = document.getElementById('totalPnl');
    pnlEl.textContent = `₹${totalPnl.toLocaleString()}`;
    pnlEl.className = `summary-value ${totalPnl >= 0 ? 'positive' : 'negative'}`;
}

// Render positions table
function renderPositions() {
    const tbody = document.getElementById('positionsTable');
    tbody.innerHTML = '';
    
    positionsData.forEach(pos => {
        const isPositive = pos.pnl >= 0;
        const isBuy = pos.type === 'Buy';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="symbol-cell">${pos.symbol}</td>
            <td><span class="order-type ${isBuy ? 'buy' : 'sell'}">${pos.type}</span></td>
            <td class="qty-cell">${pos.qty}</td>
            <td class="price-cell">₹${pos.avg.toFixed(2)}</td>
            <td class="price-cell">₹${pos.ltp.toFixed(2)}</td>
            <td class="chng-cell ${pos.chg >= 0 ? 'positive' : 'negative'}">${pos.chg >= 0 ? '+' : ''}${pos.chg.toFixed(2)}%</td>
            <td class="pnl-cell ${isPositive ? 'positive' : 'negative'}">₹${pos.pnl.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Render orders table
function renderOrders() {
    const tbody = document.getElementById('ordersTable');
    tbody.innerHTML = '';
    
    ordersData.forEach(order => {
        const isBuy = order.type === 'Buy';
        const isExecuted = order.status === 'Executed';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="symbol-cell">${order.orderId}</td>
            <td class="symbol-cell">${order.symbol}</td>
            <td><span class="order-type ${isBuy ? 'buy' : 'sell'}">${order.type}</span></td>
            <td class="qty-cell">${order.qty}</td>
            <td class="price-cell">₹${order.price.toFixed(2)}</td>
            <td><span class="order-status">${order.status}</span></td>
            <td class="qty-cell">${order.time}</td>
        `;
        tbody.appendChild(row);
    });
}

// Navigation between sections
function showSection(section) {
    // Hide all sections
    document.getElementById('holdingsSection').classList.remove('active');
    document.getElementById('positionsSection').classList.remove('active');
    document.getElementById('ordersSection').classList.remove('active');
    
    // Remove active class from nav links
    document.querySelectorAll('.header-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(section + 'Section').classList.add('active');
    document.getElementById('nav-' + section).classList.add('active');
    
    // Update title
    const titles = {
        'holdings': 'Holdings',
        'positions': 'Positions',
        'orders': 'Order History'
    };
    document.getElementById('contentTitle').textContent = titles[section];
}

// Initialize Chart
function initChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    
    // Generate sample data
    const labels = ['9:15', '9:30', '9:45', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:15', '15:30'];
    const data = [24500, 24620, 24580, 24700, 24850, 24780, 24900, 24850, 24950, 25020, 24980, 25100, 25050, 25150, 25200];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'NIFTY 50',
                data: data,
                borderColor: '#00b894',
                backgroundColor: 'rgba(0, 184, 148, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e222d',
                    titleColor: '#d1d4dc',
                    bodyColor: '#d1d4dc',
                    borderColor: '#2a2e39',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#2a2e39',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#787b86',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: '#2a2e39',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#787b86',
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Search functionality
function searchStocks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.stock-item');
    
    items.forEach(item => {
        const symbol = item.querySelector('.stock-name').textContent.toLowerCase();
        const name = item.querySelector('.stock-symbol').textContent.toLowerCase();
        
        if (symbol.includes(query) || name.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('kite_auth')) {
        showApp();
    }
});