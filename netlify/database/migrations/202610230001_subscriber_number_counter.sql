CREATE TABLE IF NOT EXISTS subscriber_number_counter (
  id SMALLINT PRIMARY KEY CHECK (id = 1),
  last_number BIGINT NOT NULL CHECK (last_number >= 23567)
);

INSERT INTO subscriber_number_counter (id, last_number)
VALUES (1, 23567)
ON CONFLICT (id) DO NOTHING;
