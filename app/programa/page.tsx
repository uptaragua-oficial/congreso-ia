"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Define una interfaz para la estructura de una actividad
interface Activity {
  time: string;
  title: string;
  speakers?: string | string[];
  location?: string;
  type: 'Registro' | 'Conferencia' | 'Panel' | 'Ponencia' | 'Receso' | 'Bootcamp' | 'Sesión de Preguntas y Respuestas' | 'Póster' | 'Ceremonia';
}

// Define colores para cada tipo de actividad
const activityColors: { [key: string]: string } = {
  'Registro': 'bg-blue-100 dark:bg-blue-900/20',
  'Conferencia': 'bg-green-100 dark:bg-green-900/20',
  'Panel': 'bg-yellow-100 dark:bg-yellow-900/20',
  'Ponencia': 'bg-purple-100 dark:bg-purple-900/20',
  'Receso': 'bg-gray-100 dark:bg-gray-800/20',
  'Bootcamp': 'bg-red-100 dark:bg-red-900/20',
  'Sesión de Preguntas y Respuestas': 'bg-indigo-100 dark:bg-indigo-900/20',
  'Póster': 'bg-teal-100 dark:bg-teal-900/20',
  'Ceremonia': 'bg-pink-100 dark:bg-pink-900/20',
};

// Define iconos para cada tipo de actividad
const activityIcons: { [key: string]: string } = {
  'Registro': '📝',
  'Conferencia': '🎤',
  'Panel': '🗣️🗣️🗣️',
  'Ponencia': '🗣️',
  'Receso': '☕',
  'Bootcamp': '💻',
  'Sesión de Preguntas y Respuestas': '❓',
  'Póster': '🖼️',
  'Ceremonia': '🎉',
};

