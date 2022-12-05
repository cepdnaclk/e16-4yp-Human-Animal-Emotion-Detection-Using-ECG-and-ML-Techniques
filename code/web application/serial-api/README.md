## Serial communication API 

### End points

- Start ecg measurements:  POST http://127.0.0.1:5000/start </br>
form data : subjectId, emotion

- Stop ecg measurements: POST http://127.0.0.1:5000/stop

### Data Files

- Change the SAVE_DIR with the desired location 
- Default location /DATA_FILES/
- Data will save under subject wise folders

### Configs

- Change COM port and BAUD_RATE accordingly