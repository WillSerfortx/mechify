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
-- Customer bookings for garage maintenance, emergency home service, and emergency roadside dispatch.
--
CREATE TABLE `workshop_appointments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `workshop_id` INT UNSIGNED NOT NULL,
  `service_id` INT UNSIGNED DEFAULT NULL,
  `assigned_mechanic_id` INT UNSIGNED DEFAULT NULL,
  `booking_type` ENUM('emergency_roadside', 'emergency_home', 'workshop_bay') NOT NULL DEFAULT 'workshop_bay',
  `urgency_level` ENUM('CRITICAL SOS', 'URGENT HOME DISPATCH', 'Standard Bay') NOT NULL DEFAULT 'Standard Bay',
  `car_model` VARCHAR(100) NOT NULL,
  `car_reg_number` VARCHAR(50) NOT NULL,
  `dispatch_address` TEXT DEFAULT NULL,
  `appointment_date` DATE NOT NULL,
  `appointment_time` TIME NOT NULL,
  `customer_notes` TEXT DEFAULT NULL,
  `status` ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  `total_cost` DECIMAL(10, 2) DEFAULT NULL,
  `payment_method` ENUM('Cash', 'bKash', 'Nagad', 'Card') NOT NULL DEFAULT 'bKash',
  `payment_status` ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_appt_customer` (`customer_id`),
  KEY `idx_appt_workshop` (`workshop_id`),
  KEY `idx_appt_service` (`service_id`),
  KEY `idx_appt_mechanic` (`assigned_mechanic_id`),
  KEY `idx_appt_type` (`booking_type`),
  CONSTRAINT `fk_appt_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appt_workshop` FOREIGN KEY (`workshop_id`) REFERENCES `workshops` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appt_service` FOREIGN KEY (`service_id`) REFERENCES `workshop_services` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_appt_mechanic` FOREIGN KEY (`assigned_mechanic_id`) REFERENCES `workshop_mechanics` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Appointments and emergency dispatches booked with workshops';

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

