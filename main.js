// Variables globales
let currentLanguage = "es"
const lucide = window.lucide // Declare lucide variable
const translations1 = {
  es: {
    welcome: "Bienvenido",
    contact: "Contacto",
  },
  en: {
    welcome: "Welcome",
    contact: "Contact",
  },
} // Declare translations variable

// Inicialización
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("emailModal");
  const openBtn = document.getElementById("openEmailModal");
  const closeBtn = document.getElementById("closeEmailModal");
  const copyBtn = document.getElementById("copyEmailBtn");
  const copyMsg = document.getElementById("copySuccess");
  const emailText = document.getElementById("emailText").innerText;

  openBtn?.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
    copyMsg.classList.add("hidden");
  });

  copyBtn?.addEventListener("click", () => {
    navigator.clipboard.writeText(emailText).then(() => {
      copyMsg.classList.remove("hidden");
    });
  });

  // Cerrar modal si clicás fuera del contenido
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      copyMsg.classList.add("hidden");
    }
  });
  // Inicializar iconos de Lucide
  lucide.createIcons()

  // Cargar idioma guardado
  loadSavedLanguage()

  // Configurar eventos
  setupEventListeners()

  // Configurar animaciones
  setupScrollAnimations()

  // Aplicar traducciones iniciales
  applyTranslations()

  // Ejecutar efectos adicionales
  addHoverEffects()

  // Configurar el botón de descarga de CV
  const downloadButton = document.getElementById("downloadCV")
  if (downloadButton) {
    console.log("Download button found, setting up event listener")
    downloadButton.addEventListener("click", downloadCV)
  }

  const contactButton = document.getElementById("contactButton");
  if (contactButton) {
    contactButton.addEventListener("click", () => {
      const footer = document.getElementById("contacto");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // const emailButton = document.getElementById("sendEmail");
  // if (emailButton) {
  //   emailButton.addEventListener("click", enviarEmail);
  // }
})

// Cargar idioma guardado del localStorage
function loadSavedLanguage() {
  const savedLanguage = localStorage.getItem("language")
  if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
    currentLanguage = savedLanguage
  }
  updateLanguageButton()
}

// Configurar event listeners
function setupEventListeners() {
  const languageToggle = document.getElementById("languageToggle")
  if (languageToggle) {
    languageToggle.addEventListener("click", toggleLanguage)
  }

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Configurar animaciones de scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observar todos los elementos con clase fade-in
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el)
  })
}

// Cambiar idioma
function toggleLanguage() {
  currentLanguage = currentLanguage === "es" ? "en" : "es"
  localStorage.setItem("language", currentLanguage)
  updateLanguageButton()
  applyTranslations()
}

// Actualizar botón de idioma
function updateLanguageButton() {
  const languageText = document.getElementById("languageText")
  if (languageText) {
    languageText.textContent = currentLanguage === "es" ? "EN" : "ES"
  }

  // Actualizar el atributo lang del HTML
  document.documentElement.lang = currentLanguage
}

// Aplicar traducciones
function applyTranslations() {
  const elements = document.querySelectorAll("[data-translate]")

  elements.forEach((element) => {
    const key = element.getAttribute("data-translate")
    const translation = getTranslation(key)

    if (translation) {
      element.textContent = translation
    }
  })
}

// Obtener traducción por clave
function getTranslation(key) {
  const keys = key.split(".")
  let value = translations[currentLanguage]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

// Funciones de utilidad para efectos adicionales
function addHoverEffects() {
  // Efecto hover para las tarjetas
  document.querySelectorAll(".card-hover").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

// Función para manejar el formulario de contacto (placeholder)
function handleContactForm() {
  // Aquí puedes agregar la lógica para manejar el formulario de contacto
  console.log("Formulario de contacto enviado")
}

// Función para descargar CV (placeholder)
// function downloadCV() {
//   // Aquí puedes agregar la lógica para descargar el CV
//   console.log("Descargando CV...")
// }

function downloadCV() {
  // const url = 'https://pablofbc.github.io/CV.pdf'; // PDF es el mismo
  // const fileName = getTranslation("hero.fileName"); // Nombre según idioma

  // const link = document.createElement('a');
  // link.href = url;
  // link.download = fileName;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  console.log("Se descargo el CV correctamente")
}

function enviarEmail() {
  const destinatario = "pablofbc@gmail.com";
  const asunto = encodeURIComponent("Consulta desde tu página");
  const cuerpo = encodeURIComponent("Hola Pablo, me gustaría saber más sobre...");

  window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
}

