CREATE TABLE `resources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text NOT NULL,
	`category` text NOT NULL,
	`public` integer DEFAULT 1 NOT NULL,
	`type` text NOT NULL
);
