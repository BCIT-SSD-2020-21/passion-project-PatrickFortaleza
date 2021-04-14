# autopep8: off
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
scripts = os.path.join(ROOT, 'scripts')
sys.path.insert(0, scripts)

# From scripts, import each web scraping script.
import cbs
import cnn
import foxnews
import nbc
import nypost
# autopep8: on


class Scrapeth():
    def __init__(self):
        self.__articles = []

        def scrape():
            articles_ = []

            articles__cnn = cnn.scrape_cnn()
            # articles__foxnews = foxnews.scrape_foxnews()
            articles__cbs = cbs.scrape_cbs()
            # articles__nbc = nbc.scrape_nbc()
            # articles__nypost = nypost.scrape_nypost()

            articles_ = articles__cbs + articles__cnn

            self.__articles = articles_

        scrape()

# ----------------------------------------
# Getter setter for attributes
# ----------------------------------------
    @property
    def articles(self):
        return self.__articles
