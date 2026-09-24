const jwt = require('jsonwebtoken');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZDoiNjlhNWE3Y2Y1ODc1ZjNhYjYyNGNjNmVhIiwiaWF0IjoxNzcyNDY0NDM2LCJleHAiOjE3NzI1NTA4MzZ9.xzDC0CVKL6uP8uUdE82D7pxE5pIRu1AatfGjQ1fDFsw";
try {
  const decoded = jwt.verify(token, 'something_strong_here');
  console.log('decoded', decoded);
} catch (err) {
  console.error('verify error', err.message);
}
