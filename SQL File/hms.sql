-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2024 a las 03:12:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hms`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `updationDate` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `updationDate`, `address`, `email`, `gender`, `city`) VALUES
(1, 'Celina Carballo', 'patronus3', '2024-09-26 23:42:55', '3562545245', 'ingeniero@gmail.com', 'female', 'Bioingenieria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `equipo` varchar(255) NOT NULL,
  `prioridad` enum('baja','media','alta') NOT NULL,
  `responsable` varchar(255) NOT NULL,
  `complejidad` enum('baja','media','alta') NOT NULL,
  `fecha_parada` date DEFAULT NULL,
  `fecha_funcion` date DEFAULT NULL,
  `tiempo_trabajo` decimal(5,2) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `solicitud` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tiempo` time DEFAULT NULL,
  `postingDate` timestamp NULL DEFAULT current_timestamp(),
  `updationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `descripcion_trabajo` text DEFAULT NULL,
  `estado` enum('pendiente','aceptada','rechazada','completada') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `appointment`
--

INSERT INTO `appointment` (`id`, `equipo`, `prioridad`, `responsable`, `complejidad`, `fecha_parada`, `fecha_funcion`, `tiempo_trabajo`, `sector`, `nombre`, `userId`, `solicitud`, `fecha`, `tiempo`, `postingDate`, `updationDate`, `descripcion_trabajo`, `estado`) VALUES
(32, '', 'baja', '', 'baja', NULL, NULL, NULL, 'Neonatología', 'Celina Carballo', 2, 'Incubadora muestra error sensor de piel', '2024-09-23', '09:06:00', '2024-09-26 23:58:41', '2024-09-27 00:24:10', '', 'aceptada'),
(33, '', 'baja', '', 'baja', NULL, NULL, NULL, 'Neonatología', 'Celina Carballo', 2, 'Sensor de oximetría roto', '2024-09-24', '11:59:00', '2024-09-26 23:59:26', '2024-09-27 00:47:40', '', 'aceptada'),
(34, '', 'baja', '', 'baja', NULL, NULL, NULL, 'UTI Pediátrica', 'Celina Carballo', 2, 'Cables de ecg de desfibrilador philips no funcionan', '2024-09-25', '16:08:00', '2024-09-27 00:03:51', NULL, '', 'pendiente'),
(35, '', 'baja', '', 'baja', NULL, NULL, NULL, 'UTI Pediátrica', 'Celina Carballo', 2, 'Resucitador roto', '2024-09-25', '08:04:00', '2024-09-27 00:04:45', NULL, '', 'pendiente'),
(36, '', 'baja', '', 'baja', NULL, NULL, NULL, 'Neonatología', 'Celina Carballo', 2, 'Incubadora muestra alerta \"cambio de filtro\"', '2024-09-26', '10:05:00', '2024-09-27 00:05:36', NULL, '', 'pendiente'),
(37, '', 'baja', '', 'baja', NULL, NULL, NULL, 'Neonatología', 'Celina Carballo', 2, 'Cable de alimentación no funciona', '2024-09-24', '12:09:00', '2024-09-27 00:09:51', NULL, '', 'pendiente'),
(38, '', 'baja', '', 'baja', NULL, NULL, NULL, 'Neonatología', 'Celina Carballo', 2, 'ambu roto', '2024-09-25', '18:11:00', '2024-09-27 00:11:07', NULL, '', 'pendiente'),
(39, '', 'baja', '', 'baja', NULL, NULL, NULL, 'Neonatología', 'Celina Carballo', 2, 'Cable de alimentación no funciona', '2024-09-26', '13:22:00', '2024-09-27 00:22:04', NULL, '', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `specilization` varchar(255) DEFAULT NULL,
  `doctorName` varchar(255) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `docFees` varchar(255) DEFAULT NULL,
  `contactno` bigint(11) DEFAULT NULL,
  `docEmail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT current_timestamp(),
  `updationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `doctors`
--

INSERT INTO `doctors` (`id`, `specilization`, `doctorName`, `address`, `docFees`, `contactno`, `docEmail`, `password`, `creationDate`, `updationDate`) VALUES
(10, '', 'Ricardo', '', '', 1234567890, 'johndoe@example.com', 'db789ddbd61388e3296565960ef47084', '2024-09-25 03:25:15', '2024-09-26 04:30:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctorslog`
--

