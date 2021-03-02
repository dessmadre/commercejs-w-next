# Candle-Store

## Purpose

I wanted to build a E-commerce app using a headless CMS, I chose to use Commerce.js to store product and order information. This app is built using Next.js and uses it data fetching features to recieve data from Commerce.js. I styled this website using Tailwind CSS and Framer Motion. Tailwind for the styling of the components and Framer Motion to animate the buttons and the cart.

## Challenges

Learning the Commerce.js interface was important I had an issue where I wasn't receiving shipping options during checkout. It turned out that I forgot to click on a setting which allowed that information to display. In order to to persist the data from Commer.js I implement state-managment with React's Context Api which allowed to me cache the data. I had difficulty with the implentation of it, but got it to work in the end.
