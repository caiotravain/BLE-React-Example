# BLE-React-Example - USING BLUETOOTH WITH REACT NATIVE AND EXPO

<h3> Use inside the BLESampleExpo-main/BLESampleExpo-main/ with "npx expo run:android" or "npm run android" (first time is slow, but them it stores on cache)</h3>
<p>use yarn install before to install all packages</p>
<p>*add your sdk (minimun: 21)* location into the "/android/local.properties" file </p>
<p>* if you dont have the SDK it can be downloaded via android studio</p>
<br/>
or
<br/>

<h3>
 Use "eas build -p android" to build an using eas (less bugs an problems but slower to init)(safer option and dont require sdk, but require internet connection and a eas account)
  </h3>
  <h3>
 Use "eas build -p android --profile preview" to build an apk using eas (less bugs an problems but slower)
  </h3>
<br/>
<p>please install eas before using. More info at https://docs.expo.dev/build-reference/apk/ and use expo app to update live your app at your phone</p>





<br/>
<br/>
<h1>WARNING CLONE THIS REPOSITORY ON SHORT PATH, OTHERWISE MAY NOT BUILD!</h1> 


<h3> Utilization </h3>
<p>Connect your android device and run the program, after building press "A" and wait for the blundle be compleated. 
You can edit the name of the devices in the file "useBLE.ts" to only appear your bluetooth adpater (ONLY WORKS ON HC-10 ADAPTER).
Please be note since its a project built on top of another project the variables may be noted as heartbeat but they are from the HC-10 adapter, such UUID and other caracteristics.</p>



<p>Any questions fill free to open an issue or send an email, thx</p>

references: BLESampleExpo Pulse indicator (https://github.com/friyiajr/BLESampleExpo) (https://www.youtube.com/watch?v=UuHLPsjp6fM&t=280s)

