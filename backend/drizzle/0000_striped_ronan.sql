CREATE TABLE "tasks" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"task" varchar(10) NOT NULL,
	"check" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "tasks_task_unique" UNIQUE("task")
);
