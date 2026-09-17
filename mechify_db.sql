-- ==============================================================================
-- Mechify Database Schema
-- Automotive & Supercar Support Platform
-- Target DBMS: MySQL 8.0+ / MariaDB 10.4+ (XAMPP Compatible)
-- Generated for: Mechify Automotive Platform
-- ==============================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+06:00"; -- Dhaka Standard Time (UTC+6)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- ------------------------------------------------------------------------------
-- 1. Database Creation
-- ------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `mechify_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mechify_db`;

-- Drop tables in reverse foreign key order to allow clean re-importing
DROP TABLE IF EXISTS `store_order_items`;
DROP TABLE IF EXISTS `store_orders`;
DROP TABLE IF EXISTS `spare_parts`;
DROP TABLE IF EXISTS `suppliers`;
DROP TABLE IF EXISTS `workshop_appointments`;
DROP TABLE IF EXISTS `workshop_mechanics`;
DROP TABLE IF EXISTS `workshop_services`;
DROP TABLE IF EXISTS `workshops`;
DROP TABLE IF EXISTS `driver_bookings`;
DROP TABLE IF EXISTS `driver_vehicles`;
DROP TABLE IF EXISTS `driver_profiles`;
DROP TABLE IF EXISTS `emergency_roadside_requests`;
DROP TABLE IF EXISTS `emergency_fuel_requests`;
DROP TABLE IF EXISTS `mechify_staff_profiles`;
DROP TABLE IF EXISTS `user_vehicles`;
DROP TABLE IF EXISTS `customer_profiles`;
DROP TABLE IF EXISTS `newsletter_subscribers`;
DROP TABLE IF EXISTS `users`;

-- ==============================================================================
-- 2. Core Authentication & Users
-- ==============================================================================

--
-- Table structure for `users`
-- Unified base user account table for all platform participants.
-- Supported roles:
--   - basic_user: Regular customer ordering parts, fuel, roadside assistance, workshop bookings & hiring drivers
--   - workshop_owner: Owner / manager of an automotive workshop hub
--   - parts_supplier: Supplier selling auto parts and aftermarket accessories to the Mechify store
--   - driver_without_car: Professional chauffeur available to drive the customer's vehicle
--   - driver_with_car: Chauffeur / driver with their own vehicle providing rides and rentals
--   - mechify_staff: Mechify company personnel dedicated EXCLUSIVELY to Emergency Roadside & Emergency Fuel services
--   - admin: Platform system administrator
--
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` ENUM(
    'basic_user',
    'workshop_owner',
    'parts_supplier',
    'driver_without_car',
    'driver_with_car',
    'mechify_staff',
    'admin'
  ) NOT NULL DEFAULT 'basic_user',
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(25) DEFAULT NULL,
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'suspended', 'pending_approval') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`),
  KEY `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Master authentication table for all Mechify platform users';

-- ==============================================================================
-- 3. Basic User / Customer Domain
-- ==============================================================================

--
-- Table structure for `customer_profiles`
-- Extension table for basic customers.
--
CREATE TABLE `customer_profiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `nid_number` VARCHAR(50) DEFAULT NULL,
  `emergency_contact_name` VARCHAR(100) DEFAULT NULL,
  `emergency_contact_phone` VARCHAR(25) DEFAULT NULL,
  `preferred_payment_method` ENUM('bKash', 'Nagad', 'Visa', 'MasterCard', 'Cash On Delivery') DEFAULT 'bKash',
  `address_line` TEXT DEFAULT NULL,
  `city` VARCHAR(50) DEFAULT 'Dhaka',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_cust_user_id` (`user_id`),
  CONSTRAINT `fk_cust_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Profile details for basic consumers/drivers';

--
-- Table structure for `user_vehicles`
-- Vehicles saved in the basic user's garage for quick roadside/fuel/workshop requests.
--
CREATE TABLE `user_vehicles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `vehicle_type` ENUM('Sedan', 'SUV', 'Supercar/Exotic', 'Microbus', 'Hatchback', 'Motorcycle', 'Commercial') NOT NULL DEFAULT 'Sedan',
  `make` VARCHAR(50) NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `model_year` SMALLINT UNSIGNED DEFAULT NULL,
  `license_plate` VARCHAR(50) NOT NULL,
  `fuel_type` ENUM('Octane', 'Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG/LPG') NOT NULL DEFAULT 'Octane',
  `chassis_number` VARCHAR(50) DEFAULT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_uv_user_id` (`user_id`),
  CONSTRAINT `fk_uv_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Registered vehicles owned by basic users';

-- ==============================================================================
-- 4. Workshop Owner Domain
-- ==============================================================================

--
-- Table structure for `workshops`
-- Auto workshop facilities registered by workshop owners.
--
CREATE TABLE `workshops` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner_user_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `trade_license` VARCHAR(100) NOT NULL,
  `zone` VARCHAR(100) NOT NULL,
  `address` TEXT NOT NULL,
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `emergency_phone` VARCHAR(25) DEFAULT NULL,
  `tow_phone` VARCHAR(25) DEFAULT NULL,
  `opening_time` TIME DEFAULT '08:00:00',
  `closing_time` TIME DEFAULT '22:00:00',
  `is_24_7` TINYINT(1) NOT NULL DEFAULT 0,
  `rating` DECIMAL(2, 1) NOT NULL DEFAULT 5.0,
  `reviews_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `price_level` VARCHAR(50) DEFAULT '৳৳ Standard Rates',
  `image_url` VARCHAR(255) DEFAULT NULL,
  `verification_status` ENUM('verified', 'pending', 'rejected') NOT NULL DEFAULT 'verified',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_workshops_owner` (`owner_user_id`),
  KEY `idx_workshops_zone` (`zone`),
  CONSTRAINT `fk_workshops_owner` FOREIGN KEY (`owner_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Physical workshops registered and managed by workshop owners';

