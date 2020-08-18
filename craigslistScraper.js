const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false
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
        // await page.type('#twotabsearchtextbox', 'iphone x 64gb'); // CHANGE
        // await page.click('input.nav-input'); // CHANGE
        // console.log("after page.click")
        

        if(await page.waitForSelector('.result-info', { 
            visible: true
        })){
            console.log("page.waitForSelector worked")
        }

        const results = await page.evaluate(() => {
            console.log("inside results variable")
            const allResults = Array.from(document.querySelectorAll('.result-row')); // CHANGE
            console.log(allResults)
            return allResults.map(data => {
                if (data.querySelector(".result-title.hdrlnk")){ // CHANGE
                    
                    return{
                        name: data.querySelector(".result-title.hdrlnk").textContent, // CHANGE
                        url: data.querySelector(".result-title.hdrlnk").href, // CHANGE
                        date: data.querySelector(".result-date").textContent
                        // image: data.querySelector(".s-image").src, // CHANGE
                        // price: parseFloat(data.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))), // CHANGE
                    }
                } else
                console.log(".result-title hdrlnk wasn't there")
            })
            .slice(0, 5);
        })

        console.log('results: ' + results)
        results.map(item => console.log("name: " + item.name))

        // console.log(results.sort((a, b) => {
        //     return a.price - b.price;
        // }));

        await browser.close();
    }catch (error) {
        // display errors
        console.log(error)
    }
})();