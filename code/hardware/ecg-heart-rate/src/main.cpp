#include <Arduino.h>

#define EKG A0 //we are reading from AnalogIn 0

int threshold = 610; //threshold for heartbeat detection, you can play with this value
int finalReading; // the AnalogIn reading
int grabit = 0;
int buffersize = 30;
int reading1[30]; //we have two buffers of 30 elements, this go back and forth to the serial port - needed to proper timing
int reading2[30];
int handoff = 1;
int dump = 0;
//This sets up serial communication values can 9600, 14400, 19200, 28800, 31250, 38400, 57600, and 115200, also 300, 600, 1200, 2400, 4800, but that's too slow for us
// int bitrate = 9600; //IMPORTANT!!! 28800 is the minimum speed needed to record at 500 Hz / 14400 is the minimum to record at 250 Hz, 9600 is the minimum for

/// Interrupt number - very important in combination with bit rate to get accurate data
int interrupt_Number=1999; // = (16*10^6) / (1000*8) - 1 // IMPORTANT!!!!! set to 1999 for 1000 Hz sampling, set to 3999 for 500 Hz sampling, set to 7999 for 250Hz sampling, 15999 for 125 Hz Sampling



void setup(){ 
  Serial.begin(115200); 
  
  pinMode(12,OUTPUT); // Turns on Red LED 
  pinMode(6, OUTPUT); // Connect Speaker to Digital Out 6 and Ground to get beep

  // TIMER SETUP- the timer interrupt allows preceise timed measurements of the reed switch
  //for mor info about configuration of arduino timers see http://arduino.cc/playground/Code/Timer1
  cli();//stop interrupts

  //set timer1 interrupt at 1kHz
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0;
  
  // set timer count for 500 Hz increments
  OCR1A = interrupt_Number;// = (16*10^6) / (1000*8) - 1 // IMPORTANT!!!!! set to 1999 for 1000 Hz sampling, set to 3999 for 500 Hz sampling, set to 7999 for 250Hz sampling
  
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  
  // Set CS11 bit for 8 prescaler
  TCCR1B |= (1 << CS11);   
  
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);
  
  sei();//allow interrupts
  //END TIMER SETUP
}


ISR(TIMER1_COMPA_vect) {
   finalReading = analogRead(EKG);  //Interrupt at the timing frequency you set above to measure to measure AnalogIn, and filling the buffers
   if (handoff == 1){  
    reading1[grabit] = finalReading;
    grabit = grabit + 1;
    if (grabit==buffersize){
     grabit =0;
     handoff = 2;
     dump = 1;
    }
   }
    if (handoff ==2) {
    reading2[grabit] = finalReading;
    grabit = grabit + 1;
    if (grabit==buffersize){
     grabit = 0;
     handoff = 1;
     dump = 2;
    }     
    } 
  }
   

void loop(){
    //finalReading = analogRead(EKG);
    // Serial.println(finalReading);
    if(dump!=0){ // dumping the buffers to the serial ports
      if(dump == 1){
          for(int i = 0; i < buffersize; i++){   
          //Serial.print("reading1 = ");
          Serial.println(reading1[i]);
          }
          dump = 0;
      }
      if(dump == 2){ 
          for(int i = 0; i < buffersize; i++){    
      //    Serial.print("reading2 = ");
          Serial.println(reading2[i]);
          
          }
          dump = 0;
      }
    }

    // if(finalReading > threshold){ // Threshold to detect heartbeats
    //     tone(6,1000,50); // Beep the Speaker
    //     digitalWrite(12, HIGH);   // sets the LED on 
    //     }
    //  else{
    //    digitalWrite(12, LOW); 
    //  }
}