--
-- Table structure for `workshop_services`
-- Specific repair and tuning services offered by each workshop.
--
CREATE TABLE `workshop_services` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `workshop_id` INT UNSIGNED NOT NULL,
  `service_name` VARCHAR(100) NOT NULL,
  `category` ENUM(
    'Engine Diagnostics',
    'Brake Overhaul',
    'AC Repair & Refill',
    'Transmission Repair',
    'Suspension & Steering',
    'Laser Wheel Alignment',
    'Computerized Scan',
    'ECU Tuning & Upgrades',
    'Body & Paint',
    'Periodic Maintenance'
  ) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `estimated_price` DECIMAL(10, 2) NOT NULL,
  `estimated_duration_minutes` INT UNSIGNED NOT NULL DEFAULT 60,
  `is_available` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_ws_services_workshop` (`workshop_id`),
  CONSTRAINT `fk_ws_services_workshop` FOREIGN KEY (`workshop_id`) REFERENCES `workshops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Services offered by individual workshops';

--
-- Table structure for `workshop_mechanics`
-- Mechanics and technicians employed inside a specific workshop.
--
CREATE TABLE `workshop_mechanics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `workshop_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `specialization` VARCHAR(100) NOT NULL,
  `experience_years` TINYINT UNSIGNED NOT NULL DEFAULT 3,
  `phone` VARCHAR(25) DEFAULT NULL,
  `is_on_duty` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_mech_workshop` (`workshop_id`),
  CONSTRAINT `fk_mech_workshop` FOREIGN KEY (`workshop_id`) REFERENCES `workshops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Mechanics working in certified partner workshops';

--
-- Table structure for `workshop_appointments`
-- Customer bookings for garage maintenance and vehicle diagnostic bays.
--
CREATE TABLE `workshop_appointments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `workshop_id` INT UNSIGNED NOT NULL,
  `service_id` INT UNSIGNED DEFAULT NULL,
  `assigned_mechanic_id` INT UNSIGNED DEFAULT NULL,
  `car_model` VARCHAR(100) NOT NULL,
  `car_reg_number` VARCHAR(50) NOT NULL,
  `appointment_date` DATE NOT NULL,
  `appointment_time` TIME NOT NULL,
  `customer_notes` TEXT DEFAULT NULL,
  `status` ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  `total_cost` DECIMAL(10, 2) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_appt_customer` (`customer_id`),
  KEY `idx_appt_workshop` (`workshop_id`),
  KEY `idx_appt_service` (`service_id`),
  KEY `idx_appt_mechanic` (`assigned_mechanic_id`),
  CONSTRAINT `fk_appt_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appt_workshop` FOREIGN KEY (`workshop_id`) REFERENCES `workshops` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appt_service` FOREIGN KEY (`service_id`) REFERENCES `workshop_services` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_appt_mechanic` FOREIGN KEY (`assigned_mechanic_id`) REFERENCES `workshop_mechanics` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Appointments booked with workshops';

-- ==============================================================================
-- 5. Parts Supplier Domain (Store Selling Parts)
-- ==============================================================================

--
-- Table structure for `suppliers`
-- Companies and distributor suppliers registered to sell parts through the Mechify store.
--
CREATE TABLE `suppliers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_user_id` INT UNSIGNED NOT NULL,
  `company_name` VARCHAR(150) NOT NULL,
  `trade_license_bin` VARCHAR(100) NOT NULL,
  `warehouse_address` TEXT NOT NULL,
  `city` VARCHAR(50) DEFAULT 'Dhaka',
  `contact_person` VARCHAR(100) NOT NULL,
  `contact_phone` VARCHAR(25) NOT NULL,
  `payout_method` ENUM('Bank Transfer', 'bKash Merchant', 'Nagad Pay') DEFAULT 'Bank Transfer',
  `payout_details` TEXT DEFAULT NULL,
  `verification_status` ENUM('verified', 'pending', 'rejected') NOT NULL DEFAULT 'verified',
  `rating` DECIMAL(2, 1) NOT NULL DEFAULT 4.9,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_supplier_user` (`supplier_user_id`),
  CONSTRAINT `fk_supplier_user` FOREIGN KEY (`supplier_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Suppliers selling automotive parts in the store';