export default function ProgramaPage() {
  // Estado para controlar el día seleccionado y su descripción completa
  // Se inicializa con el valor del Día 1 con el mensaje adicional
  const [selectedDayText, setSelectedDayText] = useState('Lunes, 14 de julio de 2025 (Seleccione los otros días para ver su contenido)');

  // Función para manejar el cambio de día
  const handleDayChange = (value: string) => {
    switch (value) {
      case 'dia1':
        setSelectedDayText('Lunes, 14 de julio de 2025 (Seleccione los otros días para ver su contenido)');
        break;
      case 'dia2':
        setSelectedDayText('Martes, 15 de julio de 2025 (Seleccione los otros días para ver su contenido)');
        break;
      case 'dia3':
        setSelectedDayText('Sábado, 19 de julio de 2025 (Seleccione los otros días para ver su contenido)');
        break;
      default:
        setSelectedDayText('');
    }
  };

  const day1ActivitiesConferenceRoom: Activity[] = [
    { time: '8:00 AM - 9:00 AM', title: 'Registro de participantes', location: 'Pasillo principal, frente al salón de usos múltiples.', type: 'Registro' },
    { time: '9:00 AM - 9:15 AM', title: 'Ceremonia de apertura', speakers: 'Dra. Bettys Muñoz - Rectora de la Universidad Politécnica Territorial del Estado Aragua “Federico Brito Figueroa”', type: 'Ceremonia' },
    { time: '9:15 AM - 9:35 AM', title: 'Conferencia: "Retos y oportunidades de la IA Generativa en Venezuela"', speakers: 'Dr. Jimy Santana. Coordinador del Postgrado en Informática de la UPT Aragua. Vicerrector Académico de la UPT Aragua.', type: 'Conferencia' },
    { time: '9:35 AM - 10:00 AM', title: 'Panel de discusión: "El rol del sector universitario en una estrategia nacional de IA Generativa"', speakers: ['Dra. Bettys Muñoz. Rectora de la Universidad Politécnica Territorial del Estado Aragua “Federico Brito Figueroa”', 'Dr. Pedro Vicente Calderon. Rector de la Universidad Politécnica Territorial de los Altos Mirandinos “Cecilio Acosta”', 'Dr. Benito Hamidian. Decano de la Facultad de Ciencias Económicas y Sociales de la Universidad de Carabobo.'], type: 'Panel' },
    { time: '10:00 AM - 10:15 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
    { time: '10:15 AM - 10:30 AM', title: 'Receso – Café', type: 'Receso' },
    { time: '10:30 AM - 10:50 AM', title: 'Ponencia: "Prompt Engineering"', speakers: 'AI Engineer. Msc. Antonio Romero. Profesor Invitado UNI (Perú), UCEMA (Argentina) | Conferencista internacional.', type: 'Ponencia' },
    { time: '10:50 AM – 11:05 AM', title: 'Ponencia: Impacto y desafíos éticos de la Inteligencia Artificial en la Educación Abierta y a Distancia: El Caso de la asignatura "Introducción a la Ingeniería de Sistemas" en la Universidad Nacional Abierta .', speakers: 'Alexander Hoyo. Universidad Nacional Abierta UNA', type: 'Ponencia' },
    { time: '11:05 AM – 11:20 AM', title: 'Ponencia: “Estrategias de Evaluación Docente Asistidas por Inteligencia Artificial: Un Enfoque para Mejorar la Enseñanza” .', speakers: 'Ingeniera Jenny Mayora. Estudiante del Postgrado en Informática UPT Aragua', type: 'Ponencia' },
    { time: '11:20 AM – 11:35 AM', title: 'Ponencia: “Importancia, usos y expectativas de la Inteligencia Artificial en la Robótica Educativa”', speakers: 'Ing. Abraham Romero. Estudiante del Postgrado en Informática UPT Aragua', type: 'Ponencia' },
    { time: '11:35 – 11:50 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
  ];

  const day1ActivitiesThematicRoom: Activity[] = [
    { time: '10:00 AM - 10:15 AM', title: 'Desarrollo de una Herramienta Didáctica Basada en Inteligencia Artificial para el Diagnóstico de Patologías Cardíacas Vinculada a un Electrocardiograma en el Laboratorio de Electro medicina de la UPTA FBF', speakers: 'Profa. Ing. Maryessy Torrealba. Estudiante del Postgrado en Informática UPT Aragua.', type: 'Ponencia' },
    { time: '10:30 AM - 10:50 AM', title: 'Panel: "Usos y aplicaciones de la IA para el sector eléctrico"', speakers: ['Prof. Ing. Msc. Luis Díaz. UPT Aragua', 'Profa. Ing. Msc. Greysmar Teriffe. UPT Aragua', 'Prof. Ing. Rafael Téllez. UPT Aragua'], type: 'Panel' },
    { time: '10:50 AM - 11:00 AM', title: 'Sesión de preguntas y respuestas - Café', type: 'Sesión de Preguntas y Respuestas' },
    { time: '11:00 AM – 11:15 AM', title: 'Ponencia: “Entrenador de Automatismos industriales aplicando IoT“', speakers: 'Prof. Ing. Msc. Pablo Cedeño. UPT Aragua.', type: 'Ponencia' },
    { time: '11:15 AM – 11:30 AM', title: 'Ponencia: Inteligencia Artificial para la Enseñanza de la Física: Una Perspectiva desde la Práctica Docente .', speakers: 'Profa. MSc. Yenny López. UPT Lara', type: 'Ponencia' },
    { time: '11:30 AM – 11:45 AM', title: 'Ponencia: “Laboratorios Virtuales”', speakers: 'Prof. Ing. Javier Borges. UPT Aragua', type: 'Ponencia' },
    { time: '11:45 AM – 11:55AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
  ];

  const day1ActivitiesLaboratories: Activity[] = [
    { time: '12:30 PM - 4:00 PM', title: 'Bootcamp: "Introducción al desarrollo de aplicaciones de IA Generativas. Desarrollo de aplicaciones de la IA Generativa basadas en LLM de código abierto"', location: 'Laboratorio de Inteligencia Artificial Generativa', type: 'Bootcamp' },
    { time: '12:30 PM - 4:00 PM', title: 'Bootcamp: "Ingeniería de Prompts: Técnicas para maximizar la efectividad en la interacción con modelos de IA Generativa"', location: 'Laboratorio de Informática Diseño I.', type: 'Bootcamp' },
    { time: '12:30 PM - 4:00 PM', title: 'Bootcamp: "Desarrollo de Agentes de IA: Diseño y despliegue de agentes autónomos impulsados por IA."', location: 'Laboratorio de Programación', type: 'Bootcamp' },
    { time: '2:00 PM - 2:10 PM', title: 'Receso - Café', type: 'Receso' },
  ];

  const day2ActivitiesConferenceRoom: Activity[] = [
    { time: '8:00 AM - 9:00 AM', title: 'Registro de participantes', location: 'Pasillo principal, frente al salón de usos múltiples.', type: 'Registro' },
    { time: '9:00 AM - 9:20 PM', title: 'Panel: "Articulación universidad-estado-sector productivo"', speakers: 'Representantes de los tres sectores', type: 'Panel' },
    { time: '9:20 AM - 9:40 AM', title: 'Ponencia: La Moral y Ética Profesional del estudiante universitario ante los desafíos, retos y perspectivas de las Inteligencias Artificiales', speakers: 'Dr. Dalí Alejandro Lezama Ladera. Centro Internacional Miranda CIM. Universidad Pedagógica Experimental Libertador UPEL.', type: 'Ponencia' },
    { time: '9:40 AM – 10:00 AM', title: 'Panel: "Sistema De Gestión Para Automatizar un Fondo de Prestaciones Empresariales Descentralizado, con la Implementación de un Modelo de Lenguaje para el Usuario. Perspectivas de un caso de uso en la Caja de Ahorros del personal docente de la UPT Aragua"', speakers: ['Ing. José Manuel González. Estudiante del postgrado en Informática de la UPT Aragua.', 'Prof. Ing. Msc. Hengle Rincón. Presidente de la Caja de Ahorros del personal docente de la UPT Aragua.', 'Prof. Ing. Juan Carlos González. Ex Director del IUET-LV. Ex Presidente de Misión Sucre.'], type: 'Panel' },
    { time: '10:00 AM - 10:15 AM', title: 'Receso – Café', type: 'Receso' },
    { time: '10:15 AM - 10:30 AM', title: 'Ponencia: “Sistema basado en Conocimiento para psicopedagogos: una solución tecnológica para el TEA”', speakers: 'Prof. Ing. Kervin Licet. Estudiante del Postgrado en Informática UPT Aragua.', type: 'Ponencia' },
    { time: '10:30 AM - 10:45 AM', title: 'Ponencia: “La Tiflotecnología como Puente hacia la Autonomía: Un Análisis de las Nuevas Tecnologías Asistivas”', speakers: 'Prof. Ing. Elías Vargas. Estudiante del Postgrado en Informática UPT Aragua.', type: 'Ponencia' },
    { time: '10:45 AM', title: 'Café', type: 'Receso' },
    { time: '10:45 AM - 11:05 AM', title: 'Panel: "Adopción de la IA Generativa en los adultos mayores"', speakers: ['Lic. Msc. Carmén Judith Arcia. Presidenta de la Casa del Abuelo “San Joaquín y Santa Ana” del Municipio José Félix Ribas.', 'Prof. Ing. Elias Vargas. Estudiante del Postgrado en Informática UPT Aragua', 'Psicóloga María Francés. Casa del Abuelo “San Joaquín y Santa Ana” del Municipio José Félix Ribas.'], type: 'Panel' },
    { time: '11:05 AM - 11:15 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
    { time: '11:15 AM – 11:35 AM', title: 'Panel: “Uso y Aplicaciones de la IA Generativa para la gestión y el entrenamiento deportivo”', speakers: ['Prof. Jhon Santana. Director de Deportes del Municipio José Félix Ribas. IMDERIBAS', 'Prof. Ing. Miguel Mejías. UPT Aragua.', 'Entrenador deportivo Freddy Alvarez. Coordinador Deportivo del Municipio José Félix Ribas. IMDERIBAS'], type: 'Panel' },
    { time: '11:35 AM – 11:50 AM', title: 'Ponencia: “Generación Automatizada de Documentación Técnica mediante Fine-Tuning de Modelos de Lenguaje: Un Enfoque Basado en Dominio”', speakers: 'Prof. Ing. Msc. Edeblangel Vanegas. Estudiante del Postgrado en Informática UPT Aragua.', type: 'Ponencia' },
    { time: '11:50 AM – 12:05 PM', title: 'Ponencia: “IA en el Campus de la Universidad Politécnica Territorial del Estado Aragua: El Data Center para Modelos de Lenguaje”', speakers: 'Prof. Ing. Jackson Pérez. Estudiante del Postgrado en Informática UPT Aragua.', type: 'Ponencia' },
    { time: '12:00 M - 12:30 PM', title: 'Sesión de pósters: Proyectos universitarios en IA Generativa', location: 'Área de exposición', type: 'Póster' },
  ];

  const day2ActivitiesThematicRoom: Activity[] = [
    { time: '9:00 AM - 9:20 AM', title: 'Conferencia: “La IA una disrupción en la didáctica de la ingeniería”', speakers: 'Prof. Ing. Msc. Andrés Castillo. UPT Aragua', type: 'Conferencia' },
    { time: '9:20 AM - 9:35 AM', title: 'Ponencia: “La Virtualidad: una mirada desde el quehacer pedagógico”', speakers: 'Dr. David Colombo. Universidad Nacional Experimental Simón Rodríguez. UNESR', type: 'Ponencia' },
    { time: '9:35 AM – 9:50 AM', title: 'Ponencia: “La Inteligencia Artificial y la Educación Teológica: Innovación para un Futuro Inclusivo”', speakers: 'Ing. Misael Vargas. Estudiante del Postgrado en Informática de la UPT Aragua', type: 'Ponencia' },
    { time: '9:50 AM - 10:00 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Preguntas' },
    { time: '10:00 AM - 10:10 AM', title: 'Receso – Café', type: 'Receso' },
    { time: '10:10 AM - 10:25 AM', title: 'Ponencia: “Dentify: Desarrollo de una Aplicación Móvil con Simulación 3D y Asistencia de la IA para la Formación Odontológica”', speakers: 'Ing. Dervin García. Estudiante del Postgrado en Informática de la UPT Aragua', type: 'Ponencia' },
    { time: '10:25 AM - 10:40 AM', title: 'Ponencia: “Potenciando el Aprendizaje: Aula Virtual Inteligente para una Educación Inclusiva y Eficaz a través de la Inteligencia Artificial”', speakers: 'Ing. Gavy Colmenares. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
    { time: '10:40 AM - 10:55 AM', title: 'Ponencia: “El nuevo paradigma del uso de la Inteligencia Artificial en la generación de documentos administrativos-legales en la Universidad Politécnica Territorial del Estado Aragua “Federico Brito Figueroa””', speakers: ['Prof. Lic. Abog. Especialista. Samuel Briceño. Estudiante del Postgrado en Informática de la UPT Aragua.', 'Vicerrector Aministrativo (E) de la UPT Aragua'], type: 'Ponencia' },
    { time: '10:55 AM', title: 'Café', type: 'Receso' },
    { time: '10:55 AM - 11:10 AM', title: 'Ponencia: “Desarrollo de un sistema de categorización de contenido basado en inteligencia artificial para IoT en el control de tráfico de red”', speakers: 'Ing. César Adan Ynojosa. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
    { time: '11:10 AM - 11:20 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
    { time: '11:20 AM - 11:35 AM', title: 'Ponencia: “Agente Inteligente para la captación de intereses y reforzamiento de habilidades informáticas de los estudiantes del PNF de Informática de la Universidad Politécnica Territorial del estado Aragua DR. “Federico Brito Figueroa”', speakers: 'Profa. Ing. Karlis Zambrano. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
    { time: '11:35 AM - 11:50 AM', title: 'Ponencia: “La IAWEBRA y IARA. Una propuesta para optimizar la realidad virtual en nuestro contexto”', speakers: 'Prof. Ing. Carlos Aponte. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
  ];

  const day2ActivitiesLaboratories: Activity[] = [
    { time: '12:30 PM - 4:00 PM', title: 'Bootcamp: "Entrenamiento de Modelos Generativos: Introducción al entrenamiento y ajuste fino de modelos de lenguaje."', location: 'Laboratorio de Inteligencia Artificial', type: 'Bootcamp' },
    { time: '12:30 PM - 4:00 PM', title: 'Bootcamp: "Generación Aumentada de Recuperación (RAG): Métodos avanzados para integrar datos externos con modelos generativos."', location: 'Laboratorio de Programación', type: 'Bootcamp' },
    { time: '2:00 PM - 2:10 PM', title: 'Receso - Café', type: 'Receso' },
  ];

  const day3ActivitiesConferenceRoom: Activity[] = [
    { time: '8:00 AM - 9:00 AM', title: 'Registro de participantes', location: 'Pasillo principal, frente al salón de usos múltiples.', type: 'Registro' },
    { time: '9:00 AM a 9:25 AM', title: 'Ponencia: “Prompt Engineering, una mirada desde el usuario y del desarrollador"', speakers: 'AI Engineer. Msc. Antonio Romero. Profesor Invitado UNI (Perú), UCEMA (Argentina) | Conferencista internacional.', type: 'Ponencia' },
    { time: '9:25 AM a 9:40 AM', title: 'Ponencia: "La Inteligencia Artificial y el Aprendizaje Universitario"', speakers: 'Profa. Msc. Exira Báez. Universidad de Carabobo', type: 'Ponencia' },
    { time: '9:40 AM - 10:00 AM', title: 'Panel: "Integración de la IA Generativa en los planes y programas de estudio de postgrado. Una mirada crítica y reflexiva a los procesos de aprendizaje, investigación y desarrollo"', speakers: ['Dr. Jimy Santana. Coordinador del Programa de Postgrado de Informática en la UPT Aragua.', 'Prof. Msc. Richard Castellanos. Coordinador del Programa de Postgrado en Ingeniería Mecánica en la UPT Aragua.', 'Prof. Rafael Tellez. Coordinador del Programa de Postgrado en Automatismo, Control y Robótica en la UPT Aragua.', 'Profa. Msc. Greismar Terife. Coordinadora del Programa de Postgrado en Energía Eléctrica en la UPT Aragua.'], type: 'Panel' },
    { time: '10:00 AM - 10:10 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
    { time: '10:10 AM - 10:20 AM', title: 'Receso – Café', type: 'Receso' },
    { time: '10:20 AM – 10:35 AM', title: 'Ponencia: “Revolucionando los Asistentes Inteligentes: Un Framework Modular y de Código Abierto Basado en Inteligencia Artificial Generativa”', speakers: 'Ingeniera Niurka Oropeza. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
    { time: '10:35 AM – 10:50 AM', title: 'Ponencia: “RAG: de Técnica de Recuperación a Arquitecturas Avanzadas en IA Generativa”', speakers: 'Ing. Juan Alvarado. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
    { time: '10:50 AM – 11:05 AM', title: 'Ponencia: “Smart Grid, Agentes Inteligentes Industriales y la industria 2.0”.', speakers: 'Ing. Andys Rojas. Metro de Caracas. Estudiante del Postgrado en Informática de la UPT Aragua.', type: 'Ponencia' },
    { time: '11:05 AM - 11:15 AM', title: 'Sesión de preguntas y respuestas', type: 'Sesión de Preguntas y Respuestas' },
    { time: '11:15 AM – 11:30 AM', title: 'Ponencia: La Adopción de la Inteligencia Artificial en la Orientación Vocacional y Profesional. Un Enfoque hacia la Automatización y la Precisión.', speakers: 'Ing. José Moreno. Casa de la moneda, BCV. Estudiante del Postgrado en Informática UPT Aragua', type: 'Ponencia' },
    { time: '11:30 AM – 11:45 AM', title: 'Ponencia: Diseño de un Sistema de Evaluación Adaptativo Matemático (SEAM) basado en Inteligencia Artificial Generativa para los estudiantes de Matemática de la Universidad Politécnica Territorial del Estado Aragua “Federico Brito Figueroa”.', speakers: ['Profa. Msc. Orleisy Moya. Estudiante del Postgrado en Informática UPT Aragua.', 'Secretaria (E) de la UPT Aragua.'], type: 'Ponencia' },
    { time: '11:45 AM - 12:15 PM', title: 'Sesión de pósters: Proyectos universitarios en IA Generativa', location: 'Área de exposición', type: 'Póster' },
    { time: '12:15 PM - 12:30 PM', title: 'Ceremonia de clausura y conclusiones', speakers: ['Dra. Bettys Muñoz', 'Dr. Jimy Santana'], type: 'Ceremonia' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Programa del Congreso</h1>
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Desarrollando las Potencialidades y Capacidades del Sector Universitario en Inteligencia Artificial Generativa</h2>

        <Tabs defaultValue="dia1" className="w-full" onValueChange={handleDayChange}>
          <TooltipProvider delayDuration={300}>
            {/* Se restauró mb-12 para el TabsList, ya que el div de espacio se encargará */}
            <TabsList className="grid w-full grid-cols-3 gap-2 mb-12 p-1 rounded-lg shadow-md">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="dia1"
                    className="flex flex-col items-center justify-center p-3 text-purple-800 dark:text-purple-200 rounded-md transition-all duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-purple-800
                               data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:ring-2 data-[state=active]:ring-purple-500 data-[state=active]:ring-offset-2"
                  >
                    <span className="text-2xl mb-1">📅</span>
                    <span className="font-semibold text-base">Día 1</span>
                    <span className="text-sm">Julio 14</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white px-3 py-1 rounded-md shadow-lg">
                  <p className="text-sm">Lunes, 14 de julio de 2025</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="dia2"
                    className="flex flex-col items-center justify-center p-3 text-purple-800 dark:text-purple-200 rounded-md transition-all duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-purple-800
                               data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:ring-2 data-[state=active]:ring-purple-500 data-[state=active]:ring-offset-2"
                  >
                    <span className="text-2xl mb-1">🗓️</span>
                    <span className="font-semibold text-base">Día 2</span>
                    <span className="text-sm">Julio 15</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white px-3 py-1 rounded-md shadow-lg">
                  <p className="text-sm">Martes, 15 de julio de 2025</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="dia3"
                    className="flex flex-col items-center justify-center p-3 text-purple-800 dark:text-purple-200 rounded-md transition-all duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-purple-800
                               data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:ring-2 data-[state=active]:ring-purple-500 data-[state=active]:ring-offset-2"
                  >
                    <span className="text-2xl mb-1">📆</span>
                    <span className="font-semibold text-base">Día 3</span>
                    <span className="text-sm">Julio 19</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white px-3 py-1 rounded-md shadow-lg">
                  <p className="text-sm">Sábado, 19 de julio de 2025</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </TooltipProvider>

          {/* Div vacío para crear el espacio extra */}
          <div className="h-8" aria-hidden="true"></div>

          {/* Texto dinámico para mostrar el día actual, en text-lg y color morado */}
          <h3 className="text-center text-lg font-bold text-purple-700 dark:text-purple-300 mb-6">{selectedDayText}</h3>

          <TabsContent value="dia1">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Sala de Conferencias. Mañana - 9:00 AM a 12:00 M</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day1ActivitiesConferenceRoom.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Sala Temática - Mañana - 10:00 AM a 12:00 M</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day1ActivitiesThematicRoom.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Laboratorios. Tarde - 12:30 PM a 4:00 PM</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day1ActivitiesLaboratories.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dia2">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Sala de Conferencias. Mañana - 9:00 AM a 12:00 M</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day2ActivitiesConferenceRoom.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Sala Temática - Mañana - 9:00 AM a 12:00 M</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day2ActivitiesThematicRoom.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Laboratorios. Tarde - 12:30 PM a 4:00 PM</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day2ActivitiesLaboratories.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dia3">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <CardTitle>Sala de Conferencias. Mañana - 9:00 AM a 12:30 PM</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day3ActivitiesConferenceRoom.map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg shadow-sm ${activityColors[activity.type]}`}>
                        <h3 className="text-lg font-semibold flex items-center">
                          <span className="mr-2">{activityIcons[activity.type]}</span>
                          {activity.time}
                        </h3>
                        <p className="font-medium text-purple-700 dark:text-purple-400">{activity.title}</p>
                        {activity.speakers && (
                          <div className="text-muted-foreground text-sm">
                            {Array.isArray(activity.speakers) ? (
                              activity.speakers.map((speaker, sIdx) => (
                                <p key={sIdx}>{speaker}</p>
                              ))
                            ) : (
                              <p>{activity.speakers}</p>
                            )}
                          </div>
                        )}
                        {activity.location && <p className="text-muted-foreground text-sm">{activity.location}</p>}
                        <p className="text-xs text-right opacity-75">{activity.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Notas importantes:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los bootcamps tienen cupo limitado. La inscripción se realizará en la mañana, en el horario de registro al evento (8:00 AM - 9:00 AM).</li>
            <li>
              Las sesiones virtuales estarán disponibles a través de un enlace que se enviará a los participantes
              registrados en esta modalidad.
            </li>
            <li>Se otorgarán certificados de participación y asistencia.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}