const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

async function test() {
  chrome.setDefaultService(
    new chrome.ServiceBuilder(chromedriver.path).build()
  );

  let options = new chrome.Options();
  //Below arguments are critical for Heroku deployment
  options.addArguments("--headless");
  options.addArguments("--disable-gpu");
  options.addArguments("--no-sandbox");

  //To wait for browser to build and launch properly
  let driver = await new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  //To fetch http://google.com from the browser with our code.
  await driver.get("https://www.ez-park.net/visitors/");
  await driver.sleep(1000);


  //To send a search query by passing the value in searchString.
  //await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

  await driver.findElement({ id: "MainContent_ddl_Property" });
  await driver
    .findElement({ id: "MainContent_ddl_Property" })
    .sendKeys("CENTURY LAKE HIGHLANDS");
  await driver.sleep(1000);

  await driver
    .findElement({ id: "MainContent_txt_Apartment" })
    .sendKeys("8309");

  await driver.findElement({ id: "MainContent_btn_PropertyNext" }).click();

  await driver.sleep(1000);

  await driver.findElement({ id: "MainContent_txt_Plate" }).sendKeys("PMV3505");
  await driver.findElement({ id: "MainContent_txt_Make" }).sendKeys("BMW");
  await driver.findElement({ id: "MainContent_txt_Model" }).sendKeys("228i");
  await driver.findElement({ id: "MainContent_txt_Color" }).sendKeys("White");

  await driver.findElement({ id: "MainContent_btn_Vehicle_Next" }).click();

  await driver.sleep(1000);
  await driver.findElement({ id: "MainContent_btn_Auth_Next" }).click();
  await driver.sleep(1000);
  await driver
    .findElement({ id: "MainContent_txt_Review_PlateNumber" })
    .sendKeys("PMV3505");

  await driver.findElement({ id: "MainContent_cb_Confirm" }).click();
  await driver.sleep(3000);
  await driver.findElement({ id: "MainContent_btn_Submit" }).click();
  await driver.sleep(6000);

  //Verify the page title and print it
  var result = await driver
    .findElement({ id: "MainContent_pnl_Results" })
    .getText();
  console.log("result is:", result);

  //It is always a safe practice to quit the browser after execution
  await driver.quit();
  return result;
}

app.get("/", (req, res) => {
  test().then((result) => res.send(result));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
