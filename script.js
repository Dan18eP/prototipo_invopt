let currentScreen = 'login';

function showScreen(screenId) {
    // Oculta la pantalla actual con tu animación
    const current = document.getElementById(currentScreen);
    if (current) {
        current.classList.remove('active');
        current.classList.add('prev');
    }
 
    // Actualiza el navbar activo en todos los navs
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-blue-600', 'bg-blue-50', 'border-r-2', 'border-blue-600');
        link.classList.add('text-gray-600');
    });
 
    // Aplica estilos activos al enlace seleccionado
    document.querySelectorAll(`nav a[onclick="showScreen('${screenId}')"]`).forEach(activeLink => {
        activeLink.classList.remove('text-gray-600');
        activeLink.classList.add('text-blue-600', 'bg-blue-50', 'border-r-2', 'border-blue-600');
    });
 
    // Muestra la nueva pantalla después de un breve retardo
    setTimeout(() => {
        if (current) current.classList.remove('prev');
        const newScreen = document.getElementById(screenId);
        if (newScreen) newScreen.classList.add('active');
        currentScreen = screenId;
    }, 250);
}

// Add some interactive feedback
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Update time and date
function updateDateTime() {
    const now = new Date();
    
    // Format time (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `🕐 ${hours}:${minutes}`;
    
    // Format date
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateString = `📅 ${dayName}, ${day} ${month} ${year}`;
    
    // Update all time elements
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
    
    // Update all date elements
    const dateElements = document.querySelectorAll('.current-date');
    dateElements.forEach(el => {
        el.textContent = dateString;
    });
}

// Update time every minute
setInterval(updateDateTime, 60000);

// Initialize time on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
});

// Add some interactive feedback
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Función para manejar sidebar colapsable
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Expande en hover
    sidebar.addEventListener('mouseenter', function() {
        sidebar.classList.add('expanded');
        // Actualizar estado activo si es necesario
        updateActiveNav();
    });
    
    // Colapsa al salir hover
    sidebar.addEventListener('mouseleave', function() {
        sidebar.classList.remove('expanded');
    });
    
    // Función para actualizar el enlace activo (basado en pantalla actual)
    function updateActiveNav() {
        const currentScreen = document.querySelector('.screen.active').id;
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-blue-600', 'bg-blue-50', 'border-r-2', 'border-blue-600');
            const targetScreen = link.getAttribute('onclick').match(/'([^']+)'/)[1];
            if (targetScreen === currentScreen) {
                link.classList.add('active', 'text-blue-600', 'bg-blue-50', 'border-r-2', 'border-blue-600');
            }
        });
    }
    
    // Inicializar estado activo al cargar
    updateActiveNav();
    
    // Llamar updateActiveNav después de showScreen (agregar esto a la función showScreen existente)
    const originalShowScreen = window.showScreen;
    window.showScreen = function(screenId) {
        originalShowScreen(screenId);
        setTimeout(updateActiveNav, 100); // Pequeño delay para transición
    };
});

// Si showScreen no existe, agregar esta función básica (del HTML original)
if (typeof showScreen === 'undefined') {
    window.showScreen = function(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    };
}
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar-reports');
    const mainContent = document.getElementById('reports-content');
    
    if (!sidebar || !mainContent) return;
    
    // Inicial: Colapsado
    sidebar.classList.remove('sidebar-expanded');
    mainContent.style.marginLeft = '64px';
    
    // Expande en hover (JS para override si CSS falla)
    sidebar.addEventListener('mouseenter', function() {
        sidebar.classList.add('sidebar-expanded');
        mainContent.style.marginLeft = '256px';
        console.log('Sidebar reports expandido - Bloque blanco crece'); // Debug
    });
    
    // Reduce al salir
    sidebar.addEventListener('mouseleave', function() {
        sidebar.classList.remove('sidebar-expanded');
        mainContent.style.marginLeft = '64px';
        console.log('Sidebar reports colapsado - Bloque blanco se reduce'); // Debug
    });
    
    // Actualizar activo al mostrar reports (integra con showScreen)
    const originalShowScreen = window.showScreen;
    window.showScreen = function(screenId) {
        originalShowScreen(screenId);
        if (screenId === 'reports') {
            // Resalta 'reports' y colapsa inicial
            document.querySelector('#nav-reports .nav-link[onclick*="reports"]').classList.add('active', 'text-blue-600', 'bg-blue-50', 'border-r-2', 'border-blue-600');
            sidebar.classList.remove('sidebar-expanded');
            mainContent.style.marginLeft = '64px';
        }
    };
});

