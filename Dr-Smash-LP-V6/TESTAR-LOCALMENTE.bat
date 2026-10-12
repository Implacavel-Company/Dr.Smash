@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 goto use_py
where python >nul 2>&1
if %errorlevel%==0 goto use_python
echo Python nao foi encontrado. Use ABRIR-LP.bat ou instale Python.
pause
exit /b 1

:use_py
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000"
py -m http.server 8000
goto done

:use_python
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000"
python -m http.server 8000

:done
pause
