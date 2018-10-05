# PixaShare

## What is PixaShare?

PixaShare is an app that allows users to crearte albums of uploaded photos and comment on them.

##Technologies Used

PixaShare is a full crud **Express** app. Using **Mongo** as the database and **handlebars** to handle the views. PixaShare also uses **multer** to upload photos directly from the clients device and **passport** for authentication.

##Installation

To use this application, there are several dependencies that are included in the json package that are needed in order for this application to functin properly. All you would have to do is "npm init" to install its dependencies once cloned, create an account and start uploading and creating an album.

##Diffiuclties

Originally I wanted to make an application where users could access eachothers profile to comment on photos. As of now, that is not possible. Only the user that is signed in can access the album. Commenting is possible, but they do not show which user commented. These issues will require some extended work, but for now **PixaShare** is a full crud app that lets you render an album with images on your device.