function submitSupportForm() {
    const name = document.getElementById('supportName').value.trim();
    const email = document.getElementById('supportEmail').value.trim();
    const subject = document.getElementById('supportSubject').value.trim();
    const message = document.getElementById('supportMessage').value.trim();
 
    if (!name || !email || !subject || !message) {
        alert('⚠️ Por favor completa todos los campos antes de enviar.');
        return;
    }
 
    alert(`✅ Gracias, ${name}. Tu solicitud ha sido enviada con éxito.`);
    document.getElementById('supportForm').reset();
}
 
// --- SISTEMA DE SIDEBAR RESPONSIVE POR PANTALLA ---

function toggleSidebar() {
  // Detecta la pantalla activa
  const activeScreen = document.querySelector(".screen.active");
  if (!activeScreen) return;

  const sidebar = activeScreen.querySelector("#sidebar");
  const menuToggle = activeScreen.querySelector("#menu-toggle");

  if (!sidebar || !menuToggle) return;

  // Alterna visibilidad del sidebar
  sidebar.classList.toggle("-translate-x-full");

  // Cambia el ícono del botón
  if (sidebar.classList.contains("-translate-x-full")) {
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Abrir menú");
  } else {
    menuToggle.textContent = "✖️";
    menuToggle.setAttribute("aria-label", "Cerrar menú");
  }
}

// Detecta clic en botón del menú solo dentro de la pantalla activa
function initResponsiveSidebar(screenId) {
  const screen = document.getElementById(screenId);
  if (!screen) return;

  const menuToggle = screen.querySelector("#menu-toggle");
  if (menuToggle) {
    menuToggle.onclick = toggleSidebar;
  }
}

// --- Integración con tu sistema de pantallas ---

// Guarda referencia original
const originalShowScreen = window.showScreen;

// Redefine showScreen con integración responsive
window.showScreen = function (screenId) {
  originalShowScreen(screenId);

  // Inicializa el botón de menú solo en la pantalla visible
  setTimeout(() => initResponsiveSidebar(screenId), 100);
};

// --- Cierra el sidebar si se hace clic fuera (solo en móvil) ---
document.addEventListener("click", (event) => {
  const activeScreen = document.querySelector(".screen.active");
  if (!activeScreen) return;

  const sidebar = activeScreen.querySelector("#sidebar");
  const menuToggle = activeScreen.querySelector("#menu-toggle");

  if (
    sidebar &&
    menuToggle &&
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target) &&
    window.innerWidth < 768 &&
    !sidebar.classList.contains("-translate-x-full")
  ) {
    sidebar.classList.add("-translate-x-full");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});

function initAgenteInvopt() {
  // Crear contenedor principal
  const aiAgent = document.createElement("div");
  aiAgent.id = "ai-agent";
  aiAgent.className = "fixed bottom-6 right-6 z-50";
  aiAgent.innerHTML = `
    <!-- Botón -->
    <button
      id="toggle-chat"
      class="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-110"
      aria-label="Abrir chat"
    >
      🤖
    </button>

    <!-- Ventana del chat -->
    <div
      id="chat-window"
      class="hidden flex flex-col bg-white shadow-2xl rounded-2xl w-80 h-96 absolute bottom-16 right-0 border border-gray-200 overflow-hidden"
    >
      <div class="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
        <span>Agente Invopt</span>
        <button id="close-chat" class="text-white text-lg">&times;</button>
      </div>
      <div id="chat-body" class="flex-1 p-3 overflow-y-auto text-sm space-y-2">
        <div class="bg-blue-100 text-gray-800 p-2 rounded-lg w-fit">
          👋 ¡Hola! Soy el Agente Invopt. ¿En qué puedo ayudarte?
        </div>
      </div>
      <div class="p-3 border-t flex gap-2">
        <input
          id="chat-input"
          type="text"
          placeholder="Escribe tu mensaje..."
          class="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="send-chat"
          class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
        >
          ➤
        </button>
      </div>
    </div>
  `;

  // Insertar en el body
  document.body.appendChild(aiAgent);

  // Referencias
  const toggleBtn = aiAgent.querySelector("#toggle-chat");
  const chatWindow = aiAgent.querySelector("#chat-window");
  const closeBtn = aiAgent.querySelector("#close-chat");
  const sendBtn = aiAgent.querySelector("#send-chat");
  const input = aiAgent.querySelector("#chat-input");
  const chatBody = aiAgent.querySelector("#chat-body");

  // Eventos
  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
  });

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "bg-gray-100 text-gray-800 p-2 rounded-lg w-fit self-end ml-auto";
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    input.value = "";

    setTimeout(() => {
      const aiMsg = document.createElement("div");
      aiMsg.className = "bg-blue-100 text-gray-800 p-2 rounded-lg w-fit";
      aiMsg.textContent = "Estoy procesando tu solicitud...";
      chatBody.appendChild(aiMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);

    chatBody.scrollTop = chatBody.scrollHeight;
  }
}
