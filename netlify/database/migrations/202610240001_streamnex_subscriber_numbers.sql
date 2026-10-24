-- StreamNex subscriber numbers start at 2000000.
-- Preserve higher values if numbers have already been issued.
UPDATE subscriber_number_counter
SET last_number = GREATEST(last_number, 1999999)
WHERE id = 1;
