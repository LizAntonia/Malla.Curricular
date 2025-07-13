const malla = {
  "1° Semestre": [
    { nombre: "Software de gestión de datos" },
    { nombre: "Economía" },
    { nombre: "Administración" },
    { nombre: "Creatividad en los Negocios" },
    { nombre: "Formación Ciudadana" },
    { nombre: "Resolución de Problemas en Álgebra" }
  ],
  "2° Semestre": [
    { nombre: "Marketing" },
    { nombre: "Finanzas" },
    { nombre: "Contabilidad" },
    { nombre: "Ventas y Servicios" },
    { nombre: "Legislación Tributaria" },
    { nombre: "Funciones y Progresiones", prerequisitos: ["Resolución de Problemas en Álgebra"] }
  ],
  "3° Semestre": [
    { nombre: "Gestión de Personas" },
    { nombre: "Costo y Presupuesto" },
    { nombre: "Software ERP", prerequisitos: ["Contabilidad"] },
    { nombre: "Legislación Comercial" },
    { nombre: "Estadística", prerequisitos: ["Resolución de Problemas en Álgebra"] },
    { nombre: "Innovación y Emprendimiento" }
  ],
  "4° Semestre": [
    { nombre: "Software de Remuneraciones", prerequisitos: ["Gestión de Personas"] },
    { nombre: "Legislación Laboral" },
    { nombre: "Electivo Tendencias Sector I" },
    { nombre: "Electivo Tendencias Sector II" },
    { nombre: "Proyecto Integrado", prerequisitos: ["Marketing", "Finanzas"] },
    { nombre: "Inglés Inicial" }
  ],
  "5° Semestre": [
    { nombre: "Liderazgo y Trabajo en Equipo" },
    { nombre: "Finanzas para la Toma de Decisiones", prerequisitos: ["Finanzas"] },
    { nombre: "Dirección de Personas" },
    { nombre: "Cálculo Diferencial", prerequisitos: ["Funciones y Progresiones"] },
    { nombre: "Probabilidad", prerequisitos: ["Estadística"] },
    { nombre: "Innovación y Emprendimiento II", prerequisitos: ["Innovación y Emprendimiento"] }
  ],
  "6° Semestre": [
    { nombre: "Economía para la Gestión" },
    { nombre: "Formulación y Evaluación de Proyectos" },
    { nombre: "Gestión de Proyectos" },
    { nombre: "Gestión del Cambio", prerequisitos: ["Dirección de Personas"] },
    { nombre: "Estadística Inferencial", prerequisitos: ["Probabilidad"] },
    { nombre: "Inglés Habilitante", prerequisitos: ["Inglés Inicial"] }
  ],
  "7° Semestre": [
    { nombre: "Investigación de Mercados", prerequisitos: ["Probabilidad"] },
    { nombre: "Planificación Estratégica y Control de Gestión" },
    { nombre: "Entorno Económico" },
    { nombre: "Marketing Estratégico" },
    { nombre: "Simulación de Negocios", prerequisitos: ["Finanzas para la Toma de Decisiones"] },
    { nombre: "Inglés Intermedio", prerequisitos: ["Inglés Habilitante"] }
  ],
  "8° Semestre": [
    { nombre: "Business Analytics" },
    { nombre: "Sostenibilidad en los Negocios" },
    { nombre: "Electivo Tendencias Sector III" },
    { nombre: "Electivo Tendencias Sector IV" },
    { nombre: "Proyecto de Título Profesional", prerequisitos: ["Marketing Estratégico", "Formulación y Evaluación de Proyectos"] },
    { nombre: "Innovación y Emprendimiento III", prerequisitos: ["Innovación y Emprendimiento II"] }
  ]
};

const contenedor = document.getElementById("contenedor-malla");
let completadas = JSON.parse(localStorage.getItem("materiasCompletadas")) || [];

function cumpleRequisitos(prerequisitos) {
  if (!prerequisitos) return true;
  return prerequisitos.every(r => completadas.includes(r));
}

function renderMalla() {
  contenedor.innerHTML = "";
  Object.entries(malla).forEach(([semestre, ramos]) => {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    semestreDiv.appendChild(titulo);

    ramos.forEach((ramo) => {
      if (!cumpleRequisitos(ramo.prerequisitos)) return; // No mostrar si no cumple

      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      ramoDiv.textContent = ramo.nombre;

      if (completadas.includes(ramo.nombre)) {
        ramoDiv.classList.add("completado");
      }

      ramoDiv.onclick = () => {
        ramoDiv.classList.toggle("completado");

        const nombre = ramo.nombre;
        if (completadas.includes(nombre)) {
          completadas = completadas.filter(r => r !== nombre);
        } else {
          completadas.push(nombre);
        }

        localStorage.setItem("materiasCompletadas", JSON.stringify(completadas));
        renderMalla(); // Volver a renderizar para mostrar nuevos habilitados
      };

      semestreDiv.appendChild(ramoDiv);
    });

    contenedor.appendChild(semestreDiv);
  });
}

renderMalla();
