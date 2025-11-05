@echo off
echo ===============================================
echo Assistance Request Backend Diagnostics
echo ===============================================
echo.

echo [TEST 1] Checking if backend is running...
echo.
curl -X GET http://localhost:9090/admin/assistancerequests/all
echo.
echo.

echo [TEST 2] Testing close endpoint with request ID 1...
echo.
curl -X POST http://localhost:9090/admin/assistancerequests/close/1 -v
echo.
echo.

echo [TEST 3] Testing reply endpoint...
echo.
curl -X POST "http://localhost:9090/admin/assistancerequests/1/Test%%20Reply" -v
echo.
echo.

echo ===============================================
echo Tests Complete!
echo.
echo What to check:
echo 1. If TEST 1 fails: Backend is not running
echo 2. If TEST 1 works but TEST 2 fails: Close endpoint issue
echo 3. Check your Spring Boot console for error details
echo 4. Look for the exact error message in the logs
echo ===============================================
pause

