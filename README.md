# CarCollectorApp
This application is my attempt of making a full stack deep learning application.

## Why I did this project
While I have some Machine learning experience from Kaggle competitions, this does not teach you some of the crucial skills that are needed in real deep learning applications such as inference, collecting data, cleaning data and many more important skills.

I chose a mobile application as this would allow me to test my application in the real world, which was very motivating and fun. It also helps to develop an intuition about what features
neural networks actually learn, since you can take multiple pictures of the same object from different angles and see how it affects the prediction accuracy. 

## What I learned during the project
First time I trained the model and got very nice validation accuracy and was excited about going to try my app in the real world. To my dissapointment it did not work at all and I started to wonder why. I tried tuning bunch things in the deep learning side but then realized that I had
not once checked how the image looks like before the model does inference on it.

After a building a debug page that would display the images sent to the server the issue was glaring. My camera had a resolution of 3024x4032 and then this image would get resized to 224x224 for the neural network model. When I took photos of the cars they were maybe 1/4 of the camera window and then when they got resized to 224x224 the actual car was unidentifiable mess, therefore the model would make quite random predictions as there were no features corresponding to the learned ones. Lesson learned was: always check the input during inference. 

This was also the first time I have built and react native mobile application. I chose react-native as had some experience with react before and I did not want to learn Android programming as this projects' main scope was learning about deep learning not mobile development. I found react-native quite easy to learn, granted my application is probably quite terrible compared to ones built by people actually know what they are doing. I am still very satisfied with the app as it serves my purpose of learning about deep learning perfectly. 

## Tech stack
- [Backend](https://github.com/JoonasMaanonen/car_collector_backend)

