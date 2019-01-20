-- task

SET search_path = task, pg_catalog;

INSERT INTO task
VALUES
  (203388799060001, false, 'task_01', 'test task 01', 1516008270001, 1516008270011, 1516008270021);
INSERT INTO task
VALUES
  (203388799060002, true, 'task_02', 'test task 02', 1516008270002, 1516008270012, 1516008270022);
INSERT INTO task
VALUES
  (203388799060003, false, 'task_03', 'test task 03', 1516008270003, 1516008270013, 1516008270023);
INSERT INTO task
VALUES
  (203388799060004, true, 'task_04', 'test task 04', 1516008270004, 1516008270014, 1516008270024);
INSERT INTO task
VALUES
  (203388799060005, false, 'task_05', 'test task 05', 1516008270005, 1516008270015, 1516008270025);
INSERT INTO task
VALUES
  (203388799060006, true, 'task_06', 'test task 06', 1516008270006, 1516008270016, 1516008270026);

SELECT pg_catalog.setval('task_id_seq', 7, true)
