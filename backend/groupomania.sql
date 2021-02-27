-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 27, 2021 at 11:52 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) UNSIGNED NOT NULL,
  `content` varchar(250) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentId`, `content`, `postId`, `userId`, `date`) VALUES
(6, 'Yes all good here ! Such a great day ! ', 6, 8, 1614426727683);

-- --------------------------------------------------------

--
-- Table structure for table `gp_posts`
--

CREATE TABLE `gp_posts` (
  `postId` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gp_posts`
--

INSERT INTO `gp_posts` (`postId`, `content`, `userId`, `date`) VALUES
(6, 'Hello everybody, all good ?', 6, 1614424183235);

-- --------------------------------------------------------

--
-- Table structure for table `gp_users`
--

CREATE TABLE `gp_users` (
  `userId` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `department` varchar(60) NOT NULL,
  `admin` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gp_users`
--

INSERT INTO `gp_users` (`userId`, `email`, `password`, `lastname`, `firstname`, `department`, `admin`) VALUES
(6, 'johndoe@groupomania.fr', '$2b$10$TB5ibuFXuMrqvNSeEZQGyOtwi.xxFGllb0bZ.Xj6VnHsj4gF5JyQa', 'Doe', 'John', 'RH', 0),
(7, 'marionrenard@groupomania.fr', '$2b$10$vHu3lN6gDmUw/HRcxn4BSuqa6j6rZulHA7iqQWd95N2yUaxuCVEC.', 'Renard', 'Marion', 'Lead dev', 0),
(8, 'jeanettedoette@groupomania.fr', '$2b$10$teEfa7Z.spt3mZ7HMbO/De97iBFILAYVvjWiE0R6d0WX12A0/lm3.', 'Doette', 'Jeanette', 'CEO', 1),
(9, 'herverenard@groupomania.fr', '$2b$10$NZwcnmBxnV2u90o82pdQG.ctCSeFKz5quFXzwhuMP3WUMm6DsZDea', 'Renard', 'Herve', 'Technicien', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`);

--
-- Indexes for table `gp_posts`
--
ALTER TABLE `gp_posts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `gp_users`
--
ALTER TABLE `gp_users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gp_posts`
--
ALTER TABLE `gp_posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gp_users`
--
ALTER TABLE `gp_users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
