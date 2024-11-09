# BINyc

BINyc is a community-driven platform created to empower New Yorkers to report trash hotspots and collectively address waste management challenges in the city.

## Table of Contents

1. [Inspiration](#inspiration)
2. [What It Does](#what-it-does)
3. [How We Built It](#how-we-built-it)
4. [Challenges We Ran Into](#challenges-we-ran-into)
5. [Accomplishments](#accomplishments)
6. [What We Learned](#what-we-learned)
7. [What's Next for BINyc](#whats-next-for-binnyc)
8. [Installation](#installation)

## Inspiration

Being frequent commuters in New York City, we became frustrated with constantly seeing piles of litter in our neighborhoods and city streets. NYC generates over 14 million tons of waste annually, and despite efforts by the NYC Department of Sanitation, the city continues to struggle with effective trash management. Inspired by our desire to make our city cleaner, we created BINyc, a platform designed to empower our community to report any sighted trash so that we, as a community, can work together to solve this persistent problem.

## What It Does

BINyc is a community-driven platform that allows New Yorkers to easily report trash hotspots they encounter on their daily commutes. Users can:

- **Report Trash**: Mark sightings of litter or illegal dumping spots directly on an interactive map.
- **Add Details**: Provide specifics such as the type of waste, location, and even upload photos for better context.
- **Resolve Reports**: Take action to clean up listed reports and earn incentives through a bounty system, where users or organizations can offer rewards for cleaning up specific problem areas.

## How We Built It

We built the app using Vite and React for the frontend and used Leaflet for the interactive map feature. The backend was developed using Express.js, with a MongoDB database to store user reports. We then integrated our backend API with the frontend to ensure the map updates in real time with the latest reports.

## Challenges We Ran Into

We faced several challenges, particularly with implementing the image upload feature. MongoDB was a new technology for some team members, making the integration process especially difficult. Overcoming these obstacles required significant research and teamwork.

## Accomplishments

We're proud to have successfully created an interactive, real-time map that reflects user-submitted reports, all within a limited time frame. Additionally, our ability to collaborate effectively and execute our ideas efficiently, despite being a newly formed team, is something we take great pride in.

## What We Learned

Throughout this project, we learned how to work with geospatial data and create interactive maps. We also became more familiar with using MongoDB. For some team members, this was their first hackathon, providing valuable lessons in web app development and teamwork.

## What's Next for BINyc

- **Mobile App**: We plan to develop a mobile version of BINyc to make it even more accessible for on-the-go users.
- **User Authentication**: Implementing user authentication will allow us to rank and recognize top contributors.
- **Integration with NYC Sanitation**: In the future, we aim to partner with the NYC Department of Sanitation to automate the filing of reports, ensuring that trash hotspots are addressed efficiently.

## Installation

To set up BINyc locally:

1. **Clone the repository**:
   ```bash
   git clone
   ```
2. **Install dependencies and run frontend**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Install dependencies and run backend**:
   ```bash
   cd ..
   cd server
   npm install
   node server.js
   ```
4. **Set up env variables**:
   ```bash
    Create .env in the server folder
    MONGODB_URI=
    API_Key=
    API_Secret=
   ```