CREATE TABLE `doctorslog` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userip` binary(16) DEFAULT NULL,
  `loginTime` timestamp NULL DEFAULT current_timestamp(),
  `logout` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `doctorslog`
--

INSERT INTO `doctorslog` (`id`, `uid`, `username`, `userip`, `loginTime`, `logout`, `status`) VALUES
(57, NULL, 'Celina', 0x3a3a3100000000000000000000000000, '2024-09-25 03:13:00', NULL, 0),
(58, NULL, 'Celina', 0x3a3a3100000000000000000000000000, '2024-09-25 03:13:06', NULL, 0),
(59, NULL, 'test@demo.com', 0x3a3a3100000000000000000000000000, '2024-09-25 03:14:48', NULL, 0),
(60, NULL, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-25 03:19:50', NULL, 0),
(61, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-25 03:25:42', '25-09-2024 10:04:30 AM', 1),
(62, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-25 20:50:38', '26-09-2024 02:39:04 AM', 1),
(63, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-25 21:11:58', '26-09-2024 02:43:30 AM', 1),
(64, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-25 21:56:31', '26-09-2024 07:32:20 AM', 1),
(65, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-26 02:49:42', '26-09-2024 08:47:27 AM', 1),
(66, NULL, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-26 03:18:19', NULL, 0),
(67, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-26 03:18:35', '26-09-2024 08:57:57 AM', 1),
(68, NULL, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-26 03:28:50', NULL, 0),
(69, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-26 03:28:58', '26-09-2024 09:50:43 AM', 1),
(70, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-26 04:21:21', '26-09-2024 10:08:54 AM', 1),
(71, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-27 00:23:04', '27-09-2024 05:53:37 AM', 1),
(72, 10, 'johndoe@example.com', 0x3a3a3100000000000000000000000000, '2024-09-27 00:48:53', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctorspecilization`
--

