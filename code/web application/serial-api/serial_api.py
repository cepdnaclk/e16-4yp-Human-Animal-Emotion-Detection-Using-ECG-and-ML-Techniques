from flask import Flask, request
import serial
import continuous_threading
import os
import datetime

COM_PORT = "COM3"
BAUD_RATE = 9600

SAVE_DIR = "DATA_FILES/"

subject_id = ""
emotion = ""
start_time = ""
data_points = []

start = False
save_file = False

# making final dataset directory 
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

app = Flask(__name__)

serialPort = serial.Serial(port=COM_PORT, baudrate=BAUD_RATE, bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE)
print(serialPort)
serial_string = ""  # To hold data coming over UART

@app.route("/")
def home():
    return "ECG Serial Communication server!"


@app.route("/start", methods=['POST', 'GET'])
def start_serial():
    global start
    global save_file
    global subject_id
    global emotion
    global start_time

    if request.method == 'GET':
        return "serial start end-point - Use POST to start reading"

    if request.method == 'POST':
        start = True
        save_file = False
        subject_id = request.form['subjectId']
        emotion = request.form['emotion']
        start_time = str(datetime.datetime.now()).split('.')[0].replace(":", "_")
        
        print("Subject_" + subject_id + " started")
        
        return ("Subject-" + subject_id + " started")


@app.route("/stop", methods=['POST', 'GET'])
def stop_serial():
    global start
    global save_file

    if request.method == 'GET':
        return "serial stop end-point"

    if request.method == 'POST':

        start = False
        save_file = True

        return "stopped"


def serial_communication():
    global start
    global save_file
    global data_points
    global serial_string
    global subject_id
    global emotion
    global SAVE_DIR
    

    while(True):
        # print("Thread running")
        if (start):
            # print("serail reading ...")
            
            # Wait until there is data waiting in the serial buffer
            if(serialPort.in_waiting > 0):

                # Read data out of the buffer until a new line is found
                serial_string = serialPort.readline()
                
                # print(serialString.decode('Ascii'))
                data_points.append(serial_string.decode('Ascii').rstrip('\r\n'))        
                

        if((not start) and save_file):
            print("writing to the file .....")
            save_file = False
            # print(subject_id)
            
            # make directory for subject id, emotion inside the SAVE_DIR
            if not os.path.exists(os.path.join(SAVE_DIR,"S-"+subject_id)):
                os.makedirs(os.path.join(SAVE_DIR,"S-"+subject_id))

            if not os.path.exists(os.path.join(SAVE_DIR,"S-"+subject_id, emotion)):
                os.makedirs(os.path.join(SAVE_DIR,"S-"+subject_id, emotion))

            file_name = "S-"+subject_id+"_"+emotion+"_"+ start_time +".txt"
            with open((os.path.join(SAVE_DIR,"S-"+subject_id, emotion, file_name)), 'w') as f:
                for line in data_points:
                    f.write(f"{line}\n")
            
            data_points = []
            serial_string = ""
            print("file saved")

            
continuous_threading.set_allow_shutdown(True)
continuous_threading.set_shutdown_timeout(0)

serial_com = continuous_threading.Thread(target=serial_communication)
serial_com.start()