--
-- Table structure for `spare_parts`
-- Automotive parts and aftermarket accessories listed in the Mechify Store.
--
CREATE TABLE `spare_parts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_id` INT UNSIGNED NOT NULL,
  `category` ENUM(
    'Engine Parts',
    'Brake Components',
    'Tyres',
    'Filters',
    'Suspension',
    'Exhaust & Turbo',
    'Fluids & Oils',
    'Batteries',
    'Lighting & Electrical',
    'Interior & Accessories'
  ) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `sku` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `oem_number` VARCHAR(100) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `specifications` JSON DEFAULT NULL,
  `unit_cost_price` DECIMAL(10, 2) NOT NULL,
  `retail_selling_price` DECIMAL(10, 2) NOT NULL,
  `discount_percentage` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `stock_quantity` INT UNSIGNED NOT NULL DEFAULT 0,
  `min_reorder_level` SMALLINT UNSIGNED NOT NULL DEFAULT 5,
  `warranty` VARCHAR(100) DEFAULT '1-Year Limited',
  `image_url` VARCHAR(255) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_parts_sku` (`sku`),
  KEY `idx_parts_supplier` (`supplier_id`),
  KEY `idx_parts_category` (`category`),
  CONSTRAINT `fk_parts_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Spare parts and accessories for the store';

--
-- Table structure for `store_orders`
-- Orders placed by customers for spare parts.
--
CREATE TABLE `store_orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `order_number` VARCHAR(50) NOT NULL,
  `subtotal_amount` DECIMAL(10, 2) NOT NULL,
  `shipping_fee` DECIMAL(10, 2) NOT NULL DEFAULT 60.00,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` ENUM('Visa', 'MasterCard', 'bKash', 'Nagad', 'Cash On Delivery') NOT NULL DEFAULT 'bKash',
  `payment_status` ENUM('unpaid', 'paid', 'refunded') NOT NULL DEFAULT 'unpaid',
  `delivery_status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  `shipping_address` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_store_orders_num` (`order_number`),
  KEY `idx_store_orders_customer` (`customer_id`),
  CONSTRAINT `fk_store_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Customer orders from the spare parts store';

--
-- Table structure for `store_order_items`
-- Line items within each store order.
--
CREATE TABLE `store_order_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `part_id` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order` (`order_id`),
  KEY `idx_order_items_part` (`part_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `store_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_part` FOREIGN KEY (`part_id`) REFERENCES `spare_parts` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Line items for parts store purchases';

-- ==============================================================================
-- 6. Driver Domains (Driver Without Car & Driver With Car)
-- ==============================================================================

