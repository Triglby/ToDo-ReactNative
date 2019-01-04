# To Do Project

## React Native Front End
For docs on how to create a react-native application follow this 
[link](https://facebook.github.io/react-native/docs/getting-started.html)


### Install and Run Android Mobile Emulator
First get a mobile virtual machine running. To do this download Android 
Studio.

Open it up and on the home screen go to 'Configure' and select SDK 
Manager

Under System Settings select Android SDK.

In SDK Platforms select Android 8.1 (Oreo) and install it.

After this has installed (it might take a while) go back to the main 
Android Studio page and select 'Start a new Android Studio project' 
(create any, it really doesn't matter)

In the top right you will see a small purple phone called AVD Manager 
(Android Virtual Device Manager)

In this window click 'Create Virtual Machine...'

Then select a device to emulate.

Then download a system image (Oreo 8.1 is recommended). After download 
select this system image.

After the virtual machine has been created. Launch the emulator with the 
green triangle. After this you can close down Android Studio (keep the 
emulator running


### Running the application
For react-native command line interface follow the following piece of 
code.

`git clone https://github.com/christophperrins/ToDo-ReactNative.git`

`cd ToDo-ReactNative/`

`npm install -g react-native-cli`

`react-native run-android`


