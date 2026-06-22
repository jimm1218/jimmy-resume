// --- Modal Logic (Retained from original, enhanced with Chart.js integration) ---
window.myCharts = {};

function initModalChart(modalId) {
    const chartConfigs = {
        'modal-1': {
            canvasId: 'chart-member-analysis',
            type: 'doughnut',
            data: {
                labels: ['活躍會員', '新會員', '沉睡會員', '流失會員'],
                datasets: [{
                    data: [45, 18, 25, 12],
                    backgroundColor: [
                        'rgba(0, 242, 254, 0.75)',
                        'rgba(59, 130, 246, 0.75)',
                        'rgba(124, 58, 237, 0.75)',
                        'rgba(239, 68, 68, 0.75)'
                    ],
                    borderColor: '#0d111e',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9ca3af', font: { family: 'Inter, sans-serif', size: 12 } }
                    }
                }
            }
        },
        'modal-2': {
            canvasId: 'chart-data-pipeline',
            type: 'bar',
            data: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                datasets: [{
                    label: '每日資料處理量 (百萬行)',
                    data: [1.2, 1.5, 1.8, 1.4, 2.0, 0.8, 0.9],
                    backgroundColor: 'rgba(0, 242, 254, 0.55)',
                    borderColor: '#00f2fe',
                    borderWidth: 1.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } }
                },
                plugins: {
                    legend: { labels: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } }
                }
            }
        },
        'modal-3': {
            canvasId: 'chart-game-dau',
            type: 'line',
            data: {
                labels: ['06/15', '06/16', '06/17', '06/18', '06/19', '06/20', '06/21'],
                datasets: [{
                    label: '遊戲每日活躍用戶 (DAU)',
                    data: [45000, 48000, 42000, 51000, 56000, 62000, 58000],
                    backgroundColor: 'rgba(124, 58, 237, 0.15)',
                    borderColor: '#7c3aed',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } }
                },
                plugins: {
                    legend: { labels: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } }
                }
            }
        },
        'modal-4': {
            canvasId: 'chart-journey-funnel',
            type: 'bar',
            data: {
                labels: ['觸發人次', '成功發送', '點擊連結', '完成購買'],
                datasets: [{
                    label: '旅程轉換率 (%)',
                    data: [100, 85, 42, 15],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: '#3b82f6',
                    borderWidth: 1.5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } },
                    y: { grid: { display: false }, ticks: { color: '#9ca3af', font: { family: 'Inter, sans-serif' } } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        }
    };

    const config = chartConfigs[modalId];
    if (!config) return;

    const canvas = document.getElementById(config.canvasId);
    if (!canvas) return;

    // Destroy existing instance if active
    if (window.myCharts[config.canvasId]) {
        window.myCharts[config.canvasId].destroy();
    }

    // Wait a tiny fraction of a second for CSS display transition to start
    setTimeout(() => {
        window.myCharts[config.canvasId] = new Chart(canvas, {
            type: config.type,
            data: config.data,
            options: config.options
        });
    }, 150);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize the chart for this modal
        if (typeof Chart !== 'undefined') {
            initModalChart(modalId);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking on the overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeModal(overlay.id);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => closeModal(modal.id));
    }
});


// --- Interactive Canvas Particle Background ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interaction (gentle attraction)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius * 0.05;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }

            // Speed limit
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 1.2) {
                this.vx = (this.vx / speed) * 1.2;
                this.vy = (this.vy / speed) * 1.2;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 18000);
        for (let i = 0; i < Math.min(count, 100); i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const alpha = (130 - dist) / 130 * 0.08;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Mouse connection
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const alpha = (mouse.radius - dist) / mouse.radius * 0.15;
                    ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    resizeCanvas();
    animate();
});


// --- Scroll Reveal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    // Initial load check (reveal elements already visible in viewport)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});


// --- 3D Hover Tilt Effect on Portfolio Cards ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.banner-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside element
            const y = e.clientY - rect.top;  // y coordinate inside element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation degrees (-10 to 10 degrees)
            const rotateX = ((centerY - y) / centerY) * 8; 
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
});
