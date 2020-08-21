const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            // headless: false
        });
        const page = await browser.newPage();
        const timeout = 60000
        page.setDefaultNavigationTimeout(timeout)
        page.setDefaultTimeout(timeout)

        if(await page.goto('https://cincinnati.craigslist.org/d/free-stuff/search/zip', { 
            // timeout: 120000
            waitUntil: 'networkidle2'
          })){
            console.log('page.goto worked')
        }

        if(await page.waitForSelector('.result-info', { 
            visible: true
        })){
            console.log("page.waitForSelector worked")
        }

        const results = await page.evaluate(() => {
            console.log("inside results variable")
            const allResults = Array.from(document.querySelectorAll('.result-row')); 
            console.log(allResults)
            return allResults.map(data => {
                if (data.querySelector(".result-title.hdrlnk")){ 
                    
                    return{
                        name: data.querySelector(".result-title.hdrlnk").textContent, 
                        url: data.querySelector(".result-title.hdrlnk").href, 
                        date: data.querySelector(".result-date").textContent
                    }
                } else
                console.log(".result-title hdrlnk wasn't there")
            })
            .slice(0, 5);
        })

        // console.log('results: ' + results)
        // results.map(item => console.log("name: " + item.name))

        // return results
        return "Craigslist test return"

        await browser.close();
    }catch (error) {
        console.log(error)
    }
})();