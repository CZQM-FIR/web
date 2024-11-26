CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `flags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL,
	`date` integer NOT NULL,
	`author` integer,
	FOREIGN KEY (`author`) REFERENCES `users`(`cid`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `positions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`callsign` text NOT NULL,
	`frequency` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `positions_callsign_unique` ON `positions` (`callsign`);--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` integer PRIMARY KEY NOT NULL,
	`long` text NOT NULL,
	`short` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`positionId` integer NOT NULL,
	`duration` integer NOT NULL,
	`logonTime` integer DEFAULT '"1970-01-01T00:00:00.000Z"' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`cid`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`positionId`) REFERENCES `positions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`cid` integer PRIMARY KEY NOT NULL,
	`name_first` text NOT NULL,
	`name_last` text NOT NULL,
	`name_full` text NOT NULL,
	`email` text NOT NULL,
	`rating` integer NOT NULL,
	`division` text,
	`region` text,
	`subdivision` text,
	`bio` text,
	FOREIGN KEY (`rating`) REFERENCES `ratings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `user_flags` (
	`flag_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `flag_id`),
	FOREIGN KEY (`flag_id`) REFERENCES `flags`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`cid`) ON UPDATE no action ON DELETE cascade
);
