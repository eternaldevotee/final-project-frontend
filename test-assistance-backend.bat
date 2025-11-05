@echo off
echo ================================================
echo Testing Assistance Request Backend Endpoints
echo ================================================
echo.

echo [1] Testing GET all requests...
echo URL: http://localhost:9090/admin/assistancerequests/all
echo.
curl -X GET http://localhost:9090/admin/assistancerequests/all
echo.
echo.

echo [2] Testing POST reply (Request ID: 1)...
echo URL: http://localhost:9090/admin/assistancerequests/1/Test%%20Reply
echo.
curl -X POST http://localhost:9090/admin/assistancerequests/1/Test%%20Reply
echo.
echo.

echo [3] Testing POST close request (Request ID: 1)...
echo URL: http://localhost:9090/admin/assistancerequests/close/1
echo.
curl -X POST http://localhost:9090/admin/assistancerequests/close/1
echo.
echo.

echo ================================================
echo Test Complete!
echo.
echo If you see errors:
echo - Make sure Spring Boot is running on port 9090
echo - Check MySQL database has assistance_requests table
echo - Check backend console for errors
echo ================================================
pause

