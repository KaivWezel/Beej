# Beej

A webapp that clubs can use to let their customers request music without being overloaded. Beej let's you create slots where your customers can bid to play their favourite song. To create some interaction between the club and the customer, live-bidding is enabled and customers can request any song they like without having to talk to the DJ, which is hard during a party.

## Live demo

You can find a live demo [here](https://beej-rtw.herokuapp.com/)

## To install

Clone this repository using `git clone` and run `npm install` in this directory. Then run `npm run dev` to start the development server and start hacking away.

## Features

- Club registration/login
- Club dashboard for administration and management
- Simple customer interface
- Live bidding and updates

## Data structure

For this app, MongoDB is the database of choice. Using Mongoose (v6.3.1), I created 2 simple models to regulate data streams.

### Slot

The slots are small models where I keep track of the highest bid, songrequest and with which club the slot is associated. Slots are continously updated when new bids are received and old bids are not saved.

_Slot model_
![Model in mongoose of slot](img/Slot.png)

### User

The user model is only needed for the clubs that register on this app. Without club, there are no auctions. So when the club is registered

_User model_

<img src="img/User.png" alt="Model in mongoose of user" width="400px">
