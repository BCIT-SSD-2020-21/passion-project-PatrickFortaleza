# PyNews

**Description:**
A news aggregation application that "scrapes" the front-page of selected news websites for top headlines, and articles, and compiles them into a database.

The user may enter any given date of the year, and "compare" headlines and articles from that date.

<a href="https://pynews.netlify.app/">https://pynews.netlify.app/</a>

## Requirements

**Functional Requirements**

- The application will compile data from listed news websites daily.
- The user will be able to select any date (as long as it's in the database), and see results that show headlines, and articles from that date.

**Non-Functional Requirements**

- The system will need to programmatically visit each news site, and "scrape" their top 3 news articles.
- An automated scraping script will need to be run at 6:00pm on a daily interval.
- The automated scraping script needs to be robust enough to also write to a noSQL database.
- The automated scraping script should also be able to take "screenshots" of the front-page and store a URI for that image.
- The system will also need to feature a read-only API that allows a client to see the news data.

## Features

**Core Application Features**

- Application aggregates text-based news site data on the daily.
- Users are able to request news site data for any given day.

**Nice To Have Features**

- The system also takes screenshots of the news site to be featured in the UI.

## Application Stack

- **Client:** React
- **Database:** MongoDb
- **Server:** Python + Flask
- **Scheduled Web Scraper:** Python + BS4

**Deployment**

- Client: Netlify
- Database: MongoDb cloud
- Server (API): Heroku
- Server (Scheduled Web Scraper): Ubuntu 18.04 VPS

## Demo

### Desktop + Mobile

<img width="70%" src="./planning/demo/pyNews__desktop.gif"><img width="29%" src="./planning/demo/pyNews__mobile.gif">