-- 9.1b 30 Workshop Owner Demo Accounts (Password: 123)
INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_verified`, `status`) VALUES
(20, 'workshop_owner', 'workshop1@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Tony', 'Stark', '+880 1304-098448', 1, 'active'),
(21, 'workshop_owner', 'workshop2@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Bruce', 'Wayne', '+880 1711-224466', 1, 'active'),
(22, 'workshop_owner', 'workshop3@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Brigadier', '(Retd.) Tariq', '+880 1516-520602', 1, 'active'),
(23, 'workshop_owner', 'workshop4@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Master', 'Shamsul Huq', '+880 1912-334455', 1, 'active'),
(24, 'workshop_owner', 'workshop5@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Engr.', 'Mahbubur Rahman', '+880 1819-445566', 1, 'active'),
(25, 'workshop_owner', 'workshop6@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Kabir', 'Hossain', '+880 1716-208022', 1, 'active'),
(26, 'workshop_owner', 'workshop7@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Arifur', 'Rahman', '+880 1717-209359', 1, 'active'),
(27, 'workshop_owner', 'workshop8@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Nasir', 'Uddin', '+880 1718-210696', 1, 'active'),
(28, 'workshop_owner', 'workshop9@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Mohiuddin', 'Ahmed', '+880 1719-212033', 1, 'active'),
(29, 'workshop_owner', 'workshop10@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Ziaul', 'Haque', '+880 1720-213370', 1, 'active'),
(30, 'workshop_owner', 'workshop11@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Mehedi', 'Hasan', '+880 1721-214707', 1, 'active'),
(31, 'workshop_owner', 'workshop12@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Ashraful', 'Islam', '+880 1722-216044', 1, 'active'),
(32, 'workshop_owner', 'workshop13@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Enamul', 'Haque', '+880 1723-217381', 1, 'active'),
(33, 'workshop_owner', 'workshop14@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Sazzad', 'Hossain', '+880 1724-218718', 1, 'active'),
(34, 'workshop_owner', 'workshop15@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Kamrul', 'Hasan', '+880 1725-220055', 1, 'active'),
(35, 'workshop_owner', 'workshop16@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Mustafa', 'Kamal', '+880 1726-221392', 1, 'active'),
(36, 'workshop_owner', 'workshop17@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Sayeed', 'Anwar', '+880 1727-222729', 1, 'active'),
(37, 'workshop_owner', 'workshop18@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Golam', 'Rabbani', '+880 1728-224066', 1, 'active'),
(38, 'workshop_owner', 'workshop19@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Jahangir', 'Alam', '+880 1729-225403', 1, 'active'),
(39, 'workshop_owner', 'workshop20@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Mahfuzur', 'Rahman', '+880 1730-226740', 1, 'active'),
(40, 'workshop_owner', 'workshop21@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Khaled', 'Mahmud', '+880 1731-228077', 1, 'active'),
(41, 'workshop_owner', 'workshop22@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Habibur', 'Rahman', '+880 1732-229414', 1, 'active'),
(42, 'workshop_owner', 'workshop23@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Anisur', 'Rahman', '+880 1733-230751', 1, 'active'),
(43, 'workshop_owner', 'workshop24@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Shahidul', 'Islam', '+880 1734-232088', 1, 'active'),
(44, 'workshop_owner', 'workshop25@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Faisal', 'Ahmed', '+880 1735-233425', 1, 'active'),
(45, 'workshop_owner', 'workshop26@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Belal', 'Hossain', '+880 1736-234762', 1, 'active'),
(46, 'workshop_owner', 'workshop27@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Mizanur', 'Rahman', '+880 1737-236099', 1, 'active'),
(47, 'workshop_owner', 'workshop28@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Saiful', 'Islam', '+880 1738-237436', 1, 'active'),
(48, 'workshop_owner', 'workshop29@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Lutfor', 'Rahman', '+880 1739-238773', 1, 'active'),
(49, 'workshop_owner', 'workshop30@gmail.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Bazlur', 'Rashid', '+880 1740-240110', 1, 'active');

-- 9.2 Seed Customer Profiles & Garage
INSERT INTO `customer_profiles` (`user_id`, `nid_number`, `emergency_contact_name`, `emergency_contact_phone`, `preferred_payment_method`, `address_line`, `city`) VALUES
(1, '19982691234567890', 'Mustafizur Rahman', '+880 1711-000001', 'bKash', 'House 14, Road 7, Gulshan-1', 'Dhaka'),
(2, '19952699876543210', 'Kamal Khan', '+880 1819-000002', 'Card', 'Apt 4B, Dhanmondi 27', 'Dhaka');

INSERT INTO `user_vehicles` (`user_id`, `vehicle_type`, `make`, `model`, `model_year`, `license_plate`, `fuel_type`, `is_default`) VALUES
(1, 'Sedan', 'Toyota', 'Allion G-Superior', 2020, 'Dhaka Metro-Ga 34-9012', 'Octane', 1),
(1, 'Supercar/Exotic', 'Porsche', '911 Carrera GTS', 2023, 'Dhaka Metro-Bha 11-0099', 'Octane', 0),
(2, 'SUV', 'Honda', 'CR-V Turbo AWD', 2022, 'Dhaka Metro-Gha 45-6789', 'Octane', 1);


-- 9.3b 30 Verified Partner Workshops across Dhaka
INSERT INTO `workshops` (`id`, `owner_user_id`, `name`, `trade_license`, `zone`, `address`, `latitude`, `longitude`, `phone`, `emergency_phone`, `tow_phone`, `is_24_7`, `rating`, `reviews_count`, `price_level`, `image_url`) VALUES
(1, 20, 'Mechify Premier Hub - Gulshan 2', 'TRAD-DHK-2024-1001', 'Gulshan/Banani', 'Plot 12, Road 113, Gulshan-2, Dhaka 1212', 23.7925, 90.415, '+880 1304-098448', '+880 1304-098448', '+880 1516-520602', 1, 4.9, 248, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(2, 21, 'Apex Auto Care & Diagnostics - Banani', 'TRAD-DHK-2024-1002', 'Gulshan/Banani', 'House 45, Road 11, Block F, Banani, Dhaka 1213', 23.7937, 90.4066, '+880 1711-224466', '+880 1711-224466', '+880 1516-520602', 1, 4.9, 192, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(3, 22, 'Baridhara DOHS Elite Auto Workshop', 'TRAD-DHK-2024-1003', 'Gulshan/Banani', 'Lane 1, Block A, Baridhara DOHS, Dhaka 1206', 23.805, 90.418, '+880 1516-520602', '+880 1516-520602', '+880 1516-520602', 1, 4.8, 165, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(4, 23, 'Tejgaon Master Auto Works', 'TRAD-DHK-2024-1004', 'Tejgaon/Mohakhali', '240/A Tejgaon Industrial Area, Dhaka 1208', 23.768, 90.399, '+880 1912-334455', '+880 1912-334455', '+880 1516-520602', 1, 4.8, 310, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(5, 24, 'Dhanmondi Executive Motor Works', 'TRAD-DHK-2024-1005', 'Dhanmondi/Mohammadpur', 'House 28, Road 27 (Old), Dhanmondi, Dhaka 1209', 23.7485, 90.374, '+880 1819-445566', '+880 1819-445566', '+880 1516-520602', 1, 4.9, 178, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(6, 25, 'Uttara Euro Tech Auto (#6)', 'TRAD-DHK-2024-1006', 'Uttara Hub', 'Plot 16, Block A, Uttara Hub, Dhaka', 23.822, 90.434, '+880 1716-208022', '+880 1716-208022', '+880 1516-520602', 1, 4.8, 122, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(7, 26, 'Mirpur 10 Rapid Precision Workshop (#7)', 'TRAD-DHK-2024-1007', 'Mirpur Zone', 'Plot 17, Block B, Mirpur Zone, Dhaka', 23.834, 90.443, '+880 1717-209359', '+880 1717-209359', '+880 1516-520602', 1, 4.9, 129, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(8, 27, 'Mohammadpur Ring Road Workshop (#8)', 'TRAD-DHK-2024-1008', 'Dhanmondi/Mohammadpur', 'Plot 18, Block C, Dhanmondi/Mohammadpur, Dhaka', 23.846, 90.38, '+880 1718-210696', '+880 1718-210696', '+880 1516-520602', 1, 4.6, 136, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(9, 28, 'Banani Road 11 German Auto Hub (#9)', 'TRAD-DHK-2024-1009', 'Gulshan/Banani/Badda', 'Plot 19, Block D, Gulshan/Banani/Badda, Dhaka', 23.858, 90.389, '+880 1719-212033', '+880 1719-212033', '+880 1516-520602', 1, 4.7, 143, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(10, 29, 'Motijheel Commercial Fleet Service (#10)', 'TRAD-DHK-2024-1010', 'Central & Old Dhaka', 'Plot 20, Block E, Central & Old Dhaka, Dhaka', 23.75, 90.398, '+880 1720-213370', '+880 1720-213370', '+880 1516-520602', 1, 4.8, 150, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(11, 30, 'Sector 3 Japanese Auto Bay (#11)', 'TRAD-DHK-2024-1011', 'Uttara Hub', 'Plot 21, Block F, Uttara Hub, Dhaka', 23.762, 90.407, '+880 1721-214707', '+880 1721-214707', '+880 1516-520602', 1, 4.9, 157, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(12, 31, 'Mirpur 2 Hybrid Tech Workshop (#12)', 'TRAD-DHK-2024-1012', 'Mirpur Zone', 'Plot 22, Block A, Mirpur Zone, Dhaka', 23.774, 90.416, '+880 1722-216044', '+880 1722-216044', '+880 1516-520602', 1, 4.6, 164, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(13, 32, 'Lalmatia Prestige Auto Garage (#13)', 'TRAD-DHK-2024-1013', 'Dhanmondi/Mohammadpur', 'Plot 23, Block B, Dhanmondi/Mohammadpur, Dhaka', 23.786, 90.425, '+880 1723-217381', '+880 1723-217381', '+880 1516-520602', 1, 4.7, 171, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(14, 33, 'Gulshan 1 Avenue Garage (#14)', 'TRAD-DHK-2024-1014', 'Gulshan/Banani/Badda', 'Plot 24, Block C, Gulshan/Banani/Badda, Dhaka', 23.798, 90.434, '+880 1724-218718', '+880 1724-218718', '+880 1516-520602', 1, 4.8, 178, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(15, 34, 'Khilgaon Precision Auto (#15)', 'TRAD-DHK-2024-1015', 'Central & Old Dhaka', 'Plot 25, Block D, Central & Old Dhaka, Dhaka', 23.81, 90.443, '+880 1725-220055', '+880 1725-220055', '+880 1516-520602', 1, 4.9, 185, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(16, 35, 'Sector 7 Performance Hub (#16)', 'TRAD-DHK-2024-1016', 'Uttara Hub', 'Plot 26, Block E, Uttara Hub, Dhaka', 23.822, 90.38, '+880 1726-221392', '+880 1726-221392', '+880 1516-520602', 1, 4.6, 192, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(17, 36, 'Mirpur 11 Brake & Clutch Bay (#17)', 'TRAD-DHK-2024-1017', 'Mirpur Zone', 'Plot 27, Block F, Mirpur Zone, Dhaka', 23.834, 90.389, '+880 1727-222729', '+880 1727-222729', '+880 1516-520602', 1, 4.7, 199, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(18, 37, 'Shyamoli Square Auto Hospital (#18)', 'TRAD-DHK-2024-1018', 'Dhanmondi/Mohammadpur', 'Plot 28, Block A, Dhanmondi/Mohammadpur, Dhaka', 23.846, 90.398, '+880 1728-224066', '+880 1728-224066', '+880 1516-520602', 1, 4.8, 206, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(19, 38, 'Badda Link Road Auto Works (#19)', 'TRAD-DHK-2024-1019', 'Gulshan/Banani/Badda', 'Plot 29, Block B, Gulshan/Banani/Badda, Dhaka', 23.858, 90.407, '+880 1729-225403', '+880 1729-225403', '+880 1516-520602', 1, 4.9, 213, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(20, 39, 'Malibagh Executive Motors (#20)', 'TRAD-DHK-2024-1020', 'Central & Old Dhaka', 'Plot 30, Block C, Central & Old Dhaka, Dhaka', 23.75, 90.416, '+880 1730-226740', '+880 1730-226740', '+880 1516-520602', 1, 4.6, 220, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(21, 40, 'Airport Road Rapid Clinic (#21)', 'TRAD-DHK-2024-1021', 'Uttara Hub', 'Plot 31, Block D, Uttara Hub, Dhaka', 23.762, 90.425, '+880 1731-228077', '+880 1731-228077', '+880 1516-520602', 1, 4.7, 227, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(22, 41, 'Shewrapara Precision Auto (#22)', 'TRAD-DHK-2024-1022', 'Mirpur Zone', 'Plot 32, Block E, Mirpur Zone, Dhaka', 23.774, 90.434, '+880 1732-229414', '+880 1732-229414', '+880 1516-520602', 1, 4.8, 234, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(23, 42, 'Kalyanpur Rapid Mechanics (#23)', 'TRAD-DHK-2024-1023', 'Dhanmondi/Mohammadpur', 'Plot 33, Block F, Dhanmondi/Mohammadpur, Dhaka', 23.786, 90.443, '+880 1733-230751', '+880 1733-230751', '+880 1516-520602', 1, 4.9, 241, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(24, 43, 'Rampura High-Speed Garage (#24)', 'TRAD-DHK-2024-1024', 'Gulshan/Banani/Badda', 'Plot 34, Block A, Gulshan/Banani/Badda, Dhaka', 23.798, 90.38, '+880 1734-232088', '+880 1734-232088', '+880 1516-520602', 1, 4.6, 248, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(25, 44, 'Shantinagar Elite Car Care (#25)', 'TRAD-DHK-2024-1025', 'Central & Old Dhaka', 'Plot 10, Block B, Central & Old Dhaka, Dhaka', 23.81, 90.389, '+880 1735-233425', '+880 1735-233425', '+880 1516-520602', 1, 4.7, 255, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(26, 45, 'Uttara 11 Hybrid Garage (#26)', 'TRAD-DHK-2024-1026', 'Uttara Hub', 'Plot 11, Block C, Uttara Hub, Dhaka', 23.822, 90.398, '+880 1736-234762', '+880 1736-234762', '+880 1516-520602', 1, 4.8, 262, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(27, 46, 'Kazipara Speed Care (#27)', 'TRAD-DHK-2024-1027', 'Mirpur Zone', 'Plot 12, Block D, Mirpur Zone, Dhaka', 23.834, 90.407, '+880 1737-236099', '+880 1737-236099', '+880 1516-520602', 1, 4.9, 269, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(28, 47, 'Dhanmondi 27 Supercar Center (#28)', 'TRAD-DHK-2024-1028', 'Dhanmondi/Mohammadpur', 'Plot 13, Block E, Dhanmondi/Mohammadpur, Dhaka', 23.846, 90.416, '+880 1738-237436', '+880 1738-237436', '+880 1516-520602', 1, 4.6, 276, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(29, 48, 'Nikunja 2 Airport Road Garage (#29)', 'TRAD-DHK-2024-1029', 'Gulshan/Banani/Badda', 'Plot 14, Block F, Gulshan/Banani/Badda, Dhaka', 23.858, 90.425, '+880 1739-238773', '+880 1739-238773', '+880 1516-520602', 1, 4.7, 283, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'),
(30, 49, 'Old Dhaka Nawabpur Classic Works (#30)', 'TRAD-DHK-2024-1030', 'Central & Old Dhaka', 'Plot 15, Block A, Central & Old Dhaka, Dhaka', 23.75, 90.434, '+880 1740-240110', '+880 1740-240110', '+880 1516-520602', 1, 4.8, 290, '৳৳ Standard Rates', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800');


-- 9.3c Workshop Mechanics on Duty
INSERT INTO `workshop_mechanics` (`workshop_id`, `name`, `specialization`, `experience_years`, `phone`, `is_on_duty`) VALUES
(1, 'Bruce Wayne', 'Master Engine & Turbo Tech', 12, '+880 1711-998811', 1),
(1, 'Clark Kent', 'Suspension & Steering Specialist', 8, '+880 1711-998812', 1),
(1, 'Barry Allen', 'Rapid Electrical & OBD Diagnostics', 6, '+880 1711-998813', 1),
(1, 'Diana Prince', 'Brake Overhaul & Safety Systems', 9, '+880 1711-998814', 1),
(2, 'Walter White', 'ECU Tuning & Hybrid Batteries', 11, '+880 1711-221101', 1),
(2, 'Jesse Pinkman', 'Fast Suspension & Tire Bay', 5, '+880 1711-221102', 1),
(2, 'Mike Ehrmantraut', 'Heavy Mechanical & Transmissions', 15, '+880 1711-221103', 1),
(3, 'Sergeant Alam', 'Master Powertrain Tech', 14, '+880 1516-001', 1),
(3, 'Master Kabir', 'AC & Climate Diagnostics', 9, '+880 1516-002', 1),
(4, 'Ustad Ratan', 'Heavy Transmission & Engine Block', 18, '+880 1912-001', 1),
(4, 'Technician Shakil', 'Computerized Dyno & Alignment', 7, '+880 1912-002', 1),
(5, 'Engr. Shahed', 'German & European Electronics', 10, '+880 1819-001', 1),
(5, 'Master Jahid', 'AC & Dual Climate Pro', 8, '+880 1819-002', 1),
(6, 'Ustad Kabir Specialist', 'Senior Mechanic & Diagnostics', 13, '+880 1716-208022', 1),
(6, 'Technician Hossain', 'Emergency Breakdown & Electrical', 5, '+880 1716-208022', 1),
(7, 'Ustad Arifur Specialist', 'Senior Mechanic & Diagnostics', 14, '+880 1717-209359', 1),
(7, 'Technician Rahman', 'Emergency Breakdown & Electrical', 5, '+880 1717-209359', 1),
(8, 'Ustad Nasir Specialist', 'Senior Mechanic & Diagnostics', 7, '+880 1718-210696', 1),
(8, 'Technician Uddin', 'Emergency Breakdown & Electrical', 5, '+880 1718-210696', 1),
(9, 'Ustad Mohiuddin Specialist', 'Senior Mechanic & Diagnostics', 8, '+880 1719-212033', 1),
(9, 'Technician Ahmed', 'Emergency Breakdown & Electrical', 5, '+880 1719-212033', 1),
(10, 'Ustad Ziaul Specialist', 'Senior Mechanic & Diagnostics', 9, '+880 1720-213370', 1),
(10, 'Technician Haque', 'Emergency Breakdown & Electrical', 5, '+880 1720-213370', 1),
(11, 'Ustad Mehedi Specialist', 'Senior Mechanic & Diagnostics', 10, '+880 1721-214707', 1),
(11, 'Technician Hasan', 'Emergency Breakdown & Electrical', 5, '+880 1721-214707', 1),
(12, 'Ustad Ashraful Specialist', 'Senior Mechanic & Diagnostics', 11, '+880 1722-216044', 1),
(12, 'Technician Islam', 'Emergency Breakdown & Electrical', 5, '+880 1722-216044', 1),
(13, 'Ustad Enamul Specialist', 'Senior Mechanic & Diagnostics', 12, '+880 1723-217381', 1),
(13, 'Technician Haque', 'Emergency Breakdown & Electrical', 5, '+880 1723-217381', 1),
(14, 'Ustad Sazzad Specialist', 'Senior Mechanic & Diagnostics', 13, '+880 1724-218718', 1),
(14, 'Technician Hossain', 'Emergency Breakdown & Electrical', 5, '+880 1724-218718', 1),
(15, 'Ustad Kamrul Specialist', 'Senior Mechanic & Diagnostics', 14, '+880 1725-220055', 1),
(15, 'Technician Hasan', 'Emergency Breakdown & Electrical', 5, '+880 1725-220055', 1),
(16, 'Ustad Mustafa Specialist', 'Senior Mechanic & Diagnostics', 7, '+880 1726-221392', 1),
(16, 'Technician Kamal', 'Emergency Breakdown & Electrical', 5, '+880 1726-221392', 1),
(17, 'Ustad Sayeed Specialist', 'Senior Mechanic & Diagnostics', 8, '+880 1727-222729', 1),
(17, 'Technician Anwar', 'Emergency Breakdown & Electrical', 5, '+880 1727-222729', 1),
(18, 'Ustad Golam Specialist', 'Senior Mechanic & Diagnostics', 9, '+880 1728-224066', 1),
(18, 'Technician Rabbani', 'Emergency Breakdown & Electrical', 5, '+880 1728-224066', 1),
(19, 'Ustad Jahangir Specialist', 'Senior Mechanic & Diagnostics', 10, '+880 1729-225403', 1),
(19, 'Technician Alam', 'Emergency Breakdown & Electrical', 5, '+880 1729-225403', 1),
(20, 'Ustad Mahfuzur Specialist', 'Senior Mechanic & Diagnostics', 11, '+880 1730-226740', 1),
(20, 'Technician Rahman', 'Emergency Breakdown & Electrical', 5, '+880 1730-226740', 1),
(21, 'Ustad Khaled Specialist', 'Senior Mechanic & Diagnostics', 12, '+880 1731-228077', 1),
(21, 'Technician Mahmud', 'Emergency Breakdown & Electrical', 5, '+880 1731-228077', 1),
(22, 'Ustad Habibur Specialist', 'Senior Mechanic & Diagnostics', 13, '+880 1732-229414', 1),
(22, 'Technician Rahman', 'Emergency Breakdown & Electrical', 5, '+880 1732-229414', 1),
(23, 'Ustad Anisur Specialist', 'Senior Mechanic & Diagnostics', 14, '+880 1733-230751', 1),
(23, 'Technician Rahman', 'Emergency Breakdown & Electrical', 5, '+880 1733-230751', 1),
(24, 'Ustad Shahidul Specialist', 'Senior Mechanic & Diagnostics', 7, '+880 1734-232088', 1),
(24, 'Technician Islam', 'Emergency Breakdown & Electrical', 5, '+880 1734-232088', 1),
(25, 'Ustad Faisal Specialist', 'Senior Mechanic & Diagnostics', 8, '+880 1735-233425', 1),
(25, 'Technician Ahmed', 'Emergency Breakdown & Electrical', 5, '+880 1735-233425', 1),
(26, 'Ustad Belal Specialist', 'Senior Mechanic & Diagnostics', 9, '+880 1736-234762', 1),
(26, 'Technician Hossain', 'Emergency Breakdown & Electrical', 5, '+880 1736-234762', 1),
(27, 'Ustad Mizanur Specialist', 'Senior Mechanic & Diagnostics', 10, '+880 1737-236099', 1),
(27, 'Technician Rahman', 'Emergency Breakdown & Electrical', 5, '+880 1737-236099', 1),
(28, 'Ustad Saiful Specialist', 'Senior Mechanic & Diagnostics', 11, '+880 1738-237436', 1),
(28, 'Technician Islam', 'Emergency Breakdown & Electrical', 5, '+880 1738-237436', 1),
(29, 'Ustad Lutfor Specialist', 'Senior Mechanic & Diagnostics', 12, '+880 1739-238773', 1),
(29, 'Technician Rahman', 'Emergency Breakdown & Electrical', 5, '+880 1739-238773', 1),
(30, 'Ustad Bazlur Specialist', 'Senior Mechanic & Diagnostics', 13, '+880 1740-240110', 1),
(30, 'Technician Rashid', 'Emergency Breakdown & Electrical', 5, '+880 1740-240110', 1);


-- 9.3d Workshop Appointments & Emergency Service Dispatches
INSERT INTO `workshop_appointments` (`customer_id`, `workshop_id`, `booking_type`, `urgency_level`, `car_model`, `car_reg_number`, `dispatch_address`, `appointment_date`, `appointment_time`, `customer_notes`, `status`, `total_cost`, `payment_method`, `payment_status`) VALUES
(1, 1, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion G-Superior 2020', 'Dhaka Metro-Ga 34-9012', 'Kemal Ataturk Ave, near Banani 11 intersection, Gulshan', CURRENT_DATE(), '14:30:00', 'Car suddenly stalled in heavy traffic on Kemal Ataturk Ave. Wont crank, hazard lights dimming fast.', 'pending', 1200, 'bKash', 'paid'),
(1, 1, 'emergency_home', 'URGENT HOME DISPATCH', 'Honda CR-V Turbo AWD 2022', 'Dhaka Metro-Gha 45-6789', 'House 42, Road 19/A, Block E, Banani, Dhaka', CURRENT_DATE(), '14:30:00', 'Front right brake caliper locked solid inside garage. Cannot drive car to workshop without burning disc.', 'pending', 2800, 'Cash', 'unpaid'),
(1, 1, 'workshop_bay', 'Standard Bay', 'Porsche 911 Carrera GTS 2023', 'Dhaka Metro-Bha 11-0099', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Scheduled full engine diagnostics, carbon clean, and Launch Pro 4 computerized sensor calibration.', 'in_progress', 6500, 'Card', 'paid'),
(1, 1, 'emergency_roadside', 'CRITICAL SOS', 'Hyundai Tucson Turbo 2021', 'Dhaka Metro-Kha 88-1234', 'Gulshan 2 Circle, Northbound Flyover entrance', CURRENT_DATE(), '14:30:00', 'White smoke billowing from hood on Gulshan-2 circle. Engine temperature gauge in red zone.', 'pending', 3500, 'bKash', 'unpaid'),
(1, 2, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Premio F-EX 2019', 'Dhaka Metro-Ga 29-4512', 'Banani Bridge slope, towards Kakoli', CURRENT_DATE(), '14:30:00', 'Tire blown on Banani bridge. Lug nuts stripped, stock wrench slipping.', 'pending', 950, 'bKash', 'paid'),
(1, 2, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Prius Hybrid 2018', 'Dhaka Metro-Kha 77-6655', 'Road 8, Block D, Banani DOHS, Dhaka', CURRENT_DATE(), '14:30:00', 'Prius won’t show READY light in apartment basement. Need mobile scanner and 12V auxiliary booster.', 'pending', 2200, 'Nagad', 'paid'),
(1, 2, 'workshop_bay', 'Standard Bay', 'BMW 520i M Sport 2021', 'Dhaka Metro-Bha 14-3321', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Car pulling heavily to the left at high speeds. Full 4-wheel Hunter laser calibration required.', 'confirmed', 3200, 'Card', 'unpaid'),
(1, 3, 'emergency_roadside', 'CRITICAL SOS', 'Range Rover Sport HSE', 'Dhaka Metro-Bha 10-9988', 'Madani Avenue, Near Chef’s Table, Baridhara', CURRENT_DATE(), '14:30:00', 'Chassis dropped to bump stops. Vehicle cannot be driven over bumps.', 'pending', 4500, 'bKash', 'paid'),
(1, 3, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Land Cruiser Prado', 'Dhaka Metro-Gha 33-1122', 'House 18, Lane 5, Baridhara DOHS', CURRENT_DATE(), '14:30:00', 'Strong smell of fuel inside personal garage after starting engine.', 'completed', 1800, 'Cash', 'paid'),
(1, 4, 'workshop_bay', 'Standard Bay', 'Toyota HiAce Microbus (Fleet #12)', 'Dhaka Metro-Cha 55-4321', 'Bay #5', CURRENT_DATE(), '14:30:00', 'Routine 100,000km major overhaul, water pump & tensioner pulleys.', 'in_progress', 18500, 'bKash', 'unpaid'),
(1, 4, 'emergency_roadside', 'CRITICAL SOS', 'Nissan X-Trail Hybrid 2017', 'Dhaka Metro-Gha 28-9900', 'Mohakhali Flyover, Southbound crest', CURRENT_DATE(), '14:30:00', 'Serpentine belt snapped on Mohakhali flyover. Battery alternator and water pump stopped.', 'pending', 2100, 'bKash', 'paid'),
(1, 5, 'emergency_home', 'URGENT HOME DISPATCH', 'Audi A6 2.0 TFSI 2020', 'Dhaka Metro-Bha 12-4455', 'House 9, Road 8/A, Dhanmondi, Dhaka', CURRENT_DATE(), '14:30:00', 'Car parked for 3 weeks during doctor conference abroad. Electronic handbrake locked, battery flat.', 'pending', 1900, 'Nagad', 'paid'),
(1, 5, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Noah Hybrid 2019', 'Dhaka Metro-Cha 19-8765', 'Mirpur Road, near Dhanmondi 27 intersection', CURRENT_DATE(), '14:30:00', 'Hybrid warning alarm beeping continuously near Dhanmondi lake road.', 'pending', 2400, 'bKash', 'unpaid'),
(1, 6, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 26-1106', 'Uttara Hub Main Road, near junction 6', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 6, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 36-2206', 'House 12, Road 6, Uttara Hub', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 6, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 16-3306', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5000, 'bKash', 'paid'),
(1, 7, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 27-1107', 'Mirpur Zone Main Road, near junction 7', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 2100, 'bKash', 'paid'),
(1, 7, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 37-2207', 'House 14, Road 7, Mirpur Zone', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 7, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 17-3307', 'Workshop Bay #4 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5500, 'bKash', 'paid'),
(1, 8, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 28-1108', 'Dhanmondi/Mohammadpur Main Road, near junction 8', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1200, 'bKash', 'paid'),
(1, 8, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 38-2208', 'House 16, Road 8, Dhanmondi/Mohammadpur', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 8, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 18-3308', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6000, 'bKash', 'paid'),
(1, 9, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 29-1109', 'Gulshan/Banani/Badda Main Road, near junction 9', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1500, 'bKash', 'paid'),
(1, 9, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 39-2209', 'House 18, Road 9, Gulshan/Banani/Badda', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 9, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 19-3309', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6500, 'bKash', 'paid'),
(1, 10, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 30-1110', 'Central & Old Dhaka Main Road, near junction 10', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 10, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 40-2210', 'House 20, Road 10, Central & Old Dhaka', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 10, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 20-3310', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 4500, 'bKash', 'paid'),
(1, 11, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 31-1111', 'Uttara Hub Main Road, near junction 11', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 2100, 'bKash', 'paid'),
(1, 11, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 41-2211', 'House 22, Road 11, Uttara Hub', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 11, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 21-3311', 'Workshop Bay #4 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5000, 'bKash', 'paid'),
(1, 12, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 32-1112', 'Mirpur Zone Main Road, near junction 12', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1200, 'bKash', 'paid'),
(1, 12, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 42-2212', 'House 24, Road 0, Mirpur Zone', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 12, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 22-3312', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5500, 'bKash', 'paid'),
(1, 13, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 33-1113', 'Dhanmondi/Mohammadpur Main Road, near junction 13', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1500, 'bKash', 'paid'),
(1, 13, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 43-2213', 'House 26, Road 1, Dhanmondi/Mohammadpur', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 13, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 23-3313', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6000, 'bKash', 'paid'),
(1, 14, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 34-1114', 'Gulshan/Banani/Badda Main Road, near junction 14', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 14, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 44-2214', 'House 28, Road 2, Gulshan/Banani/Badda', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 14, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 24-3314', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6500, 'bKash', 'paid'),
(1, 15, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 35-1115', 'Central & Old Dhaka Main Road, near junction 15', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 2100, 'bKash', 'paid'),
(1, 15, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 45-2215', 'House 30, Road 3, Central & Old Dhaka', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 15, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 25-3315', 'Workshop Bay #4 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 4500, 'bKash', 'paid'),
(1, 16, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 36-1116', 'Uttara Hub Main Road, near junction 16', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1200, 'bKash', 'paid'),
(1, 16, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 46-2216', 'House 32, Road 4, Uttara Hub', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 16, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 26-3316', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5000, 'bKash', 'paid'),
(1, 17, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 37-1117', 'Mirpur Zone Main Road, near junction 17', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1500, 'bKash', 'paid'),
(1, 17, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 47-2217', 'House 34, Road 5, Mirpur Zone', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 17, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 27-3317', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5500, 'bKash', 'paid'),
(1, 18, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 38-1118', 'Dhanmondi/Mohammadpur Main Road, near junction 18', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 18, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 48-2218', 'House 36, Road 6, Dhanmondi/Mohammadpur', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 18, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 28-3318', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6000, 'bKash', 'paid'),
(1, 19, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 39-1119', 'Gulshan/Banani/Badda Main Road, near junction 19', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 2100, 'bKash', 'paid'),
(1, 19, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 49-2219', 'House 38, Road 7, Gulshan/Banani/Badda', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 19, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 29-3319', 'Workshop Bay #4 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6500, 'bKash', 'paid'),
(1, 20, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 40-1120', 'Central & Old Dhaka Main Road, near junction 20', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1200, 'bKash', 'paid'),
(1, 20, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 50-2220', 'House 40, Road 8, Central & Old Dhaka', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 20, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 30-3320', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 4500, 'bKash', 'paid'),
(1, 21, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 41-1121', 'Uttara Hub Main Road, near junction 21', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1500, 'bKash', 'paid'),
(1, 21, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 51-2221', 'House 42, Road 9, Uttara Hub', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 21, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 31-3321', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5000, 'bKash', 'paid'),
(1, 22, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 42-1122', 'Mirpur Zone Main Road, near junction 22', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 22, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 52-2222', 'House 44, Road 10, Mirpur Zone', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 22, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 32-3322', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5500, 'bKash', 'paid'),
(1, 23, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 43-1123', 'Dhanmondi/Mohammadpur Main Road, near junction 23', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 2100, 'bKash', 'paid'),
(1, 23, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 53-2223', 'House 46, Road 11, Dhanmondi/Mohammadpur', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 23, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 33-3323', 'Workshop Bay #4 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6000, 'bKash', 'paid'),
(1, 24, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 44-1124', 'Gulshan/Banani/Badda Main Road, near junction 24', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1200, 'bKash', 'paid'),
(1, 24, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 54-2224', 'House 48, Road 0, Gulshan/Banani/Badda', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 24, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 34-3324', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6500, 'bKash', 'paid'),
(1, 25, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 45-1125', 'Central & Old Dhaka Main Road, near junction 25', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1500, 'bKash', 'paid'),
(1, 25, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 55-2225', 'House 50, Road 1, Central & Old Dhaka', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 25, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 35-3325', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 4500, 'bKash', 'paid'),
(1, 26, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 46-1126', 'Uttara Hub Main Road, near junction 26', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 26, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 56-2226', 'House 52, Road 2, Uttara Hub', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 26, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 36-3326', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5000, 'bKash', 'paid'),
(1, 27, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 47-1127', 'Mirpur Zone Main Road, near junction 27', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 2100, 'bKash', 'paid'),
(1, 27, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 57-2227', 'House 54, Road 3, Mirpur Zone', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 27, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 37-3327', 'Workshop Bay #4 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 5500, 'bKash', 'paid'),
(1, 28, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 48-1128', 'Dhanmondi/Mohammadpur Main Road, near junction 28', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1200, 'bKash', 'paid'),
(1, 28, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 58-2228', 'House 56, Road 4, Dhanmondi/Mohammadpur', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1750, 'Cash', 'unpaid'),
(1, 28, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 38-3328', 'Workshop Bay #1 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6000, 'bKash', 'paid'),
(1, 29, 'emergency_roadside', 'CRITICAL SOS', 'Honda Vezel Hybrid 2019', 'Dhaka Metro-Ga 49-1129', 'Gulshan/Banani/Badda Main Road, near junction 29', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1500, 'bKash', 'paid'),
(1, 29, 'emergency_home', 'URGENT HOME DISPATCH', 'Toyota Noah Hybrid 2018', 'Dhaka Metro-Gha 59-2229', 'House 58, Road 5, Gulshan/Banani/Badda', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 2000, 'Cash', 'unpaid'),
(1, 29, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 39-3329', 'Workshop Bay #2 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 6500, 'bKash', 'paid'),
(1, 30, 'emergency_roadside', 'CRITICAL SOS', 'Toyota Allion 2021', 'Dhaka Metro-Ga 50-1130', 'Central & Old Dhaka Main Road, near junction 30', CURRENT_DATE(), '14:30:00', 'Car stalled on main boulevard with family inside. Needs rapid mechanic response.', 'pending', 1800, 'bKash', 'paid'),
(1, 30, 'emergency_home', 'URGENT HOME DISPATCH', 'Nissan X-Trail 2020', 'Dhaka Metro-Gha 60-2230', 'House 60, Road 6, Central & Old Dhaka', CURRENT_DATE(), '14:30:00', 'Car completely dead in building basement parking. Need mobile battery jump and charging system test.', 'pending', 1500, 'Cash', 'unpaid'),
(1, 30, 'workshop_bay', 'Standard Bay', 'Toyota Land Cruiser Prado TX-L', 'Dhaka Metro-Cha 40-3330', 'Workshop Bay #3 (On-Site)', CURRENT_DATE(), '14:30:00', 'Full multi-point checkup, transmission oil change, and brake pad replacement.', 'confirmed', 4500, 'bKash', 'paid');

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
