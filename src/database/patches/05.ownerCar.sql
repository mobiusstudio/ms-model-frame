--------------------------------
-- owner_car schema and tables
--------------------------------

CREATE SCHEMA "owner_car";

CREATE SEQUENCE "owner_car".owner_car_id_seq;

CREATE OR REPLACE FUNCTION "owner_car".owner_car_id
(OUT result bigint) AS $$
DECLARE
  our_epoch bigint := 1466352806721;
  seq_id bigint;
  now_millis bigint;
  shard_id int := 0;
BEGIN
  SELECT nextval('"owner_car".owner_car_id_seq') % 128
  INTO seq_id;
  SELECT FLOOR(EXTRACT(EPOCH FROM current_timestamp) * 1000)
  INTO now_millis;
  result :=
  (now_millis - our_epoch) << 12; 
result := result |
(shard_id << 7);
  result := result |
(seq_id);
END;
$$ LANGUAGE PLPGSQL;

--------------------------------
-- owner_car notes:
--------------------------------

CREATE TABLE "owner_car".owner_car
(
  id BIGINT NOT NULL DEFAULT "owner_car".owner_car_id(),
  owner_id BIGINT REFERENCES "user".user (id),
  car_id BIGINT REFERENCES "car".car,
  create_time bigint DEFAULT unix_now(),
  last_update_time bigint DEFAULT unix_now(),
  PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
