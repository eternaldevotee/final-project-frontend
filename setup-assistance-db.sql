-- Assistance Requests Database Setup Script
-- Run this in MySQL Workbench or MySQL Command Line

-- 1. Create the assistance_requests table
CREATE TABLE IF NOT EXISTS assistance_requests (
    request_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    issue_description TEXT NOT NULL,
    request_status VARCHAR(50) DEFAULT 'OPEN',
    reply TEXT,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolution_time TIMESTAMP NULL
);

-- 2. Insert sample test data
INSERT INTO assistance_requests (user_id, issue_description, request_status, reply, creation_time)
VALUES
    ('user-001', 'I cannot access my booking details. Please help!', 'OPEN', NULL, NOW()),
    ('user-002', 'Payment was deducted but booking not confirmed', 'OPEN', NULL, NOW()),
    ('user-003', 'Need to cancel my package booking urgently', 'CLOSED', 'Your booking has been cancelled successfully.', NOW() - INTERVAL 1 DAY),
    ('user-004', 'Website showing error when trying to book', 'OPEN', NULL, NOW()),
    ('user-005', 'Refund not received after cancellation', 'CLOSED', 'Refund processed. Check your account in 3-5 days.', NOW() - INTERVAL 2 DAY);

-- 3. Verify the data was inserted
SELECT * FROM assistance_requests;

-- 4. Check the structure
DESCRIBE assistance_requests;

-- 5. Count total requests
SELECT
    request_status,
    COUNT(*) as count
FROM assistance_requests
GROUP BY request_status;

