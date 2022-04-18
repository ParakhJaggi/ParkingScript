const {By,Key,Builder} = require("selenium-webdriver");

require("chromedriver");

async  function test()  {
    var searchString = "Automation testing with Selenium and JavaScript";
 
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

     //To fetch http://google.com from the browser with our code.
     await driver.get("https://www.ez-park.net/visitors/");
         
     //To send a search query by passing the value in searchString.
     //await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

     await driver.findElement({id: 'MainContent_ddl_Property'});
     await driver.findElement({id: 'MainContent_ddl_Property'}).sendKeys('CENTURY LAKE HIGHLANDS');
     await driver.sleep(1000);

     await driver.findElement({id: 'MainContent_txt_Apartment'}).sendKeys('8309');

     await driver.findElement({id: 'MainContent_btn_PropertyNext'}).click();
     


     await driver.sleep(1000);


     await driver.findElement({id: 'MainContent_txt_Plate'}).sendKeys('PMV3505');
     await driver.findElement({id: 'MainContent_txt_Make'}).sendKeys('BMW');
     await driver.findElement({id: 'MainContent_txt_Model'}).sendKeys('228i');
     await driver.findElement({id: 'MainContent_txt_Color'}).sendKeys('White');


     await driver.findElement({id: 'MainContent_btn_Vehicle_Next'}).click();

     await driver.sleep(1000);
     await driver.findElement({id: 'MainContent_btn_Auth_Next'}).click();
     await driver.sleep(1000);
     await driver.findElement({id: 'MainContent_txt_Review_PlateNumber'}).sendKeys('PMV3505');

     await driver.findElement({id: 'MainContent_cb_Confirm'}).click();
     await driver.findElement({id: 'MainContent_btn_Submit'}).click();


/*
     //Verify the page title and print it
     var title = await driver.getTitle();
     console.log('Title is:',title);

     //It is always a safe practice to quit the browser after execution
     await driver.quit();
*/

}

test();