--
-- Table structure for `driver_profiles`
-- Professional driver profiles for both:
--   - 'without_car' (Driver only / personal chauffeur for the user's car)
--   - 'with_car' (Driver with personal car available for rides and chauffeur tours)
--
CREATE TABLE `driver_profiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `driver_user_id` INT UNSIGNED NOT NULL,
  `driver_type` ENUM('without_car', 'with_car') NOT NULL,
  `license_number` VARCHAR(50) NOT NULL,
  `license_type` VARCHAR(50) NOT NULL DEFAULT 'BRTA Professional Class-A',
  `license_expiry` DATE DEFAULT NULL,
  `nid_number` VARCHAR(50) NOT NULL,
  `experience_years` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `transmission_skills` VARCHAR(100) NOT NULL DEFAULT 'Manual & Automatic',
  `car_proficiency` VARCHAR(255) NOT NULL DEFAULT 'Luxury Sedans, SUVs, Microbus',
  `languages` VARCHAR(255) NOT NULL DEFAULT 'Bangla, English',
  `hourly_rate` DECIMAL(10, 2) NOT NULL DEFAULT 20.00,
  `daily_rate` DECIMAL(10, 2) NOT NULL DEFAULT 100.00,
  `rating` DECIMAL(2, 1) NOT NULL DEFAULT 4.9,
  `trips_completed` INT UNSIGNED NOT NULL DEFAULT 0,
  `badge` VARCHAR(50) DEFAULT 'VERIFIED PRO',
  `police_cleared` TINYINT(1) NOT NULL DEFAULT 1,
  `non_smoker` TINYINT(1) NOT NULL DEFAULT 1,
  `night_shift_ready` TINYINT(1) NOT NULL DEFAULT 1,
  `availability_status` ENUM('available', 'on_trip', 'offline') NOT NULL DEFAULT 'available',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_driver_user` (`driver_user_id`),
  UNIQUE KEY `idx_driver_license` (`license_number`),
  KEY `idx_driver_type` (`driver_type`),
  KEY `idx_driver_status` (`availability_status`),
  CONSTRAINT `fk_driver_user` FOREIGN KEY (`driver_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Driver accounts (with or without car)';

--
-- Table structure for `driver_vehicles`
-- Dedicated to 'driver_with_car' accounts where the driver owns or drives a specific vehicle.
--
CREATE TABLE `driver_vehicles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `driver_id` INT UNSIGNED NOT NULL,
  `car_model` VARCHAR(100) NOT NULL,
  `car_type` VARCHAR(50) NOT NULL DEFAULT 'Luxury SUV',
  `license_plate` VARCHAR(50) NOT NULL,
  `seating_capacity` TINYINT UNSIGNED NOT NULL DEFAULT 4,
  `luggage_capacity` TINYINT UNSIGNED NOT NULL DEFAULT 3,
  `hourly_rate` DECIMAL(10, 2) NOT NULL DEFAULT 50.00,
  `daily_rate` DECIMAL(10, 2) NOT NULL DEFAULT 300.00,
  `features` TEXT DEFAULT NULL,
  `car_photo_url` VARCHAR(255) DEFAULT NULL,
  `fitness_valid_until` DATE DEFAULT NULL,
  `insurance_number` VARCHAR(100) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_dv_driver` (`driver_id`),
  UNIQUE KEY `idx_dv_plate` (`license_plate`),
  CONSTRAINT `fk_dv_driver` FOREIGN KEY (`driver_id`) REFERENCES `driver_profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Vehicle details attached strictly to drivers with car';

--
-- Table structure for `driver_bookings`
-- Bookings placed by customers for either personal chauffeur or driver with car.
--
CREATE TABLE `driver_bookings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `driver_id` INT UNSIGNED NOT NULL,
  `driver_type` ENUM('without_car', 'with_car') NOT NULL,
  `booking_type` ENUM('hourly', 'daily', 'outstation') NOT NULL DEFAULT 'hourly',
  `duration_value` INT UNSIGNED NOT NULL DEFAULT 1,
  `pickup_address` TEXT NOT NULL,
  `destination_address` TEXT DEFAULT NULL,
  `start_datetime` DATETIME NOT NULL,
  `customer_car_info` VARCHAR(255) DEFAULT NULL COMMENT 'Car details if driver_without_car',
  `total_fare` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_dbk_customer` (`customer_id`),
  KEY `idx_dbk_driver` (`driver_id`),
  KEY `idx_dbk_status` (`status`),
  CONSTRAINT `fk_dbk_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_dbk_driver` FOREIGN KEY (`driver_id`) REFERENCES `driver_profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Customer hire records for drivers';

-- ==============================================================================
-- 7. Mechify Company Staff Domain
-- EXCLUSIVE SCOPE: Only Emergency Roadside Assistance & Emergency Fuel Service
-- ==============================================================================

--
-- Table structure for `mechify_staff_profiles`
-- Official Mechify personnel stationed for 24/7 rapid emergency dispatch.
--
CREATE TABLE `mechify_staff_profiles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `staff_user_id` INT UNSIGNED NOT NULL,
  `badge_id` VARCHAR(50) NOT NULL,
  `authorized_service` ENUM(
    'roadside_assistance',
    'fuel_delivery',
    'both_emergency_services'
  ) NOT NULL DEFAULT 'both_emergency_services',
  `designation` VARCHAR(100) NOT NULL,
  `duty_zone` VARCHAR(100) NOT NULL DEFAULT 'Gulshan/Banani Zone',
  `emergency_vehicle_assigned` VARCHAR(100) NOT NULL,
  `emergency_equipment` TEXT DEFAULT NULL,
  `duty_status` ENUM('available', 'dispatched', 'on_scene', 'off_duty') NOT NULL DEFAULT 'available',
  `current_latitude` DECIMAL(10, 8) DEFAULT NULL,
  `current_longitude` DECIMAL(11, 8) DEFAULT NULL,
  `direct_dispatch_phone` VARCHAR(25) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_staff_user` (`staff_user_id`),
  UNIQUE KEY `idx_staff_badge` (`badge_id`),
  KEY `idx_staff_zone` (`duty_zone`),
  KEY `idx_staff_duty` (`duty_status`),
  CONSTRAINT `fk_staff_user` FOREIGN KEY (`staff_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Mechify company staff strictly handling Emergency Roadside & Fuel';

--
-- Table structure for `emergency_roadside_requests`
-- 24/7 SOS dispatch logs serviced exclusively by Mechify company staff.
--
CREATE TABLE `emergency_roadside_requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED DEFAULT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(25) NOT NULL,
  `customer_nid` VARCHAR(50) DEFAULT NULL,
  `vehicle_type` VARCHAR(50) NOT NULL,
  `vehicle_model` VARCHAR(100) NOT NULL,
  `vehicle_reg_number` VARCHAR(50) DEFAULT NULL,
  `breakdown_issue` ENUM(
    'Flat Tire / Puncture',
    'Dead Battery / Jumpstart',
    'Engine Overheat / Smoke',
    'Mechanical Breakdown',
    'Keys Locked Inside',
    'Brake Failure',
    'Accident Recovery / Towing'
  ) NOT NULL,
  `vehicle_condition` VARCHAR(100) DEFAULT NULL,
  `urgency_level` ENUM('Critical SOS', 'High (Within 15-20 mins)', 'Standard') NOT NULL DEFAULT 'Critical SOS',
  `gps_latitude` DECIMAL(10, 8) NOT NULL,
  `gps_longitude` DECIMAL(11, 8) NOT NULL,
  `location_address` TEXT NOT NULL,
  `assigned_staff_id` INT UNSIGNED DEFAULT NULL,
  `status` ENUM(
    'sos_broadcasted',
    'assigned',
    'patrol_en_route',
    'on_scene_diagnosing',
    'resolved_completed',
    'cancelled'
  ) NOT NULL DEFAULT 'sos_broadcasted',
  `service_fee` DECIMAL(10, 2) NOT NULL DEFAULT 850.00,
  `payment_method` ENUM('Cash', 'bKash', 'Nagad', 'Card') DEFAULT 'bKash',
  `payment_status` ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',
  `dispatch_timestamp` DATETIME DEFAULT NULL,
  `arrival_timestamp` DATETIME DEFAULT NULL,
  `completion_timestamp` DATETIME DEFAULT NULL,
  `staff_resolution_notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_err_customer` (`customer_id`),
  KEY `idx_err_staff` (`assigned_staff_id`),
  KEY `idx_err_status` (`status`),
  CONSTRAINT `fk_err_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_err_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `mechify_staff_profiles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Roadside emergency assistance requests handled by Mechify staff';

--
-- Table structure for `emergency_fuel_requests`
-- On-demand roadside doorstep emergency fuel requests serviced exclusively by Mechify company staff.
--
CREATE TABLE `emergency_fuel_requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED DEFAULT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(25) NOT NULL,
  `customer_nid` VARCHAR(50) DEFAULT NULL,
  `vehicle_type` VARCHAR(50) NOT NULL,
  `vehicle_reg_number` VARCHAR(50) NOT NULL,
  `fuel_type` ENUM('Octane (95 RON)', 'Petrol', 'Diesel Premium', 'Mobile EV Quick Boost') NOT NULL,
  `quantity_liters` DECIMAL(5, 2) NOT NULL DEFAULT 10.00,
  `fuel_unit_price` DECIMAL(10, 2) NOT NULL,
  `delivery_fee` DECIMAL(10, 2) NOT NULL DEFAULT 200.00,
  `total_cost` DECIMAL(10, 2) NOT NULL,
  `gps_latitude` DECIMAL(10, 8) NOT NULL,
  `gps_longitude` DECIMAL(11, 8) NOT NULL,
  `delivery_address` TEXT NOT NULL,
  `assigned_staff_id` INT UNSIGNED DEFAULT NULL,
  `status` ENUM(
    'order_placed',
    'staff_assigned',
    'tanker_en_route',
    'dispensing_fuel',
    'delivered_completed',
    'cancelled'
  ) NOT NULL DEFAULT 'order_placed',
  `payment_method` ENUM('bKash', 'Nagad', 'Cash On Delivery', 'Card') NOT NULL DEFAULT 'bKash',
  `payment_status` ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',
  `dispatch_timestamp` DATETIME DEFAULT NULL,
  `delivery_timestamp` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_efr_customer` (`customer_id`),
  KEY `idx_efr_staff` (`assigned_staff_id`),
  KEY `idx_efr_status` (`status`),
  CONSTRAINT `fk_efr_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_efr_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `mechify_staff_profiles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Emergency fuel delivery requests handled by Mechify staff';

-- ==============================================================================
-- 8. Platform Support Tables
-- ==============================================================================

--
-- Table structure for `newsletter_subscribers`
--
CREATE TABLE `newsletter_subscribers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `subscribed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_newsletter_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 9. Comprehensive Seed Data
-- ==============================================================================

-- 9.1 Insert Platform Users for each of the 6 roles + admin
-- Basic Users (Customers)
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(1, 'basic_user', 'mahi@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Mahi', 'Rahman', '+880 1712-345678', 1, 'active'),
(2, 'basic_user', 'sarah.khan@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Sarah', 'Khan', '+880 1819-876543', 1, 'active');

-- Workshop Owners
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(3, 'workshop_owner', 'tony.stark@mechifyhub.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Tony', 'Stark', '+880 1304-098448', 1, 'active'),
(4, 'workshop_owner', 'bruce.wayne@apexautocare.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Bruce', 'Wayne', '+880 1711-224466', 1, 'active');

-- Parts Suppliers
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(5, 'parts_supplier', 'supplier.aeroflow@partsdistro.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Rafiqul', 'Alam', '+880 1911-558899', 1, 'active'),
(6, 'parts_supplier', 'brembo.bangladesh@autoparts.bd', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Kamal', 'Hossain', '+880 1715-443322', 1, 'active');

-- Drivers Without Car (Professional Chauffeurs)
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(7, 'driver_without_car', 'farhan.chauffeur@mechify.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Farhan', 'Ahmed', '+880 1622-110033', 1, 'active'),
(8, 'driver_without_car', 'tanvir.driver@mechify.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Tanvir', 'Islam', '+880 1833-221144', 1, 'active');

-- Drivers With Car (Ride / Tour Drivers with fleet vehicles)
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(9, 'driver_with_car', 'driver@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Masud', 'Chowdhury', '+880 1516-520602', 1, 'active'),
(10, 'driver_with_car', 'shakib.rides@mechify.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Shakib', 'Rahman', '+880 1799-887766', 1, 'active');

-- Mechify Company Staff (Strictly Emergency Roadside & Fuel)
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(11, 'mechify_staff', 'patrol1.staff@mechify.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Tariqul', 'Islam', '+880 1304-098401', 1, 'active'),
(12, 'mechify_staff', 'fueltanker2.staff@mechify.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Zahid', 'Hasan', '+880 1304-098402', 1, 'active');

-- Platform Admin
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(13, 'admin', 'admin@mechify.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Super', 'Admin', '+880 1304-098400', 1, 'active');

-- 9.2 Seed Customer Profiles & Garage
INSERT INTO `customer_profiles` (`user_id`, `nid_number`, `emergency_contact_name`, `emergency_contact_phone`, `preferred_payment_method`, `address_line`, `city`) VALUES
(1, '19982691234567890', 'Mustafizur Rahman', '+880 1711-000001', 'bKash', 'House 14, Road 7, Gulshan-1', 'Dhaka'),
(2, '19952699876543210', 'Kamal Khan', '+880 1819-000002', 'Card', 'Apt 4B, Dhanmondi 27', 'Dhaka');

INSERT INTO `user_vehicles` (`user_id`, `vehicle_type`, `make`, `model`, `model_year`, `license_plate`, `fuel_type`, `is_default`) VALUES
(1, 'Sedan', 'Toyota', 'Allion G-Superior', 2020, 'Dhaka Metro-Ga 34-9012', 'Octane', 1),
(1, 'Supercar/Exotic', 'Porsche', '911 Carrera GTS', 2023, 'Dhaka Metro-Bha 11-0099', 'Octane', 0),
(2, 'SUV', 'Honda', 'CR-V Turbo AWD', 2022, 'Dhaka Metro-Gha 45-6789', 'Octane', 1);

-- 9.3 Seed Workshop Owners & Workshops
INSERT INTO `workshops` (`id`, `owner_user_id`, `name`, `trade_license`, `zone`, `address`, `latitude`, `longitude`, `phone`, `emergency_phone`, `tow_phone`, `is_24_7`, `rating`, `reviews_count`, `price_level`, `image_url`) VALUES
(1, 3, 'Mechify Premier Hub - Gulshan 2', 'TRAD-GUL-2024-8891', 'Gulshan/Banani', 'Plot 12, Road 113, Gulshan-2, Dhaka 1212', 23.79250000, 90.41500000, '+880 1304-098448', '+880 1304-098448', '+880 1516-520602', 1, 4.9, 248, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(2, 4, 'Apex Auto Care & Diagnostics - Banani', 'TRAD-BAN-2023-4412', 'Gulshan/Banani', 'House 45, Road 11, Block F, Banani, Dhaka 1213', 23.79370000, 90.40660000, '+880 1711-224466', '+880 1711-224466', '+880 1516-520602', 1, 4.9, 192, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1486262715619-670810a0740f?w=800');

INSERT INTO `workshop_services` (`workshop_id`, `service_name`, `category`, `description`, `estimated_price`, `estimated_duration_minutes`) VALUES
(1, 'Complete OBD2 Computerized Diagnostic', 'Computerized Scan', 'Full engine, ABS, airbag and powertrain scan using Launch Pro 4.', 1500.00, 30),
(1, 'Ceramic Brake Disc & Pad Overhaul', 'Brake Overhaul', 'Front and rear brake pad replacement with synthetic caliper greasing.', 3500.00, 60),
(1, 'Dual-Zone AC Gas Refill & Compressor Clean', 'AC Repair & Refill', 'R134a refrigerant charge, leak pressure test and cabin microfilter replacement.', 2800.00, 45),
(2, 'Hybrid Battery Cell Balancing & Health Check', 'Engine Diagnostics', 'High-voltage inverter, cooling fan and NiMH/Li-Ion cell performance mapping.', 4500.00, 90),
(2, '3D Laser Wheel Alignment & Wheel Balancing', 'Laser Wheel Alignment', 'Precision 4-wheel Hunter laser camera alignment.', 1800.00, 40);

INSERT INTO `workshop_mechanics` (`workshop_id`, `name`, `specialization`, `experience_years`, `phone`) VALUES
(1, 'Bruce Wayne', 'Chief Master Mechanic', 12, '+880 1711-998811'),
(1, 'Clark Kent', 'Suspension & Steering Specialist', 7, '+880 1711-998812'),
(2, 'Walter White', 'Automotive Electrical & ECU Specialist', 10, '+880 1711-998813');

-- 9.4 Seed Parts Suppliers & Spare Parts Store
INSERT INTO `suppliers` (`id`, `supplier_user_id`, `company_name`, `trade_license_bin`, `warehouse_address`, `contact_person`, `contact_phone`, `payout_method`, `rating`) VALUES
(1, 5, 'AeroFlow Pro Performance Parts BD', 'BIN-00291039-2023', 'Tejgaon Industrial Area, Plot 44, Dhaka', 'Rafiqul Alam', '+880 1911-558899', 'Bank Transfer', 4.9),
(2, 6, 'Brembo Official Distributor Bangladesh', 'BIN-00184491-2024', 'Dhaka Cantonment Gate 3, Dhaka', 'Kamal Hossain', '+880 1715-443322', 'Bank Transfer', 4.9);

INSERT INTO `spare_parts` (`supplier_id`, `category`, `name`, `sku`, `brand`, `oem_number`, `description`, `unit_cost_price`, `retail_selling_price`, `discount_percentage`, `stock_quantity`, `warranty`, `image_url`) VALUES
(1, 'Filters', 'Performance Air Filter', 'ENG-AF-882', 'AeroFlow Pro', '17801-21050', 'High-flow multi-layer oiled cotton gauze filter engineered for maximum clean induction.', 42.00, 59.99, 25, 18, 'Lifetime Washable', '/images/parts/air_filter.jpg'),
(1, 'Exhaust & Turbo', 'Twin-Scroll Billet Turbocharger', 'ENG-TB-901', 'ApexBoost Turbo', '06K145722H', 'Twin-scroll billet compressor wheel turbo designed for instant boost spool-up and up to 550 HP.', 350.00, 499.99, 17, 6, '2-Year Limited', '/images/parts/turbocharger.jpg'),
(1, 'Engine Parts', 'High-Flow Fuel Injector 650cc', 'ENG-FI-550', 'PrecisionFlow', '23209-39075', 'High-impedance 12-hole atomizer spray pattern for ultra-fine fuel atomization.', 65.00, 89.99, 18, 24, '1-Year Warranty', '/images/parts/fuel_injector.jpg'),
(2, 'Brake Components', 'Ceramic Brake Pads Pro (Front Set)', 'BRK-CP-402', 'Brembo Pro', '04465-33450', 'Ultra low-dust ceramic compound offering consistent pedal feel up to 650°C.', 60.00, 89.99, 10, 100, '3-Year Limited', '/images/parts/brake_pads.jpg'),
(2, 'Fluids & Oils', 'Fully Synthetic Engine Oil 5W-30 (4L)', 'FLD-SO-530', 'Motul 8100', '8100-X-CLEAN', '100% synthetic engine oil formulated for gasoline and diesel turbocharged engines.', 32.00, 45.00, 0, 200, 'Guaranteed Authentic', '/images/parts/engine_oil.jpg');

-- 9.5 Seed Drivers Without Car (Personal Chauffeurs)
INSERT INTO `driver_profiles` (`id`, `driver_user_id`, `driver_type`, `license_number`, `license_type`, `license_expiry`, `nid_number`, `experience_years`, `transmission_skills`, `car_proficiency`, `languages`, `hourly_rate`, `daily_rate`, `rating`, `trips_completed`, `badge`, `police_cleared`, `availability_status`) VALUES
(1, 7, 'without_car', 'BRTA-DH-2018-990142', 'BRTA Professional Class-A', '2029-05-15', '19882691230000001', 8, 'All Transmissions + EV Dual Motor', 'Luxury Sedans, SUVs, Microbus', 'Bangla, English', 20.00, 110.00, 4.9, 680, 'TOP VIP CHAUFFEUR', 1, 'available'),
(2, 8, 'without_car', 'BRTA-DH-2019-881230', 'BRTA Professional Class-A', '2028-11-20', '19902691230000002', 6, 'Manual & Automatic', 'All Sedans & 4x4 SUVs', 'Bangla, English, Hindi', 18.00, 95.00, 4.8, 540, 'HIGHLY RECOMMENDED', 1, 'available');

-- 9.6 Seed Drivers With Car (Ride / Chauffeur Fleet)
INSERT INTO `driver_profiles` (`id`, `driver_user_id`, `driver_type`, `license_number`, `license_type`, `license_expiry`, `nid_number`, `experience_years`, `transmission_skills`, `car_proficiency`, `languages`, `hourly_rate`, `daily_rate`, `rating`, `trips_completed`, `badge`, `police_cleared`, `availability_status`) VALUES
(3, 9, 'with_car', 'BRTA-DH-2015-110045', 'BRTA Professional Class-A', '2030-01-10', '19852691230000003', 11, 'All Transmissions + EV Dual Motor', 'Supercars, Luxury & Standard', 'Bangla, English', 55.00, 320.00, 4.9, 1240, 'TOP VIP CHAUFFEUR', 1, 'available'),
(4, 10, 'with_car', 'BRTA-DH-2017-772211', 'BRTA Professional Class-A', '2029-08-14', '19892691230000004', 9, 'Automatic Only', 'Executive Luxury', 'Bangla, English', 75.00, 450.00, 5.0, 890, 'TOP VIP CHAUFFEUR', 1, 'available');

INSERT INTO `driver_vehicles` (`driver_id`, `car_model`, `car_type`, `license_plate`, `seating_capacity`, `luggage_capacity`, `hourly_rate`, `daily_rate`, `features`, `car_photo_url`) VALUES
(3, 'Toyota Land Cruiser Prado TX-L', 'Luxury SUV', 'Dhaka Metro-Gha 23-4567', 7, 4, 55.00, 320.00, '4x4 Offroad, Leather Interior, Dual AC, Sunroof, Tinted Privacy Glass', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700'),
(4, 'Mercedes-Benz E-Class AMG Line', 'Executive Luxury', 'Dhaka Metro-Bha 12-8899', 4, 3, 75.00, 450.00, 'Chauffeur Mode, Wi-Fi Onboard, Bottled Water, Silent Cabin, Burmester Audio', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700');

-- 9.7 Seed Mechify Company Staff
-- STRICT RULE: Mechify staff only provide emergency roadside assistance & emergency fuel delivery
INSERT INTO `mechify_staff_profiles` (`id`, `staff_user_id`, `badge_id`, `authorized_service`, `designation`, `duty_zone`, `emergency_vehicle_assigned`, `emergency_equipment`, `duty_status`, `current_latitude`, `current_longitude`, `direct_dispatch_phone`) VALUES
(1, 11, 'MECH-ROAD-001', 'roadside_assistance', 'Senior Roadside Emergency Specialist', 'Gulshan/Banani Zone', 'Mechify Rapid Patrol Van #01', 'Heavy-Duty Jump Starter 4000A, Hydraulic Floor Jack, Professional OBD2 Diagnostic Tablet, Impact Wrench & Lockout Kit', 'available', 23.79250000, 90.41500000, '+880 1304-098401'),
(2, 12, 'MECH-FUEL-002', 'fuel_delivery', 'Mobile Fuel Dispatch Technician', 'Dhanmondi/Mohammadpur Zone', 'Mechify Rapid Fuel Dispenser Unit #03', 'Calibrated Digital Flow Meter, Anti-Static Spark-Proof Dispensers, 100L Octane & Diesel Certified Auxiliary Reservoir', 'available', 23.74650000, 90.37600000, '+880 1304-098402');

-- 9.8 Seed Sample Emergency Roadside Assistance Request (serviced by Mechify Staff)
INSERT INTO `emergency_roadside_requests` (`customer_id`, `customer_name`, `customer_phone`, `customer_nid`, `vehicle_type`, `vehicle_model`, `vehicle_reg_number`, `breakdown_issue`, `urgency_level`, `gps_latitude`, `gps_longitude`, `location_address`, `assigned_staff_id`, `status`, `service_fee`, `payment_method`, `payment_status`, `dispatch_timestamp`, `staff_resolution_notes`) VALUES
(1, 'Mahi Rahman', '+880 1712-345678', '19982691234567890', 'Sedan', 'Toyota Allion', 'Dhaka Metro-Ga 34-9012', 'Dead Battery / Jumpstart', 'Critical SOS', 23.79400000, 90.41450000, 'Road 11, Banani, near Kemal Ataturk Avenue', 1, 'patrol_en_route', 850.00, 'bKash', 'paid', NOW(), 'Assigned Mechify Patrol Van #01 with Senior Technician Tariqul Islam. ETA 6 minutes.');

-- 9.9 Seed Sample Emergency Fuel Delivery Request (serviced by Mechify Staff)
INSERT INTO `emergency_fuel_requests` (`customer_id`, `customer_name`, `customer_phone`, `customer_nid`, `vehicle_type`, `vehicle_reg_number`, `fuel_type`, `quantity_liters`, `fuel_unit_price`, `delivery_fee`, `total_cost`, `gps_latitude`, `gps_longitude`, `delivery_address`, `assigned_staff_id`, `status`, `payment_method`, `payment_status`, `dispatch_timestamp`) VALUES
(2, 'Sarah Khan', '+880 1819-876543', '19952699876543210', 'SUV', 'Dhaka Metro-Gha 45-6789', 'Octane (95 RON)', 15.00, 135.00, 200.00, 2225.00, 23.74700000, 90.37800000, 'Satmasjid Road, Dhanmondi 27', 2, 'tanker_en_route', 'bKash', 'paid', NOW());

-- 9.10 Seed Sample Driver Hire Booking
INSERT INTO `driver_bookings` (`customer_id`, `driver_id`, `driver_type`, `booking_type`, `duration_value`, `pickup_address`, `destination_address`, `start_datetime`, `customer_car_info`, `total_fare`, `status`, `payment_status`) VALUES
(1, 1, 'without_car', 'hourly', 4, 'House 14, Road 7, Gulshan-1', 'Hazrat Shahjalal International Airport', DATE_ADD(NOW(), INTERVAL 2 HOUR), 'Toyota Allion G-Superior (Automatic)', 80.00, 'accepted', 'paid');

-- 9.11 Seed Sample Store Order
INSERT INTO `store_orders` (`id`, `customer_id`, `order_number`, `subtotal_amount`, `shipping_fee`, `total_amount`, `payment_method`, `payment_status`, `delivery_status`, `shipping_address`) VALUES
(1, 1, 'ORD-2026-8801', 149.98, 60.00, 209.98, 'bKash', 'paid', 'processing', 'House 14, Road 7, Gulshan-1, Dhaka');

INSERT INTO `store_order_items` (`order_id`, `part_id`, `quantity`, `unit_price`, `total_price`) VALUES
(1, 1, 1, 59.99, 59.99),
(1, 4, 1, 89.99, 89.99);

-- 9.12 Seed Newsletter Subscribers
INSERT INTO `newsletter_subscribers` (`email`) VALUES
('autofan@gmail.com'),
('speeddemon@yahoo.com'),
('dhakacars@outlook.com');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
