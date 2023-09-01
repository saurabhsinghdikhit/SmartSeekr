Create database smartSeekr;

USE [smartSeekr];

CREATE TABLE [dbo].[userTypes](
	[ID] [uniqueidentifier] NOT NULL primary key,
	[name] [nvarchar](50) NOT NULL,
);

CREATE TABLE [dbo].[users](
	[ID] [uniqueidentifier] NOT NULL primary key,
	[email] [nvarchar](100) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
	[userTypeId] [uniqueidentifier] references userTypes(ID)
);
CREATE TABLE [dbo].[employer](
	[ID] [uniqueidentifier] NOT NULL primary key,
	[companyName] [nvarchar](100) NOT NULL,
	[companyEmail] [nvarchar](100) NOT NULL,
	[companyNumber] [nvarchar](16) NOT NULL,
	[companyAddress] [nvarchar](350) NULL,
	[companyIndustry] [nvarchar](100) NULL,
	[companyDescription] [text] NULL,
	[companyLogo] [nvarchar](255) NULL,
	[city] [nvarchar](100) NULL,
	[province] [nvarchar](100) NULL,
	[country] [nvarchar](100) NULL,
	[pincode] [nvarchar](10) NULL,
	[isDeleted] bit NOT NULL,
	[userId] [uniqueidentifier] NOT NULL references Users(Id)
	);
CREATE TABLE [dbo].[employee](
	[ID] [uniqueidentifier] NOT NULL primary key,
	[firstName] [nvarchar](100) NOT NULL,
	[lastName] [nvarchar](100) NULL,
	[contact_number] [nvarchar](18) NULL,
	[dateOfBirth] [date] NULL,
	[address] [nvarchar](350) NULL,
	[city] [nvarchar](100) NULL,
	[province] [nvarchar](100) NULL,
	[country] [nvarchar](100) NULL,
	[pincode] [nvarchar](50) NULL,
	[isDeleted] bit NOT NULL,
	userImage [nvarchar](100),
	[userId] [uniqueidentifier] references users(Id)
	);