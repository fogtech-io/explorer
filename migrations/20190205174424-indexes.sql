
-- +migrate Up


CREATE INDEX idx_logs_blocknumber
  ON  logs ("blockNumber");

CREATE INDEX idx_logs_secondtopic
  ON  logs ("secondTopic");

CREATE INDEX idx_logs_thirdtopic
  ON  logs ("thirdTopic");


-- +migrate Down


DROP INDEX idx_block_hash;
DROP INDEX idx_block_hash;
DROP INDEX idx_block_hash;
