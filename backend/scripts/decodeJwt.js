const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTVhN2NmNTg3NWYzYWI2MjRjYzZlYSIsImlhdCI6MTc3MjQ2NDY0MiwiZXhwIjoxNzcyNTUxMDQyfQ.0zpa4HJrYJs_F24TNq6zmTjWbZywMVLZ-OrHKNUGe2A';
console.log('decoded', jwt.verify(token,'something_strong_here'));