CREATE TABLE `doctorspecilization` (
  `id` int(11) NOT NULL,
  `specilization` varchar(255) DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT current_timestamp(),
  `updationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `doctorspecilization`
--

INSERT INTO `doctorspecilization` (`id`, `specilization`, `creationDate`, `updationDate`) VALUES
(1, 'Consultorio', '2024-09-05 22:20:25', '2024-09-05 22:20:50'),
(2, 'Endoscopia', '2024-09-05 22:21:12', '2024-09-05 22:21:16'),
(3, 'Esterilización', '2024-09-05 22:21:48', '2024-09-05 22:21:55'),
(4, 'Guardia', '2024-09-05 22:22:26', '2024-09-05 22:22:22'),
(5, 'Hemodinamia', '2024-09-05 22:22:51', '2024-09-05 22:22:59'),
(6, 'Hospital de día', '2024-09-05 22:23:08', '2024-09-05 22:23:24'),
(7, 'Internación', '2024-09-05 22:24:18', '2024-09-05 22:24:05'),
(9, 'Quirófano', '2024-09-05 22:24:39', '2024-09-05 22:24:50'),
(10, 'Rayos', '2024-09-05 22:25:53', '2024-09-05 22:25:25'),
(11, 'Tomografía y Resonancia', '2024-09-05 22:25:06', '2024-09-05 22:25:53'),
(12, 'Uco', '2019-11-10 22:26:36', '2024-09-05 22:26:23'),
(13, 'UTI Adulto', '2024-09-05 23:31:05', NULL),
(14, 'UTI Pediátrica', '2024-09-05 23:31:46', NULL),
(20, 'Neonatología', '2024-09-26 23:48:52', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `situacion` enum('Propio','Comodato','Alquilado','Prestamo','Tercerizado','Otros') NOT NULL,
  `equipo` varchar(255) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `fabricante` varchar(100) DEFAULT NULL,
  `reg_anmat` varchar(100) DEFAULT NULL,
  `criticidad` enum('Alta','Media','Baja') NOT NULL,
  `sector` enum('Consultorio','Endoscopia','Esterilización','Guardia','Hemodinamia','Hospital de día','Internacion','Quirófano','Rayos','Tomografía y resonancia','Uco','Uti adulto','Uti pediátrica') NOT NULL,
  `numero_serie` varchar(100) DEFAULT NULL,
  `proveedor` varchar(100) DEFAULT NULL,
  `garantia_original` date DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `fecha_fabricacion` date DEFAULT NULL,
  `fecha_adquisicion` date DEFAULT NULL,
  `fecha_instalacion` date DEFAULT NULL,
  `codigo_equipo` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `situacion`, `equipo`, `modelo`, `fabricante`, `reg_anmat`, `criticidad`, `sector`, `numero_serie`, `proveedor`, `garantia_original`, `fecha_registro`, `fecha_fabricacion`, `fecha_adquisicion`, `fecha_instalacion`, `codigo_equipo`) VALUES
(89, 'Propio', 'Respirador', 'Neumovent', 'Philips', '452014', 'Alta', 'Consultorio', '10357', 'Tecme', '2024-09-23', '2024-09-23', '2024-09-23', '2024-09-23', '2024-09-23', 'PS-36'),
(119, 'Propio', 'Incubadora', 'Natal care', 'Medix', '1077-1', 'Alta', 'Uti pediátrica', '4733-14', 'Nativa', '2026-10-26', '2024-09-25', '2022-06-26', '2024-09-23', '2024-09-26', 'PS-37'),
(120, 'Propio', 'Respirador', 'Advance', 'Neumovent', '1116-6', 'Alta', 'Uti pediátrica', '19 05 4015 1081A1V', 'Tecme', '2026-11-26', '2024-09-04', '2021-07-26', '2024-09-11', '2024-09-20', 'PS-38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_ubicaciones`
--

CREATE TABLE `historial_ubicaciones` (
  `id` int(11) NOT NULL,
  `equipo_id` int(11) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `historial_ubicaciones`
--

INSERT INTO `historial_ubicaciones` (`id`, `equipo_id`, `ubicacion`, `fecha`) VALUES
(9, 89, 'hospital', '2024-09-26 00:27:56'),
(10, 120, 'hospital', '2024-09-27 00:49:51'),
(11, 120, 'camion', '2024-09-27 00:49:59'),
(12, 120, 'proveedor', '2024-09-27 00:50:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `contenido` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id`, `usuario_id`, `contenido`, `fecha_creacion`) VALUES
(4, 0, 'Llamar a la jefa de servicio de neonatología', '2024-09-24 23:25:30'),
(5, 0, 'Crear un pedido de compras de filtros de incubadoras', '2024-09-24 23:25:36'),
(6, 0, 'Pegar etiqueta QR del desfibrilador en el servicio de uti pediátrica', '2024-09-24 23:26:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_correctiva`
--

CREATE TABLE `orden_correctiva` (
  `id` int(11) NOT NULL,
  `equipo` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `numero_serie` varchar(255) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','aceptada','rechazada') NOT NULL DEFAULT 'pendiente',
  `detalles_accion` text DEFAULT NULL,
  `fecha_accion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `orden_correctiva`
--

INSERT INTO `orden_correctiva` (`id`, `equipo`, `modelo`, `numero_serie`, `codigo`, `descripcion`, `fecha`, `created_at`, `estado`, `detalles_accion`, `fecha_accion`) VALUES
(1, 'Respirador', 'Neumovent', '15864', 'PS-39', 'Error: celda de oxígeno', '2024-09-25', '2024-09-26 02:49:18', '', 'hola', '2024-09-26'),
(2, 'Respirador', 'Neumovent', '4652456', 'PS-39', '5156', '2024-09-26', '2024-09-26 03:17:56', '', 'gdgsdgsgd', '2024-09-26'),
(3, 'Cardiodesfirbilador', 'DFM100', '4652456', 'PS-40', 'dedad', '2024-09-25', '2024-09-26 03:28:37', '', 'dfgfqw', '2024-09-26'),
(4, 'Respirador', 'Advance', '19 05 4015 1081A1V', 'PS-38', 'Solicito mantenimiento preventivo del Respirador Advance SN: 19 05 4015 1081A1V que tenemos en nuestras instalaciones, ya que hemos llegado a la fecha programada para su revisión.', '2024-09-26', '2024-09-27 00:44:26', 'pendiente', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_mantenimiento`
--

CREATE TABLE `planes_mantenimiento` (
  `id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  `fecha_programada` date NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `periodicidad` enum('Mensual','Trimestral','Semestral','Anual') NOT NULL,
  `inspeccion_visual` varchar(255) NOT NULL,
  `funcionamiento` varchar(255) NOT NULL,
  `alarmas` varchar(255) NOT NULL,
  `bateria` varchar(255) NOT NULL,
  `identificacion` varchar(255) NOT NULL,
  `materiales_necesarios` text DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'pendiente',
  `detalle_mantenimiento` text DEFAULT NULL,
  `checklist` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `planes_mantenimiento`
--

INSERT INTO `planes_mantenimiento` (`id`, `equipo_id`, `fecha_programada`, `titulo`, `periodicidad`, `inspeccion_visual`, `funcionamiento`, `alarmas`, `bateria`, `identificacion`, `materiales_necesarios`, `estado`, `detalle_mantenimiento`, `checklist`) VALUES
(10, 119, '2024-09-26', 'Mantenimiento trimestral incubadoras', 'Trimestral', 'Verificar la integridad de las agarraderas, bisagras y fijadores de puertas, asegurándose de que no estén secas o agrietadas y que cierren correctamente. Comprobar que los módulos de control no presenten daños y revisar el equipo en general en busca de an', 'Verificar que la temperatura se mantenga estable, con una variación máxima de 1°C en una hora. Si la incubadora tiene balanza, comprobar su calibración. Encender la incubadora, setearla a 34-36°C y revisar que alcance la temperatura deseada en 30 minutos.', 'Simular sobrecalentamiento con una pistola de calor o soldador y verificar que la alarma de sobretemperatura se active cuando el aire supere los 39°C. Confirmar que la incubadora alcanza la temperatura seleccionada con un termómetro.', 'Cargar la batería por 24 horas y comprobar que el equipo funcione durante al menos 90 minutos a 36°C, con una temperatura ambiente de 15°C o superior.', 'Verificar presencia y legibilidad de etiquetas.', 'Necesitas los siguientes materiales: decibelímetro, llaves allen, sensor de piel, pistola de calor, destornilladores y limpia contactos.', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `codigo_producto` varchar(10) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `existencias_iniciales` int(11) DEFAULT NULL,
  `entradas` int(11) DEFAULT NULL,
  `salidas` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo_producto`, `descripcion`, `existencias_iniciales`, `entradas`, `salidas`, `stock`) VALUES
('001', 'Válvula peep', 50, 0, 7, 43),
('002', 'Cuff adulto', 40, 0, 2, 38),
('003', 'Rulemanes', 60, 5, 6, 59),
('004', 'Filtros para incubadora medix', 60, 0, 0, 60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remitos`
--

CREATE TABLE `remitos` (
  `id` int(11) NOT NULL,
  `nombre_remito` varchar(255) DEFAULT NULL,
  `ruta_remito` varchar(255) DEFAULT NULL,
  `fecha_subida` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `remitos`
--

INSERT INTO `remitos` (`id`, `nombre_remito`, `ruta_remito`, `fecha_subida`) VALUES
(1, 'Julieta', 'uploads/remitos/1.png', '2024-09-26 03:57:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `equipment` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('baja','media','alta') NOT NULL,
  `status` enum('pending','accepted','denied','completed') NOT NULL,
  `service_details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcontactus`
--

CREATE TABLE `tblcontactus` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contactno` bigint(12) DEFAULT NULL,
  `message` mediumtext DEFAULT NULL,
  `PostingDate` timestamp NULL DEFAULT current_timestamp(),
  `AdminRemark` mediumtext DEFAULT NULL,
  `LastupdationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `IsRead` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `tblcontactus`
--

INSERT INTO `tblcontactus` (`id`, `fullname`, `email`, `contactno`, `message`, `PostingDate`, `AdminRemark`, `LastupdationDate`, `IsRead`) VALUES
(4, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'No puedo registrarme', '2024-09-22 19:40:22', NULL, NULL, NULL),
(5, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'No puedo registrarme', '2024-09-22 19:42:27', NULL, NULL, NULL),
(6, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'No puedo registrarme', '2024-09-22 19:42:39', NULL, NULL, NULL),
(7, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'No puedo registrarme', '2024-09-22 19:44:24', NULL, NULL, NULL),
(8, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'no', '2024-09-22 19:44:33', NULL, NULL, NULL),
(9, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'no', '2024-09-22 19:44:59', NULL, NULL, NULL),
(10, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:50:26', NULL, NULL, NULL),
(11, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:50:32', NULL, NULL, NULL),
(12, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:51:50', NULL, NULL, NULL),
(13, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:51:53', NULL, NULL, NULL),
(14, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:53:29', NULL, NULL, NULL),
(15, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:53:32', NULL, NULL, NULL),
(16, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:55:13', NULL, NULL, NULL),
(17, 'Celina Carballo', 'celinacarballo@gmail.com', 3564846245, 'me recibooooooo', '2024-09-22 19:58:24', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmedicalhistory`
--

CREATE TABLE `tblmedicalhistory` (
  `ID` int(10) NOT NULL,
  `PatientID` int(10) DEFAULT NULL,
  `BloodPressure` varchar(200) DEFAULT NULL,
  `BloodSugar` varchar(200) NOT NULL,
  `Weight` varchar(100) DEFAULT NULL,
  `Temperature` varchar(200) DEFAULT NULL,
  `MedicalPres` mediumtext DEFAULT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `tblmedicalhistory`
--

INSERT INTO `tblmedicalhistory` (`ID`, `PatientID`, `BloodPressure`, `BloodSugar`, `Weight`, `Temperature`, `MedicalPres`, `CreationDate`) VALUES
(2, 3, '120/185', '80/120', '85 Kg', '101 degree', '#Fever, #BP high\r\n1.Paracetamol\r\n2.jocib tab\r\n', '2019-11-06 02:20:07'),
(3, 2, '90/120', '92/190', '86 kg', '99 deg', '#Sugar High\r\n1.Petz 30', '2019-11-06 02:31:24'),
(4, 1, '125/200', '86/120', '56 kg', '98 deg', '# blood pressure is high\r\n1.koil cipla', '2019-11-06 02:52:42'),
(5, 1, '96/120', '98/120', '57 kg', '102 deg', '#Viral\r\n1.gjgjh-1Ml\r\n2.kjhuiy-2M', '2019-11-06 02:56:55'),
(6, 4, '90/120', '120', '56', '98 F', '#blood sugar high\r\n#Asthma problem', '2019-11-06 12:38:33'),
(7, 5, '80/120', '120', '85', '98.6', 'Rx\r\n\r\nAbc tab\r\nxyz Syrup', '2019-11-10 16:50:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblpatient`
--

CREATE TABLE `tblpatient` (
  `ID` int(10) NOT NULL,
  `Docid` int(10) DEFAULT NULL,
  `PatientName` varchar(200) DEFAULT NULL,
  `PatientContno` bigint(10) DEFAULT NULL,
  `PatientEmail` varchar(200) DEFAULT NULL,
  `PatientGender` varchar(50) DEFAULT NULL,
  `PatientAdd` mediumtext DEFAULT NULL,
  `PatientAge` int(10) DEFAULT NULL,
  `PatientMedhis` mediumtext DEFAULT NULL,
  `CreationDate` timestamp NULL DEFAULT current_timestamp(),
  `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `tblpatient`
--

INSERT INTO `tblpatient` (`ID`, `Docid`, `PatientName`, `PatientContno`, `PatientEmail`, `PatientGender`, `PatientAdd`, `PatientAge`, `PatientMedhis`, `CreationDate`, `UpdationDate`) VALUES
(1, 1, 'Manisha Jha', 4558968789, 'test@gmail.com', 'Female', '\"\"J&K Block J-127, Laxmi Nagar New Delhi', 26, 'She is diabetic patient', '2019-11-04 19:38:06', '2019-11-06 04:48:05'),
(2, 5, 'Raghu Yadav', 9797977979, 'raghu@gmail.com', 'Male', 'ABC Apartment Mayur Vihar Ph-1 New Delhi', 39, 'No', '2019-11-05 08:40:13', '2019-11-05 09:53:45'),
(3, 7, 'Mansi', 9878978798, 'jk@gmail.com', 'Female', '\"fdghyj', 46, 'No', '2019-11-05 08:49:41', '2019-11-05 09:58:59'),
(4, 7, 'Manav Sharma', 9888988989, 'sharma@gmail.com', 'Male', 'L-56,Ashok Nagar New Delhi-110096', 45, 'He is long suffered by asthma', '2019-11-06 12:33:54', '2019-11-06 12:34:31'),
(5, 9, 'John', 1234567890, 'john@test.com', 'male', 'Test ', 25, 'THis is sample text for testing.', '2019-11-10 16:49:24', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userlog`
--

CREATE TABLE `userlog` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userip` binary(16) DEFAULT NULL,
  `loginTime` timestamp NULL DEFAULT current_timestamp(),
  `logout` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `userlog`
--

INSERT INTO `userlog` (`id`, `uid`, `username`, `userip`, `loginTime`, `logout`, `status`) VALUES
(24, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2022-07-15 18:57:20', NULL, 0),
(25, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2022-07-15 18:57:57', '16-07-2022 02:29:28 AM', 1),
(26, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2022-07-15 19:11:12', '16-07-2022 02:55:17 AM', 1),
(27, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-01 20:11:58', '02-09-2024 01:44:17 AM', 1),
(28, NULL, 'admin', 0x3a3a3100000000000000000000000000, '2024-09-01 23:06:38', NULL, 0),
(29, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-01 23:06:50', '02-09-2024 04:36:55 AM', 1),
(30, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-01 23:12:56', '02-09-2024 04:43:46 AM', 1),
(31, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-02 00:38:39', NULL, 1),
(32, NULL, 'admin', 0x3a3a3100000000000000000000000000, '2024-09-05 20:44:03', NULL, 0),
(33, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-05 20:44:24', NULL, 0),
(34, NULL, 'admin', 0x3a3a3100000000000000000000000000, '2024-09-05 20:44:43', NULL, 0),
(35, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-05 20:44:52', '06-09-2024 02:16:11 AM', 1),
(36, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-05 20:47:30', '06-09-2024 02:23:49 AM', 1),
(37, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-05 20:54:04', NULL, 1),
(38, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 12:59:36', '08-09-2024 06:47:26 PM', 1),
(39, NULL, 'celinacarballo00@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 13:24:17', NULL, 0),
(40, NULL, 'celinacarballo00@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 13:24:30', NULL, 0),
(41, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 13:24:36', '08-09-2024 07:12:06 PM', 1),
(42, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 13:51:01', '08-09-2024 07:29:31 PM', 1),
(43, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 14:02:22', '08-09-2024 08:52:37 PM', 1),
(44, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:09:30', '09-09-2024 03:39:49 AM', 1),
(45, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:12:49', '09-09-2024 03:54:55 AM', 1),
(46, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:25:08', NULL, 0),
(47, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:25:20', '09-09-2024 03:55:29 AM', 1),
(48, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:25:37', '09-09-2024 03:55:39 AM', 1),
(49, NULL, 'celinacarballo00@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:35:47', NULL, 0),
(50, NULL, 'celinacarballo00@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:35:59', NULL, 0),
(51, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:36:55', '09-09-2024 04:10:07 AM', 1),
(52, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-08 22:51:08', '09-09-2024 04:21:30 AM', 1),
(53, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-11 21:52:03', '12-09-2024 03:31:43 AM', 1),
(54, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 12:47:01', '15-09-2024 06:26:07 PM', 1),
(55, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 12:57:08', '15-09-2024 06:35:10 PM', 1),
(56, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 13:16:24', '15-09-2024 06:46:47 PM', 1),
(57, NULL, 'jefe@servicio.com', 0x3a3a3100000000000000000000000000, '2024-09-15 13:49:19', NULL, 0),
(58, 2, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 13:54:46', '15-09-2024 07:26:00 PM', 1),
(59, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 13:56:08', NULL, 0),
(60, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 13:56:17', '15-09-2024 07:30:18 PM', 1),
(61, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 14:00:29', '15-09-2024 07:31:04 PM', 1),
(62, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 14:40:08', '15-09-2024 08:29:13 PM', 1),
(63, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 15:03:53', '15-09-2024 08:54:39 PM', 1),
(64, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 19:52:20', '16-09-2024 01:22:51 AM', 1),
(65, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 22:08:38', '16-09-2024 03:47:38 AM', 1),
(66, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-15 22:23:57', '16-09-2024 03:54:26 AM', 1),
(67, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-21 21:52:48', NULL, 0),
(68, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-21 21:54:18', NULL, 0),
(69, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-21 21:54:31', NULL, 0),
(70, NULL, 'Celina', 0x3a3a3100000000000000000000000000, '2024-09-21 21:54:37', NULL, 0),
(71, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-21 21:55:41', NULL, 0),
(72, 9, 'celinacarballo00@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-21 21:56:28', '22-09-2024 03:27:26 AM', 1),
(73, 9, 'celinacarballo00@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-21 21:58:24', '22-09-2024 03:39:06 AM', 1),
(74, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-22 19:59:03', '23-09-2024 01:50:33 AM', 1),
(75, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-23 01:21:59', NULL, 1),
(76, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-23 20:53:55', '24-09-2024 03:09:45 AM', 1),
(77, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-23 21:40:31', '24-09-2024 03:11:06 AM', 1),
(78, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-23 21:46:26', '24-09-2024 03:18:14 AM', 1),
(79, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-25 21:10:35', NULL, 0),
(80, NULL, 'test@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-25 21:10:41', NULL, 0),
(81, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-25 21:10:52', '26-09-2024 02:41:37 AM', 1),
(82, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-26 04:20:52', '26-09-2024 09:51:13 AM', 1),
(83, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-26 23:46:45', '27-09-2024 05:18:31 AM', 1),
(84, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-26 23:49:05', '27-09-2024 05:38:40 AM', 1),
(85, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-27 00:09:06', '27-09-2024 05:40:26 AM', 1),
(86, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-27 00:10:43', '27-09-2024 05:41:18 AM', 1),
(87, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-27 00:20:50', '27-09-2024 05:51:12 AM', 1),
(88, 2, 'celinacarballo@gmail.com', 0x3a3a3100000000000000000000000000, '2024-09-27 00:21:29', '27-09-2024 05:52:18 AM', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `regDate` timestamp NULL DEFAULT current_timestamp(),
  `updationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullName`, `address`, `city`, `gender`, `email`, `password`, `regDate`, `updationDate`) VALUES
(2, 'Celina Carballo', '3562545245', 'Neonatología', 'female', 'celinacarballo@gmail.com', 'c0c1b355ae2824e80861b99e06cadf0b', '2024-09-05 20:34:39', '2024-09-15 14:00:13'),
(9, 'Celina Carballo', 'Ituzaingó 882', 'Córdoba', 'female', 'celinacarballo00@gmail.com', 'c0c1b355ae2824e80861b99e06cadf0b', '2024-09-21 21:56:14', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctorslog`
--
ALTER TABLE `doctorslog`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctorspecilization`
--
ALTER TABLE `doctorspecilization`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_equipo` (`codigo_equipo`);

--
-- Indices de la tabla `historial_ubicaciones`
--
ALTER TABLE `historial_ubicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orden_correctiva`
--
ALTER TABLE `orden_correctiva`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `planes_mantenimiento`
--
ALTER TABLE `planes_mantenimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`codigo_producto`);

--
-- Indices de la tabla `remitos`
--
ALTER TABLE `remitos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tblcontactus`
--
ALTER TABLE `tblcontactus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tblmedicalhistory`
--
ALTER TABLE `tblmedicalhistory`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `tblpatient`
--
ALTER TABLE `tblpatient`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `userlog`
--
ALTER TABLE `userlog`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `doctorslog`
--
ALTER TABLE `doctorslog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `doctorspecilization`
--
ALTER TABLE `doctorspecilization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `historial_ubicaciones`
--
ALTER TABLE `historial_ubicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `orden_correctiva`
--
ALTER TABLE `orden_correctiva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `planes_mantenimiento`
--
ALTER TABLE `planes_mantenimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `remitos`
--
ALTER TABLE `remitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblcontactus`
--
ALTER TABLE `tblcontactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tblmedicalhistory`
--
ALTER TABLE `tblmedicalhistory`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tblpatient`
--
ALTER TABLE `tblpatient`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `userlog`
--
ALTER TABLE `userlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_ubicaciones`
--
ALTER TABLE `historial_ubicaciones`
  ADD CONSTRAINT `historial_ubicaciones_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`);

--
-- Filtros para la tabla `planes_mantenimiento`
--
ALTER TABLE `planes_mantenimiento`
  ADD CONSTRAINT `planes_mantenimiento_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
