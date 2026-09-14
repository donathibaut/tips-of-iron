

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `categories` (
  `id_category` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `categories` (`id_category`, `name`) VALUES
(3, 'Air'),
(1, 'Interface'),
(2, 'Land'),
(4, 'Marine'),
(5, 'Scenario Guide');

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `categories`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;